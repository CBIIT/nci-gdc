#!/bin/bash
# add the image name/tag as paramater ./buildforaws.sh imagename:tag #
awsdockerlogin
docker build --no-cache --platform linux/amd64 -t $1 .
docker push $1
