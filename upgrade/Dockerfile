FROM python
RUN pip install mysql-connector-python
RUN mkdir /tmp/upgrade
RUN apt-get update
RUN apt-get -y install vim
COPY upgrade.py /tmp/upgrade
WORKDIR /tmp/upgrade
CMD tail -f /dev/null
