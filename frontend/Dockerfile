FROM node:20 AS build

WORKDIR /app
COPY frontend/package*.json ./

RUN npm install

COPY frontend/ ./
EXPOSE 5173

CMD ["npm", "run", "dev"] 

