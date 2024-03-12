FROM drupal:latest
RUN apt-get update -y
RUN apt-get install -y libldap2-dev patch vim git mariadb-client sendmail && rm -rf /var/lib/apt/lists/*
RUN docker-php-source extract && \
    docker-php-ext-configure ldap --with-ldap && \
    docker-php-ext-install ldap && \
    docker-php-source delete
RUN apt-get update -y && DEBIAN_FRONTEND=noninteractive apt-get install -y slapd ldap-utils
RUN git clone https://github.com/cbiit/nci-gdc /tmp/github --branch gdc_2.0 --single-branch
ENV code_path=/tmp/github
ENV COMPOSER_ALLOW_SUPERUSER=1
COPY run.sh /usr/bin
COPY memory.ini /usr/local/etc/php/conf.d
COPY ldap.conf /etc/ldap
RUN git clone https://git.drupalcode.org/issue/content_sync-3330173.git content_sync
RUN git -C content_sync checkout 3330173-D10-compatibility-beta
ENTRYPOINT run.sh
