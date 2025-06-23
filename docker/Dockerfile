FROM base:latest

# Add required PHP modules and Apache utils
RUN apk add apache2-utils libbz2 php83-ctype php83-exif php83-fileinfo php83-posix php83-xmlreader php83-xmlwriter

# Copy configs and scripts
COPY 000-default.conf /etc/apache2/conf.d
COPY entrypoint.sh /usr/bin
COPY ./ /tmp/github/docker
COPY installdrupal.sh /usr/bin

# Install AWS SDK
RUN composer require aws/aws-sdk-php

# Make entrypoint executable
RUN chmod +x /usr/bin/entrypoint.sh

# Ensure remoteip_module is loaded before log_config_module
RUN sed -i '/LoadModule log_config_module/i LoadModule remoteip_module modules/mod_remoteip.so' /etc/apache2/httpd.conf

# Insert RemoteIP configuration after the module is loaded
RUN sed -i '/LoadModule remoteip_module/a RemoteIPHeader X-Forwarded-For\nRemoteIPTrustedProxy 10.0.0.0/8' /etc/apache2/httpd.conf

# Drupal setup
WORKDIR $drupal_root
EXPOSE 80
RUN /usr/bin/installdrupal.sh

# Start postfix (if required by your app, otherwise this line can be removed)
RUN postfix start

# Healthcheck
HEALTHCHECK --interval=5m --start-period=3m --start-interval=10s CMD curl -f http://localhost:80 || exit 1

# Entrypoint
ENTRYPOINT ["entrypoint.sh"]

