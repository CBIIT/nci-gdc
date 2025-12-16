FROM base:latest

# Add required PHP modules and Apache utils
RUN apk add apache2-utils php84-simplexml php84-dom php84-gd php84-pdo php84-xml php84-tokenizer php84-session libbz2 php84-ctype php84-exif php84-fileinfo php84-posix php84-xmlreader php84-xmlwriter

# Copy configs and scripts
COPY 000-default.conf /etc/apache2/conf.d
COPY httpd.conf /etc/apache2
COPY entrypoint.sh /usr/bin
COPY ./ /tmp/github/docker
COPY installdrupal.sh /usr/bin

# Install AWS SDK
RUN composer require aws/aws-sdk-php

# Make entrypoint executable
RUN chmod +x /usr/bin/entrypoint.sh

# Drupal setup
WORKDIR $drupal_root
EXPOSE 80
RUN chmod +x /usr/bin/installdrupal.sh
RUN /usr/bin/installdrupal.sh
# Start postfix (if required by your app, otherwise this line can be removed)
RUN postfix start

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=4 \
  CMD curl -sS -o /dev/null http://127.0.0.1:80/ || exit 1

# Entrypoint
ENTRYPOINT ["entrypoint.sh"]
