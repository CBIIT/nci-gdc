#!/bin/sh

echo "* Before we begin let's do diff for all the directories"

diff -rvhq -x vendor /var/www/drupal /tmp/gdc/docker
