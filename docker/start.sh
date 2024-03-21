#!/bin/sh
FILE=installed.txt
if [ -f "$FILE" ]; then
    echo "Drupal Site Already Installed"
else
    touch installed.txt
    drush webform-libraries-download
    chown -R apache:apache web
    echo "changing ownership of web to www-data"
    drush cr
fi
drush cr
postfix start
httpd -D FOREGROUND
