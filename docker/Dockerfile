FROM drupal:10.1.5-php8.1-apache-bullseye
RUN apt-get update -y
RUN apt-get install -y patch vim git mariadb-client sendmail
RUN git clone https://github.com/cbiit/nci-gdc /tmp/github --branch gdc_2.0 --single-branch
ENV code_path=/tmp/github
COPY run.sh /usr/bin
COPY memory.ini /usr/local/etc/php/conf.d
RUN git clone https://git.drupalcode.org/issue/content_sync-3330173.git content_sync
RUN git -C content_sync checkout 3330173-D10-compatibility-beta
ENTRYPOINT run.sh
