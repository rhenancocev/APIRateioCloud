FROM node:latest

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3009

ENTRYPOINT ["npm", "start"]