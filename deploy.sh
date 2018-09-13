#!/bin/bash

echo "DEPLOY ITSELF HAS BEEN STARTED"

if [ "$TRAVIS_BRANCH" == "logview" ]
then
    export PROJECT_NAME=logview
elif [ "$TRAVIS_BRANCH" == "raw-store" ]
then
    export PROJECT_NAME=rawstorage
elif [ "$TRAVIS_BRANCH" == "aggregated-store" ]
then
    export PROJECT_NAME=aggregatedstorage
fi

export DOCKER_ACCOUNT_NAME=dmitriybeseda
export DOCKER_IMAGE_NAME=$DOCKER_ACCOUNT_NAME/$PROJECT_NAME
export INSTANCE=$PROJECT_NAME
export DOCKER_COMPOSE_V=1.22.0

set -e

echo $GCLOUD_SERVICE_KEY_STG | base64 --decode -i > ${HOME}/gcloud-service-key.json
gcloud auth activate-service-account --key-file ${HOME}/gcloud-service-key.json

echo "TRAVIS_BRANCH: $TRAVIS_BRANCH"

if [ "$TRAVIS_BRANCH" == "logview" ]
then
    echo "RUN DOCKER COMMANDS FOR LOGVIEW"
    gcloud compute --project $PROJECT ssh --zone $ZONE $INSTANCE --command "\ 
    docker stop logview && docker rm logview && docker rmi -f $DOCKER_IMAGE_NAME && \
    docker pull $DOCKER_IMAGE_NAME && \
    docker run -it -d -p 80:3060 -v /home/$USER/sequelize:/sequelize --name=$PROJECT_NAME --env-file 'vars.env' $DOCKER_IMAGE_NAME"
elif [ "$TRAVIS_BRANCH" == "raw-store" ]
then
    echo "RUN DOCKER COMMANDS FOR RAWSTORE"
    gcloud compute --project $PROJECT ssh --zone $ZONE $INSTANCE --command "\
    docker pull mongo && \
    docker pull rabbitmq && \ 
    docker pull $DOCKER_IMAGE_NAME && 
    docker stop $PROJECT_NAME && docker rm $PROJECT_NAME && docker rmi -f $DOCKER_IMAGE_NAME && \
    docker run -it -d -p 80:3050  --env-file 'vars.env' --link rabbitmq:rabbitmq --link mongodb:mongodb  --name=$PROJECT_NAME $DOCKER_IMAGE_NAME"
elif [ "$TRAVIS_BRANCH" == "aggregated-store" ]
then
    echo "RUN DOCKER COMMANDS FOR AGGREGATEDSTORE"
    gcloud compute --project $PROJECT ssh --zone $ZONE $INSTANCE --command "\
    docker pull mongo && \
    docker pull rabbitmq && \ 
    docker pull $DOCKER_IMAGE_NAME && 
    docker stop $PROJECT_NAME && docker rm $PROJECT_NAME && docker rmi -f $DOCKER_IMAGE_NAME && \
    docker run -it -d -p 80:3100 --env-file 'vars.env' --link rabbitmq:rabbitmq --link mongodb:mongodb --name=$PROJECT_NAME $DOCKER_IMAGE_NAME"
fi

# docker run -it -v /home/$USER/mongodata:/data/db -d -p 27017:27017 --name=mongodb mongo 
# docker run -it -d -p 5672:5672 --name=rabbitmq rabbitmq 