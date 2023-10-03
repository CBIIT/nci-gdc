cd $site_path
FILE=$site_path/installed.txt
if [ -f "$FILE" ]; then
    echo "Drupal Site Already Installed"
else
    encoded_password=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$db_password'))")

    mysql -u$db_user -p$db_password -h$db_host -e "drop database IF EXISTS $db_name;"
    mysql -u$db_user -p$db_password -h$db_host -e "create database $db_name;"
    drush site:install -y standard --db-url=mysql://$db_user:$encoded_password@$db_host:$db_port/$db_name --account-name=$account_name --account-pass=$account_pass --site-name=$sitename
    touch installed.txt
    cat $site_path/settings.php.patch >> $site_path/web/sites/default/settings.php

    composer require drupal/entity_embed:^1.4 drupal/markdown erusev/parsedown --no-update
    #drush y:get:value contentsync/filter.format.markdown.yml uuid
    echo "need to add markdown content authoring type, then after upgrade save the format again"
    composer update
    drush en -y datetime_range entity_embed markdown content_sync book pathauto migrate migrate_drupal migrate_drupal_ui backup_migrate migrate_plus migrate_upgrade markdown
    drush cim -y --source=$site_path/config/sync --partial

    if [ -d "/tmp/files" ]; then
       cp -R /tmp/files $site_path
       rm -rf $site_path/files/private
       cp -R $site_path/files/files-private $site_path/files/private
    fi
    chown -R apache:apache $site_path/web
    python3 db_fix.py $migrate_db_name $db_user $db_password $db_host $db_port
    drush migrate-upgrade --legacy-db-key='migrate'  --legacy-root='$site_path/files'
    drush ucrt admin
    drush urol administrator admin
    drush upwd admin 1234
    drush cex -y
    drush cim -y
    rm -rf config/sync/*
    drush cex -y
    mv $site_path/field_fixes/* $site_path/config/sync
    python3 embed_fix.py $db_name $db_user $db_password $db_host $db_port


    drush cdel -y block.block.bartik_system_main
    drush cdel -y block.block.bartik_system_powered_by
    drush cdel -y block.block.cag_bootstrap_system_main
    drush cim -y --source=$site_path/config/sync --partial
    python3 webinar_fix.py $db_name $db_user $db_password $db_host $db_port

    rm -rf $site_path/content/sync/entities
    rm -rf $site_path/content/sync/files

    drush cse -y
    #drush cex?
    tar cvf $site_path/contentsync/content.tgz $site_path/content/sync/*
    ## changing ownership to 3000 which is drupaldocker user ##
    chown -R 3000:3000 $site_path/contentsync
    echo "need to add markdown content authoring type, then after upgrade save the format again"

fi
exec httpd -DFOREGROUND
