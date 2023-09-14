cd $site_path
FILE=$site_path/installed.txt
if [ -f "$FILE" ]; then
    echo "Drupal Site Already Installed"
    encoded_password=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$db_password'))")

    mysql -u$db_user -p$db_password -h$db_host -e "drop database IF EXISTS $db_name;"
    mysql -u$db_user -p$db_password -h$db_host -e "create database $db_name;"
    drush site:install -y standard --db-url=mysql://$db_user:$encoded_password@$db_host:$db_port/$db_name --account-name=$account_name --account-pass=$account_pass --site-name=$sitename
    touch installed.txt

    composer require drupal/markdown erusev/parsedown --no-update
    #drush y:get:value contentsync/filter.format.markdown.yml uuid
    echo "need to add markdown content authoring type, then after upgrade save the format again"
    composer update
    drush en -y markdown content_sync book pathauto migrate migrate_drupal migrate_drupal_ui backup_migrate migrate_plus migrate_upgrade markdown
    drush cim -y --source=$site_path/config/sync --partial

    if [ -d "/tmp/files" ]; then
       cp -R /tmp/files $site_path
       rm -rf $site_path/files/private
       cp -R $site_path/files/files-private $site_path/files/private
    fi
    chown -R apache:apache $site_path/web
    drush migrate-upgrade --legacy-db-key='migrate'  --legacy-root='$site_path/files' -vvv
    drush ucrt admin
    drush urol administrator admin
    drush upwd admin 1234

fi
