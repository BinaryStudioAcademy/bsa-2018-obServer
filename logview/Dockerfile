FROM node:8.11.4

ENV APP_ROOT /app

RUN mkdir $APP_ROOT
WORKDIR $APP_ROOT

COPY ./ ./
WORKDIR $APP_ROOT

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

RUN yarn global add webpack

WORKDIR $APP_ROOT

RUN yarn
RUN yarn build-prod

EXPOSE 8080

CMD ["yarn", "start-prod" ]