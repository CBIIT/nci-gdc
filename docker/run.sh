#!/bin/sh
FILE=installed.txt
if [ -f "$FILE" ]; then
    echo "Drupal Site Already Installed"
else
    touch installed.txt
    cp $code_path/docker/composer.lock ./ 
    cp $code_path/docker/composer.json ./
    cp -r $code_path/docker/web ./
    cp $code_path/docker/htaccess.patch ./web 
    composer config --no-plugins allow-plugins.cweagans/composer-patches true
    composer install
    cp web/sites/default/default.settings.php web/sites/default/settings.php
    echo "relayhost = [mailfwd.nih.gov]" > /etc/postfix/main.cf
    cat $code_path/docker/settings.php.patch >> web/sites/default/settings.php
    git clone https://git.drupalcode.org/issue/content_sync-3330173.git $drupal_root/web/modules/contrib/content_sync
    git -C $drupal_root/web/modules/contrib/content_sync checkout 3330173-D10-compatibility-beta    
    mkdir -p config/sync
    chown -R apache:apache web
    echo "changing ownership of web to www-data"
    drush cr
fi
echo "starting apache"
drush cr
postfix start
httpd -D FOREGROUND
