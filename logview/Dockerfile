# Frontend setup 
FROM node:8

# RUN apk update && apk add nodejs && npm i -g nodemon
RUN npm i -g nodemon

# Create app directory
WORKDIR /src/

RUN cd /src/

# Install app dependencies
# COPY package*.json ./

RUN yarn
# If you are building your code for production
# RUN yarn --only=production

# RUN ls

# Bundle app source
# COPY node_modules/ /src/

# CMD ["nodemon", "/src/backend/server.js"]