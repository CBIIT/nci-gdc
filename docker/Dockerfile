FROM base:latest
RUN apk add apache2-utils libbz2 php83-ctype php83-exif php83-fileinfo php83-posix php83-xmlreader php83-xmlwriter
COPY 000-default.conf /etc/apache2/conf.d
COPY entrypoint.sh /usr/bin
COPY ./ /tmp/github/docker
COPY installdrupal.sh /usr/bin
RUN composer require aws/aws-sdk-php
RUN chmod +x /usr/bin/entrypoint.sh
# Ensure remoteip_module is loaded BEFORE log_config_module
RUN sed -i '/LoadModule log_config_module/i LoadModule remoteip_module modules/mod_remoteip.so' /etc/apache2/httpd.conf

WORKDIR $drupal_root
EXPOSE 80
RUN /usr/bin/installdrupal.sh
RUN postfix start
HEALTHCHECK --interval=5m --start-period=3m --start-interval=10s CMD curl -f http://localhost:80 || exit 1
ENTRYPOINT ["entrypoint.sh"]
