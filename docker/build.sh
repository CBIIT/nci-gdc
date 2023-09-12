source ~/.bashrc
docker rm -f chrisimage
docker rm -f chris
docker build -t chrisimage .

docker run -v $CONTENT_SYNC:/var/www/drupal/content_sync -v $FILES:/var/www/drupal/files -p 8098:80 -e db_user=$DB_USER -e db_password=$DB_PASSWORD -e db_host=$DB_HOST -e db_name=chris -e db_port=$DB_PORT -e hash_salt=hashsalt -d --name chris chrisimage

