FROM alpine:latest
ENV apache_root=/var/www
ENV site_path=${apache_root}/drupal
ENV PATH="${PATH}:${site_path}/vendor/drush/drush"
RUN apk update
RUN apk add curl python3 mariadb-client php81 php81-apache2 php81-opcache php81-mysqli php81-pdo_mysql php81-tokenizer \
    php81-dom php81-gd php81-pdo php81-session php81-simplexml php81-xml apache2 composer git
WORKDIR ${apache_root}
RUN composer create-project drupal/recommended-project drupal
WORKDIR ${site_path}
RUN composer require drush/drush
RUN git clone https://git.drupalcode.org/issue/content_sync-3330173.git content_sync
WORKDIR ${site_path}/content_sync
RUN git checkout 3330173-D10-compatibility-beta
RUN mkdir ${site_path}/web/modules/contrib
RUN mkdir -p ${site_path}/content/sync
WORKDIR /tmp
RUN curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
RUN python3 get-pip.py
RUN pip3 install mysql-connector
WORKDIR ${site_path}
RUN mv content_sync ${site_path}/web/modules/contrib
RUN mkdir -p ${site_path}/config/sync
COPY run.sh /usr/bin
COPY httpd.conf /etc/apache2
COPY settings.php.patch ${site_path}
COPY composer.json ${site_path}
COPY migrate.sh ${site_path}
COPY memory.ini /etc/php81/conf.d
COPY ./configuration/*.yml ${site_path}/config/sync
COPY db_fix.py ${site_path}
COPY embed_fix.py ${site_path}
COPY webinar_fix.py ${site_path}

ENTRYPOINT run.sh
