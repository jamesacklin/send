#!/bin/bash
git checkout master
git pull
docker-compose up --build --no-deps -d
