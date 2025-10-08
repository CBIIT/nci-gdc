#!/bin/sh
# Start Apache in the background
postfix start
drush theme:enable stable9
drush cr
httpd -D FOREGROUND &
wait
