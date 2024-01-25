#!/bin/bash
FILE=installed.txt
if [ -f "$FILE" ]; then
    echo "Drupal Site Already Installed"
else
    touch installed.txt
    cp $code_path/docker/composer.lock ./ 
    cp -r $code_path/docker/web ./
    composer install
    cp web/sites/default/default.settings.php web/sites/default/settings.php
    cat $code_path/docker/settings.php.patch >> web/sites/default/settings.php
    mv content_sync web/modules/contrib
    chown -R www-data:www-data web
    echo "changing ownership of web to www-data"
    drush cr
fi
cat web/sites/default/settings.php
echo "starting apache"
apache2-foreground