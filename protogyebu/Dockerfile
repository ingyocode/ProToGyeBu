FROM node:14

WORKDIR /usr/src/app
RUN npm install -g --unsafe-perm=true nx
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN nx run backend:build
EXPOSE 3000
CMD [ "node", "main.js" ]