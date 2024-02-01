#!/bin/sh

# Change to the site path directory
cd "$site_path"

# Check if Drupal is already installed
FILE="$site_path/installed.txt"
if [ -f "$FILE" ]; then
    echo "Drupal Site Already Installed"
else
    # Encode the database password for use in the db-url
    encoded_password=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$db_password'))")

    # Drop and recreate the database
    mysql -u$db_user -p$db_password -h$db_host -e "drop database IF EXISTS $db_name;"
    mysql -u$db_user -p$db_password -h$db_host -e "create database $db_name;"

    # Install Drupal using Drush
    drush site:install -y standard \
        --db-url=mysql://$db_user:$encoded_password@$db_host:$db_port/$db_name \
        --account-name=$account_name \
        --account-pass=$account_pass \
        --site-name=$sitename

    # Create an installed.txt file to indicate successful installation
    touch installed.txt

    # Append settings.php patch to settings.php
    cat settings.php.patch >> web/sites/default/settings.php

    # Require Drupal modules using Composer
    composer require drupal/paragraphs:^1.16 drupal/entity_embed:^1.4 drupal/markdown erusev/parsedown --no-update

    # Update Composer dependencies
    composer update

    # Enable Drupal modules using Drush
    drush en -y paragraphs datetime_range entity_embed markdown content_sync book pathauto migrate migrate_drupal migrate_drupal_ui backup_migrate migrate_plus migrate_upgrade markdown

    # Import configuration
    drush cim -y --source=$site_path/config/sync --partial

    # Copy files from /tmp if they exist
    if [ -d "/tmp/files" ]; then
        cp -R /tmp/files $site_path
        rm -rf $site_path/files/private
        cp -R $site_path/files/files-private $site_path/files/private
    fi

    # Set ownership for Apache
    chown -R apache:apache web

    # Run Python database fix script
    python3 fixes/db_fix.py $migrate_db_name $db_user $db_password $db_host $db_port
    drush en redirect
    # Run Drupal migrate-upgrade
    drush migrate-upgrade --legacy-db-key='migrate' --legacy-root='$site_path/files'

    # Create admin user
    drush ucrt admin
    drush urol administrator admin
    drush upwd admin 1234

    # Remove configuration files
    rm $site_path/config/sync/*

    # Export configuration
    drush cex -y

    # Copy and delete certain block configurations
    drush cdel -y block.block.bartik_system_main
    drush cdel -y block.block.bartik_system_powered_by
    drush cdel -y block.block.cag_bootstrap_system_main
    rm $site_path/config/sync/block.block.bartik*
    rm $site_path/config/sync/block.block.cag*
    cp $site_path/field_fixes/* $site_path/config/sync

    # Import updated configuration
    drush cim -y --source=$site_path/config/sync --partial

    # Run Python scripts for fixing content
    python3 fixes/webinar_fix.py $db_name $db_user $db_password $db_host $db_port
    python3 fixes/youtube_title_fix.py $db_name $db_user $db_password $db_host $db_port
    python3 fixes/crg_fix.py $db_name $db_user $db_password $db_host $db_port
    python3 fixes/dd_fix.py $db_name $db_user $db_password $db_host $db_port
    python3 fixes/institution_fix.py $db_name $db_user $db_password $db_host $db_port
    python3 fixes/community_tool_fix.py $db_name $db_user $db_password $db_host $db_port
    python3 fixes/person_fix.py $db_name $db_user $db_password $db_host $db_port

    # Remove unnecessary directories
    rm -rf $site_path/content/sync/entities
    rm -rf $site_path/content/sync/files

    # Export configuration again

    drush cse -y

    # Create a tarball of content
    tar cvf $site_path/contentsync/content.tgz $site_path/content/sync/*

    # Change ownership of the tarball to drupaldocker user (UID 3000)
    chown -R 3000:3000 $site_path/contentsync

    # Clear Drupal cache
    drush cr
fi

# Start Apache in the foreground
exec httpd -DFOREGROUND
