#!/bin/sh
# Start Apache in the background
drush cr
httpd -D FOREGROUND &
