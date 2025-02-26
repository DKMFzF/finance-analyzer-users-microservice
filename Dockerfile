FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm build
EXPOSE 4000
CMD ["npm", "run", "start"]