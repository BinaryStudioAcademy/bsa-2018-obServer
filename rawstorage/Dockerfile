FROM node:8.11.4
FROM rabbitmq

ENV APP_ROOT /app

RUN mkdir $APP_ROOT
WORKDIR $APP_ROOT

COPY ./ ./
WORKDIR $APP_ROOT

# RUN apt-get update && \
#     apt-get install -yq curl

# RUN curl -o- -L https://yarnpkg.com/install.sh | bash

RUN npm i -g yarn


WORKDIR $APP_ROOT

RUN yarn

EXPOSE 8080

CMD ["yarn", "start-prod" ]