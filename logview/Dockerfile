# Frontend setup 
FROM node:8.11.4

ENV APP_ROOT /app

RUN mkdir $APP_ROOT
WORKDIR $APP_ROOT

COPY ./ ./
WORKDIR $APP_ROOT

# RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - \
# echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

# RUN apt-get update && \
# apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
# libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
# libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
# libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
# ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

# RUN yarn global add typescript \
#     # && yarn global add sequelize sequelize-cli pg \
#     # && yarn \
#     && yarn build-prod

RUN npm -g i typescript \
    && npm -g i sequelize sequelize-cli pg \
    && npm -g i webpack \
    && npm run build-prod

# && yarn global add sequelize sequelize-cli pg \
# && yarn \

WORKDIR $APP_ROOT

RUN npm i

EXPOSE 8080

CMD ["npm", "run", "start-prod" ]
# CMD ["yarn", "start-prod" ]