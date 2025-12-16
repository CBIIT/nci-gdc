#!/bin/sh
# Start Apache in the background
postfix start
echo "Installing stable9"
drush theme:enable stable9
drush cr
httpd -D FOREGROUND &
wait
