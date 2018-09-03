FROM node:8.11.4

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
RUN docker-compose up --build -d

EXPOSE 8080

CMD ["yarn", "start-prod" ]