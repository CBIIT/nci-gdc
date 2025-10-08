#!/bin/sh
# Start Apache in the background
postfix start
httpd -D FOREGROUND &
drush theme:enable stable9
drush cr
wait
