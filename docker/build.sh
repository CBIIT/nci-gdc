#!/bin/bash
docker kill gdc
docker rm gdc
docker system prune -af
docker build -t gdc .
docker run -d --name gdc -p 8080:80 gdc
docker exec -it gdc sh
