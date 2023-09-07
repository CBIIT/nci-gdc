#!/bin/sh

# Define the paths to your two tar files
tarfile1="/var/www/drupal/contentsync/content.tgz"
tarfile2="/var/www/drupal/content_sync/content.tgz"

# Calculate MD5 hashes of both tar files
md5sum1=$(md5sum "$tarfile1" | awk '{print $1}')
md5sum2=$(md5sum "$tarfile2" | awk '{print $1}')

# Compare the MD5 hashes
if [ "$md5sum1" == "$md5sum2" ]; then
  echo "The tar files are identical."
else
  echo "Do content sync"
  cp $tarfile2 $tarfile1
  rm -rf /var/www/drupal/content/sync/entities
  rm -rf /var/www/drupal/content/sync/files
  rm -rf /var/www/drupal/contentsync/var
  tar xvf /var/www/drupal/contentsync/content.tgz --directory /var/www/drupal/contentsync
  mv /var/www/drupal/contentsync/var/www/drupal/content/sync/* /var/www/drupal/content/sync
  drush entity:delete -y node
  drush entity:delete -y file
  drush csi -y --entity-types=node,path_alias,taxonomy_term,files
fi
