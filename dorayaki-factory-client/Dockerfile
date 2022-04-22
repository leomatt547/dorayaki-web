FROM node:14-alpine

RUN mkdir /dorayaki-factory-client
WORKDIR /dorayaki-factory-client

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .

CMD ["yarn", "start"]
