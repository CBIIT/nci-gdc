FROM alpine:latest
ENV PATH="${PATH}:/var/www/drupal/vendor/drush/drush"
RUN apk update
RUN apk add python3 mariadb-client php81 php81-apache2 php81-opcache php81-mysqli php81-pdo_mysql php81-tokenizer \
    php81-dom php81-gd php81-pdo php81-session php81-simplexml php81-xml apache2 composer git
WORKDIR /var/www
RUN composer create-project drupal/recommended-project drupal
WORKDIR /var/www/drupal
RUN composer require drush/drush
RUN git clone https://git.drupalcode.org/issue/content_sync-3330173.git content_sync
WORKDIR /var/www/drupal/content_sync
RUN git checkout 3330173-D10-compatibility-beta
RUN mkdir /var/www/drupal/web/modules/contrib
RUN mkdir -p /var/www/drupal/content/sync
WORKDIR /var/www/drupal
RUN mv content_sync /var/www/drupal/web/modules/contrib
RUN mkdir -p /var/www/drupal/config/sync
COPY run.sh /usr/bin
COPY httpd.conf /etc/apache2
COPY settings.php.patch /var/www/drupal
COPY composer.json /var/www/drupal
COPY migrate.sh /var/www/drupal
COPY memory.ini /etc/php81/conf.d
COPY *.yml /var/www/drupal/config/sync

ENTRYPOINT run.sh
