FROM base:latest
RUN apk add libbz2 php83-ctype php83-exif php83-fileinfo php83-posix php83-xmlreader php83-xmlwriter
COPY 000-default.conf /etc/apache2/conf.d
COPY entrypoint.sh /usr/bin
COPY ./ /tmp/github/docker
RUN /usr/bin/installdrupal.sh
ENTRYPOINT ["entrypoint.sh"]
