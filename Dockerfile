FROM node:lts-alpine3.19 

WORKDIR /usr/src/app

COPY . .

RUN apk add --no-cache git 

CMD ["npm", "run", "func", "test"]