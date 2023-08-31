docker-compose down
docker build -t gdcdocker .
docker-compose up -d
dbash gdcdocker-gdcupgrade-1
