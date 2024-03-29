cd $site_path
FILE=$site_path/installed.txt
if [ -f "$FILE" ]; then
    echo "Drupal Site Already Installed"
else
    #encoded_password=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$db_password'))")

    #mysql -u$db_user -p$db_password -h$db_host -e "drop database IF EXISTS $db_name;"
    #mysql -u$db_user -p$db_password -h$db_host -e "create database $db_name;"
    #drush site:install -y standard --db-url=mysql://$db_user:$encoded_password@$db_host:$db_port/$db_name --account-name=$account_name --account-pass=$account_pass --site-name=$sitename
    touch installed.txt
    cp $site_path/web/sites/default/default.settings.php $site_path/web/sites/default/settings.php
    cat $site_path/settings.php.patch >> $site_path/web/sites/default/settings.php
    composer update
    drush en -y markdown content_sync book pathauto migrate migrate_drupal migrate_drupal_ui backup_migrate migrate_plus migrate_upgrade
    if [ -d "$homedir/files" ]; then
       mkdir $site_path/web/sites/default/files
       cp -R $site_path/files/files/* $site_path/web/sites/default/files
       rm -rf $site_path/files/private
       mkdir $site_path/web/sites/default/files/private
       cp -R $site_path/files/files-private/* $site_path/web/sites/default/files/private
    fi
    chown -R apache:apache $site_path/web
    drush ucrt admin
    drush urol administrator admin
    drush upwd admin 1234
    rm -rf $site_path/content/sync/entities
    rm -rf $site_path/content/sync/files
    drush cim -y --source=$site_path/config/sync --partial
    drush thin gdc_foundation
    drush thin zurb_foundation
    drush config-set -y system.theme default gdc_foundation
    drush cr
fi
crond
exec httpd -DFOREGROUND
