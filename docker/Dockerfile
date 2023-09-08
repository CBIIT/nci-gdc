FROM alpine:latest
ENV apache_root=/var/www
ENV site_path=$apache_root/drupal
ENV PATH="${PATH}:$site_path/vendor/drush/drush"
RUN apk update
RUN apk add python3 mariadb-client mariadb-connector-c-dev php81 php81-apache2 php81-opcache php81-mysqli php81-pdo_mysql php81-tokenizer \
    php81-dom php81-gd php81-pdo php81-session php81-simplexml php81-xml apache2 composer git
WORKDIR $apache_root
RUN composer create-project drupal/recommended-project drupal
WORKDIR $site_path
RUN composer require drush/drush
RUN git clone https://git.drupalcode.org/issue/content_sync-3330173.git content_sync
WORKDIR $site_path/content_sync
RUN git checkout 3330173-D10-compatibility-beta
RUN mkdir $site_path/web/modules/contrib
RUN mkdir -p $site_path/content/sync
RUN mkdir -p /var/drupal/config/sync
RUN mkdir $site_path/contentimport
WORKDIR $site_path
RUN mv content_sync $site_path/web/modules/contrib
COPY run.sh /usr/bin
COPY httpd.conf /etc/apache2
COPY settings.php.patch $site_path
COPY composer.json $site_path
COPY memory.ini /etc/php81/conf.d
ENTRYPOINT run.sh
