FROM node:latest

WORKDIR /node_api

COPY . .

RUN npm install

EXPOSE 3009

ENTRYPOINT ["npm", "start"]