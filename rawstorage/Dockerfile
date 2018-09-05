FROM node:8.11.4

RUN apt-get update
# Install MongoDb
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
#For Ubuntu 14.04 (Travis Ubuntu bersion)
RUN echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/4.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.0.list
# v16.04 RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
# v18.04 RUN echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
RUN apt-get update
RUN apt-get install -y mongodb-org
RUN mkdir /data/db
RUN service mongod start

ENV APP_ROOT /app
ENV RABBITMQ_EXTERNAL_PORT 5672
ENV RABBITMQ_INTERNAL-port 5672
ENV RAW_DB_EXTERNAL_PORT 27017
ENV RAW_DB_INTERNAL_PORT 27017
ENV AGGREGATEDSTORAGE_PORT 3057
ENV RAWSTORAGE_PORT 27017

RUN mkdir $APP_ROOT
WORKDIR $APP_ROOT

COPY ./ ./
WORKDIR $APP_ROOT

RUN apt-get update && \
    apt-get install -yq curl

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

RUN ls

RUN yarn

# RUN docker kill $(docker ps -q)
# RUN docker-compose up --build -d

EXPOSE 8080

CMD ["yarn", "start-prod" ]