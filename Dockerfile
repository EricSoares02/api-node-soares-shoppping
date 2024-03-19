FROM node:20.11

WORKDIR /app

COPY . .

RUN rm -rf node_modules

RUN rm -rf src

RUN rm -rf tests

RUN npm i

CMD [ "npm", "run", "start" ]

EXPOSE 5001