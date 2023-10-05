#!/bin/sh

drush dis seckit -y
drush uublk joseph
drush upwd joseph --password=1234
drush vset preprocess_css 0 
drush vset preprocess_css 0

# Set the public file system path.
drush vset file_public_path files

# Set the private file system path.
drush vset file_private_path '/var/www/html/files/private'

# Set the temporary directory.
drush vset file_temporary_path '/var/www/html/tmp'
drush vset file_downloads FILE_DOWNLOADS_PUBLIC

drush cc all
