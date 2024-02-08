#!/bin/bash
FILE=installed.txt
if [ -f "$FILE" ]; then
    echo "Drupal Site Already Installed"
else
    touch installed.txt
    cp $code_path/docker/composer.lock ./ 
    cp $code_path/docker/composer.json ./
    cp -r $code_path/docker/web ./
    composer config --no-plugins allow-plugins.cweagans/composer-patches true
    composer install
    cp web/sites/default/default.settings.php web/sites/default/settings.php
    cat $code_path/docker/settings.php.patch >> web/sites/default/settings.php
    mv content_sync web/modules/contrib
    chown -R www-data:www-data web
    echo "changing ownership of web to www-data"
    drush cr
fi
cat web/sites/default/settings.php
cp $code_path/docker/.htaccess web
echo $s3_access_key
echo $s3_secret_key
echo "starting apache"
drush cr
apache2-foreground
