FROM node:14-alpine

RUN mkdir /dorayaki-factory-server
WORKDIR /dorayaki-factory-server

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

RUN npm run migrate:dev

CMD ["npm", "run", "dev"]
