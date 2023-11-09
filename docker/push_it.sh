#!/bin/sh

if [ -z "$1" ]
  then
    echo "No argument supplied"
    echo 'Syntax: ./push_it.sh "Git Comment for checkin"'
    exit
fi


./backup.sh
./sync_to_git.sh
cd /tmp/gdc
git add --all
git commit -m "$1"
git push
git status
cd /var/www/drupal
