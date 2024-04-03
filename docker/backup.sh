#!/bin/sh

# Clear Cache, move old db to previous.sql then backup the database.sql
echo "*** Save old DB: cp database.sql previous.sql"
cp database.sql previous.sql

echo "*** Set maintenance mode ON"
#drush state:set system.maintenance_mode 1 --input-format=integer
echo "drush cr"
drush cr
#echo "*** Backuping up Druapl DB into database.sql"
#drush sql-dump --ordered-dump > database.sql
#tar cfz database.sql.tgz database.sql
#echo "Backup is complete"
echo "*** Set maintencance mode OFF "
drush state:set system.maintenance_mode 0 --input-format=integer
echo "drush cr"
drush cr

