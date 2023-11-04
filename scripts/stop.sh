#!/usr/bin/env bash

# stop all containers and remove all containers 
docker stop $(docker ps -aq) && docker rm $(docker ps -aq)