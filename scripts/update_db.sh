#!/usr/bin/env bash

# development only  migrate db 
yarn prisma migrate dev
yarn prisma generate