#!/usr/bin/env bash

# dev docker compose setup 
docker compose -f ../docker-compose.dev.yml up --build --detach
./logs.sh
