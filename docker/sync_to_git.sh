#!/bin/sh

echo "* Before we begin let's do diff for all the directories"

#diff -rvhq -x vendor /var/www/drupal /tmp/gdc/docker
cp -p database.sql.tgz backup.sh compare_db.sh sync_to_git.sh composer.* /tmp/gdc/docker/.

echo "Save Config"
drush cex -y
cp -pr /var/www/drupal/config/sync /tmp/gdc/docker/config/

echo "Save Content"
drush cse -y
cp -pr /var/www/drupal/content/sync /tmp/gdc/docker/content/

echo "Save web/themes/custom"
cp -pr /var/www/drupal/web/themes/custom /tmp/gdc/docker/web/themes/

echo "Save web/modules/custom"
cp -pr /var/www/drupal/web/modules/custom /tmp/gdc/docker/web/modules/

echo "*** Git Sync Completed"


