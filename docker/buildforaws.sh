#!/bin/bash
docker build --no-cache --platform linux/amd64 -t $1 .
