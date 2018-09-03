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
export DOCKER_COMPOSE_V=1.22.0

set -e

echo $GCLOUD_SERVICE_KEY_STG | base64 --decode -i > ${HOME}/gcloud-service-key.json
gcloud auth activate-service-account --key-file ${HOME}/gcloud-service-key.json

gcloud compute --project $PROJECT ssh --zone $ZONE $INSTANCE --command "docker kill $(docker ps -q) && docker rm $PROJECT_NAME && docker rmi -f $DOCKER_IMAGE_NAME"
gcloud compute --project $PROJECT ssh --zone $ZONE $INSTANCE --command "docker run docker/compose:$DOCKER_COMPOSE_V version"
gcloud compute --project $PROJECT ssh --zone $ZONE $INSTANCE --command "docker run --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v "$PWD:/rootfs/$PWD" \
    -w="/rootfs/$PWD" \
    docker/compose:$DOCKER_COMPOSE_V up --build -d"
gcloud compute --project $PROJECT ssh --zone $ZONE $INSTANCE --command "docker pull $DOCKER_IMAGE_NAME && docker run -it -d -p 80:3060 --name=$PROJECT_NAME --env-file '1.env' $DOCKER_IMAGE_NAME"
