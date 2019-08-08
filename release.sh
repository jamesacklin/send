#!/bin/bash
# make sure we are on the right branch
git checkout master
# pull all new changes
git pull
# pull new docker images
docker-compose pull
# restart containers
docker-compose up -d