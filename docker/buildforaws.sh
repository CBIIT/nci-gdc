#!/bin/bash
# add the image name/tag as paramater ./buildforaws.sh imagename:tag #
aws ecr get-login-password | docker login -u AWS --password-stdin "https://$(aws sts get-caller-identity --query 'Account' --output text).dkr.ecr.$(aws configure get region).amazonaws.com"
docker build --no-cache --platform linux/amd64 -t $1 .
docker push $1
