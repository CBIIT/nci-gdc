This is how to run the GDC site on 1066. It will be different locally but still can be done
* cd to the docker directory
* run docker build -t baseimage .
* docker run -v $CONTENT_SYNC:/var/www/drupal/content_sync -v $FILES:/var/www/drupal/files -p 8080:80 -e db_user=$DB_USER -e db_password=$DB_PASSWORD -e db_host=$DB_HOST -e db_name=dbname -e db_port=$DB_PORT -e hash_salt=hashsalt -d --name baseimage


To run it locally assuming you have a mysql docker container running on 3306 with a network of db
* cd to the docker directory
* run docker build -t baseimage .
* docker run -v ~/development/GDC/content_sync:/var/www/drupal/content_sync -v ~/development/GDC/gdc_file_dump:/var/www/drupal/files -p 8080:80 --network db -e db_user=root -e db_password='my-secret-pw' -e db_host=mysql -e db_port=3306 -e db_name=gdc -e hash_salt=hashsalt -d --name gdc baseimage
