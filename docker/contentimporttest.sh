#!/bin/bash
# this is just to run content import as a test without checking if file directories are the same
# Define the paths to your two tar files
tarfile1="/opt/drupal/contentimport/content.tgz"
tarfile2="/opt/drupal/content_sync/content.tgz"

echo "Do content sync"
cp $tarfile2 /opt/drupal/contentimport/content.tgz
rm -rf /opt/drupal/content/sync/entities
rm -rf /opt/drupal/content/sync/files
rm -rf /opt/drupal/contentimport/var
tar xvf /opt/drupal/contentimport/content.tgz --directory /opt/drupal/contentimport
mv /opt/drupal/contentimport/var/www/drupal/content/sync/* /opt/drupal/content/sync
drush csi --entity-types=node,path_alias,taxonomy_term,files
