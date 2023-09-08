cd /var/www/drupal
FILE=/var/www/drupal/installed.txt
if [ -f "$FILE" ]; then
    echo "Drupal Site Already Installed"
else
    encoded_password=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$db_password'))")

    mysql -u$db_user -p$db_password -h$db_host -e "drop database IF EXISTS $db_name;"
    mysql -u$db_user -p$db_password -h$db_host -e "create database $db_name;"
    drush site:install -y standard --db-url=mysql://$db_user:$encoded_password@$db_host:$db_port/$db_name --account-name=$account_name --account-pass=$account_pass --site-name=$sitename
    touch installed.txt
    cat /var/www/drupal/settings.php.patch >> /var/www/drupal/web/sites/default/settings.php

    composer require drupal/markdown erusev/parsedown --no-update
    #drush cdel -y block.block.bartik_system_main
    #drush cdel -y block.block.bartik_system_powered_by
    #drush cdel -y block.block.cag_bootstrap_system_main
    #drush y:get:value contentsync/filter.format.markdown.yml uuid
    echo "need to add markdown content authoring type, then after upgrade save the format again"
    composer update
    drush en -y markdown content_sync book pathauto migrate migrate_drupal migrate_drupal_ui backup_migrate migrate_plus migrate_upgrade markdown
    drush cim -y --source=/var/www/drupal/config/sync --partial

    if [ -d "/tmp/files" ]; then
       cp -R /tmp/files /var/www/drupal
       rm -rf /var/www/drupal/files/private
       cp -R /var/www/drupal/files/files-private /var/www/drupal/files/private
    fi
    chown -R apache:apache /var/www/drupal
    drush migrate-upgrade --legacy-db-key='migrate'  --legacy-root='/var/www/drupal/files'
    drush ucrt admin
    drush urol administrator admin
    drush upwd admin 1234
    rm -rf /var/www/drupal/content/sync/entities
    rm -rf /var/www/drupal/content/sync/files
    drush cse -y
    #drush cex?
    tar cvf /var/www/drupal/contentsync/content.tgz /var/www/drupal/content/sync/*
    ## changing ownership to 3000 which is drupaldocker user ##
    drush cim -y --source=/var/www/drupal/config/sync --partial
    chown -R 3000:3000 /var/www/drupal/contentsync
    echo "need to add markdown content authoring type, then after upgrade save the format again"

fi
exec httpd -DFOREGROUND
