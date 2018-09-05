#!/bin/bash

if [ "$TRAVIS_BRANCH" == "logview" ]
then
    export PROJECT_NAME=logview
elif [ "$TRAVIS_BRANCH" == "raw-store" ]
then
    export PROJECT_NAME=raw-storage
elif [ "$TRAVIS_BRANCH" == "aggregated-store" ]
then
    export PROJECT_NAME=aggregated-storage
fi

export DOCKER_ACCOUNT_NAME=dmitriybeseda
export DOCKER_IMAGE_NAME=$DOCKER_ACCOUNT_NAME/$PROJECT_NAME
export INSTANCE=$PROJECT_NAME
export DOCKER_COMPOSE_V=1.22.0

set -e

echo $GCLOUD_SERVICE_KEY_STG | base64 --decode -i > ${HOME}/gcloud-service-key.json
gcloud auth activate-service-account --key-file ${HOME}/gcloud-service-key.json

if [ "$TRAVIS_BRANCH" == "logview" ]
then
    gcloud compute --project $PROJECT ssh --zone $ZONE $INSTANCE --command "docker pull $DOCKER_IMAGE_NAME && docker run -it -d -p 80:3055 --name=$PROJECT_NAME --env-file '1.env' $DOCKER_IMAGE_NAME"
elif [ "$TRAVIS_BRANCH" == "raw-store" ]
then
    # sh /home/ubuntu/setEnv.sh
    ls
    gcloud compute --project $PROJECT ssh --zone $ZONE $INSTANCE --command "\
    docker pull mongo && docker run -it -d -p 27017:27017 \
    docker pull rabbitmq && docker run -it -d -p 5672:5672 \
    docker pull $DOCKER_IMAGE_NAME && docker run -it -d -p 80:3055 --name=$PROJECT_NAME $DOCKER_IMAGE_NAME"
elif [ "$TRAVIS_BRANCH" == "aggregated-store" ]
then
    gcloud compute --project $PROJECT ssh --zone $ZONE $INSTANCE --command "docker pull $DOCKER_IMAGE_NAME && docker run -it -d -p 80:3055 --name=$PROJECT_NAME --env-file '1.env' $DOCKER_IMAGE_NAME"
fi
