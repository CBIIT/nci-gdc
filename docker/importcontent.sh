#!/bin/sh
home_dir=/var/www/drupal
# Define the paths to your two tar files
tarfile1="$home_dir/contentimport/content.tgz"
tarfile2="$home_dir/content_sync/content.tgz"

# Calculate MD5 hashes of both tar files
md5sum1=$(md5sum "$tarfile1" | awk '{print $1}')
md5sum2=$(md5sum "$tarfile2" | awk '{print $1}')

# Compare the MD5 hashes
if [ "$md5sum1" == "$md5sum2" ]; then
  echo "The tar files are identical."
else
  echo "Do content sync"
  cp $tarfile2 $tarfile1
  rm -rf $home_dir/content/sync/entities
  rm -rf $home_dir/content/sync/files
  rm -rf $home_dir/contentimport/var
  tar xvf home_dir/contentimport/content.tgz --directory $home_dir/contentimport
  mv $home_dir/contentimport/var/www/drupal/content/sync/* $home_dir/content/sync
  drush entity:delete -y node
  drush entity:delete -y file
  drush csi -y --entity-types=node,path_alias,taxonomy_term,file
fi
