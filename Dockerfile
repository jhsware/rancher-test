FROM node:8.12-alpine

# RUN apt-get update 
# RUN apt-get install -y build-essential g++

# First do the npm-install based of the package-lock.json
COPY package.json package-lock.json ./
RUN npm ci --development

# Now copy the application and build it
COPY .babelrc server.js serverUpload.js index.html app.css ./src ./assets ./
RUN npm run build && npm prune --production 

# TODO: This should be a mounted persistent volume!!!
RUN mkdir ./upload

ENV NODE_ENV production
ENV NODE_PATH /

EXPOSE 8080

ENTRYPOINT ["npm", "start"]
