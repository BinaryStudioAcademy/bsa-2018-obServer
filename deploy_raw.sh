#!/bin/bash

export DOCKER_ACCOUNT_NAME=dmitriybeseda
export PROJECT_NAME=raw-storage
export DOCKER_IMAGE_NAME=$DOCKER_ACCOUNT_NAME/$PROJECT_NAME
export INSTANCE=$PROJECT_NAME

set -e

echo $GCLOUD_SERVICE_KEY_STG | base64 --decode -i > ${HOME}/gcloud-service-key.json
gcloud auth activate-service-account --key-file ${HOME}/gcloud-service-key.json

gcloud compute --project $PROJECT ssh --zone $ZONE $INSTANCE --command "docker stop $PROJECT_NAME && docker rm $PROJECT_NAME && docker rmi -f $DOCKER_IMAGE_NAME && docker pull $DOCKER_IMAGE_NAME && docker run -it -d -p 80:3060 --name=$PROJECT_NAME --env-file '1.env' $DOCKER_IMAGE_NAME"
