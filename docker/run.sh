home_dir='/var/www/drupal'
cd $home_dir
FILE=$home_dir/installed.txt
if [ -f "$FILE" ]; then
    echo "Drupal Site Already Installed"
else
    #encoded_password=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$db_password'))")

    #mysql -u$db_user -p$db_password -h$db_host -e "drop database IF EXISTS $db_name;"
    #mysql -u$db_user -p$db_password -h$db_host -e "create database $db_name;"
    #drush site:install -y standard --db-url=mysql://$db_user:$encoded_password@$db_host:$db_port/$db_name --account-name=$account_name --account-pass=$account_pass --site-name=$sitename
    touch installed.txt
    cp $home_dir/web/sites/default/default.settings.php $home_dir/web/sites/default/settings.php
    sed -i '/$settings\['"'"'hash_salt'"'"'\] = '"'"''"'"';/d' $home_dir/web/sites/default/settings.php

    cat $home_dir/settings.php.patch >> $home_dir/web/sites/default/settings.php
    composer update
    drush en -y content_sync book pathauto migrate migrate_drupal migrate_drupal_ui backup_migrate migrate_plus migrate_upgrade
    if [ -d "$homedir/files" ]; then
       cp -R $home_dir/files/files/* $home_dir/web/sites/default/files
       rm -rf $home_dir/files/private
       cp -R $home_dir/files/files-private $home_dir/web/sites/default/files/private
    fi
    chown -R apache:apache $home_dir
    drush ucrt admin
    drush urol administrator admin
    drush upwd admin 1234
    rm -rf $home_dir/content/sync/entities
    rm -rf $home_dir/content/sync/files
fi
crond
exec httpd -DFOREGROUND
