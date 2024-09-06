FROM alpine:3.20
ARG code_path=/tmp/github
ARG drupal_root=/var/www/drupal
ENV code_path=$code_path
ENV drupal_root=$drupal_root
RUN apk update
RUN apk add git curl openldap openldap-clients composer \
    patch vim mariadb-client postfix php83-ldap \
    php83-apache2 php83-opcache php83-mysqli php83-pdo_mysql php83-tokenizer \
    php83-dom php83-gd php83-pdo php83-session php83-simplexml php83-xml
RUN git clone https://github.com/cbiit/nci-gdc /tmp/github --branch gdc_2.0 --single-branch
RUN mkdir -p /var/www/drupal
RUN ln -s $drupal_root/vendor/drush/drush/drush /usr/bin/drush
COPY installdrupal.sh /usr/bin
COPY 000-default.conf /etc/apache2/conf.d
COPY ldap.conf /etc/openldap
COPY memory.ini /etc/php83/conf.d
COPY 00_filesize.ini /etc/php83/conf.d
COPY entrypoint.sh /usr/bin
RUN chmod +x /usr/bin/entrypoint.sh
WORKDIR $drupal_root
EXPOSE 80
RUN /usr/bin/installdrupal.sh
RUN postfix start
HEALTHCHECK --interval=5m --start-period=3m --start-interval=10s CMD curl -f http://localhost:80 || exit 1
ENTRYPOINT ["/usr/bin/entrypoint.sh"]
