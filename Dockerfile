FROM node:10

COPY yarn.lock /node/
COPY package.json /node/
WORKDIR /app
RUN yarn install

CMD ["node"]

