#!/bin/sh
# Start Apache in the background
postfix start
httpd -D FOREGROUND &
drush cr
wait
