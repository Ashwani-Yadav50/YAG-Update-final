FROM node:dubnium-slim

MAINTAINER "shivam@agatsa.com"

WORKDIR /usr/app

EXPOSE 7003

COPY package.json .babelrc /usr/app/
COPY /config/ /usr/app/config/
COPY /src/ /usr/app/src/


RUN npm install
RUN npm run build

CMD npm start