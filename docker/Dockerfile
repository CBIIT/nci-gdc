FROM base:latest
RUN apk add libbz2 php83-ctype php83-exif php83-fileinfo php83-posix php83-xmlreader php83-xmlwriter
COPY 000-default.conf /etc/apache2/conf.d
COPY entrypoint.sh /usr/bin
COPY ./ /tmp/github/docker
COPY installdrupal.sh /usr/bin
RUN /usr/bin/installdrupal.sh
RUN composer require aws/aws-sdk-php
HEALTHCHECK --interval=5m --start-period=3m --start-interval=10s CMD curl -f http://localhost:80 || exit 1
ENTRYPOINT ["entrypoint.sh"]
