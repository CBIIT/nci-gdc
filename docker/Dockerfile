FROM drupal:latest
RUN apt-get update -y
RUN apt-get install -y vim git mariadb-client
ENV code_path=/tmp/github
COPY run.sh /usr/bin
COPY . /tmp/github
COPY memory.ini /usr/local/etc/php/conf.d
RUN git clone https://git.drupalcode.org/issue/content_sync-3330173.git content_sync
RUN git -C content_sync checkout 3330173-D10-compatibility-beta
ENTRYPOINT run.sh
