FROM node:14

WORKDIR /app

COPY /api/package*.json ./

RUN npm install

COPY /api .

RUN npm run build

EXPOSE 80

CMD ["npm", "start"]
