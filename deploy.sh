#!/bin/bash

export DOCKER_ACCOUNT_NAME=dmitriybeseda
if [ "$TRAVIS_BRANCH" = "logview"]
then
    export PROJECT_NAME=logview
elif [ "$TRAVIS_BRANCH" = "raw-store"]
then
    export PROJECT_NAME=raw-storage
elif [ "$TRAVIS_BRANCH" = "aggregated-store"]
then
    export PROJECT_NAME=aggregated-storage
fi
    

export DOCKER_IMAGE_NAME=$DOCKER_ACCOUNT_NAME/$PROJECT_NAME
export INSTANCE=$PROJECT_NAME

set -e

echo $GCLOUD_SERVICE_KEY_STG | base64 --decode -i > ${HOME}/gcloud-service-key.json
gcloud auth activate-service-account --key-file ${HOME}/gcloud-service-key.json

gcloud compute --project $PROJECT ssh --zone $ZONE $INSTANCE --command "docker kill $(docker ps -q) && docker rm $PROJECT_NAME && docker rmi -f $DOCKER_IMAGE_NAME && docker pull $DOCKER_IMAGE_NAME && docker-compose up --build -d && docker run -it -d -p 80:3060 --name=$PROJECT_NAME --env-file '1.env' $DOCKER_IMAGE_NAME"
