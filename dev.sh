#!/usr/bin/env bash
docker compose -f docker-compose.dev.yml up --build --detach
./logs.sh
