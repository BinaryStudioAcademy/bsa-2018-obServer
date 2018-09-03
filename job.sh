#!/bin/bash

echo "TRAVIS_BRANCH: $TRAVIS_BRANCH"
if [ "$TRAVIS_BRANCH" == "logview" ]
then
    export PROJECT_NAME=logview
elif [ "$TRAVIS_BRANCH" == "raw-storage" ]
then
    export PROJECT_NAME=rawstorage
elif [ "$TRAVIS_BRANCH" == "aggregated-storage" ]
then
    export PROJECT_NAME=aggregatedstorage
fi

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker build -t $PROJECT_NAME ./$PROJECT_NAME
docker tag "$PROJECT_NAME $DOCKER_USERNAME/$PROJECT_NAME"
docker push $DOCKER_USERNAME/$PROJECT_NAME