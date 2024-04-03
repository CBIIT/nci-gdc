FROM alpine:3.19
ARG code_path=/tmp/github
ARG drupal_root=/var/www/drupal
ENV code_path=$code_path
ENV drupal_root=$drupal_root
RUN apk update
RUN apk add git curl openldap openldap-clients composer \
    patch vim mariadb-client postfix php82-ldap \
    php82-apache2 php82-opcache php82-mysqli php82-pdo_mysql php82-tokenizer \
    php82-dom php82-gd php82-pdo php82-session php82-simplexml php82-xml
RUN git clone https://github.com/cbiit/nci-gdc /tmp/github --branch gdc_2.0 --single-branch
RUN mkdir -p /var/www/drupal
RUN ln -s $drupal_root/vendor/drush/drush/drush /usr/bin/drush
COPY installdrupal.sh /usr/bin
COPY 000-default.conf /etc/apache2/conf.d
COPY ldap.conf /etc/openldap
COPY memory.ini /etc/php82/conf.d
COPY 00_filesize.ini /etc/php82/conf.d
WORKDIR $drupal_root
EXPOSE 80
RUN /usr/bin/installdrupal.sh
RUN postfix start
HEALTHCHECK --interval=5m --start-period=3m --start-interval=10s CMD curl -f http://localhost:80 || exit 1
CMD ["httpd","-D","FOREGROUND"]
