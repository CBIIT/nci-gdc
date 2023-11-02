#!/bin/bash
FILE=installed.txt
if [ -f "$FILE" ]; then
    echo "Drupal Site Already Installed"
else
    touch installed.txt
    cp $code_path/composer.lock ./ 
    cp -r $code_path/web ./
    composer install
    cp web/sites/default/default.settings.php web/sites/default/settings.php
    cat $code_path/settings.php.patch >> web/sites/default/settings.php
    mv content_sync web/modules/contrib
    chown -R www-data:www-data web
    echo "changing ownership of web to www-data"
    drush cr
fi
echo "starting apache"
apache2-foreground
