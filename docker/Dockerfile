FROM node:24-slim

WORKDIR /app

COPY . .

RUN npm ci --only=production

CMD ["npm", "run", "start"]