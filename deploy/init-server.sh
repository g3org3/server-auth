#!/bin/bash

if [[ -n "$1" ]]; then
  ssh -p 21 jorgeadolfo.com "mkdir /var/docker/$1"
  scp -P 21 docker/docker-compose.yml jorgeadolfo.com:/var/docker/$1/
else
  echo "please provide a project name, i.e. init-server.sh my-app"
fi
