FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci || npm i
COPY src ./src
ENV API_PORT=5000
EXPOSE 5000
CMD ["npm", "start"]
