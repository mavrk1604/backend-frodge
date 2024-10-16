# The information and access keys in this Dockerfile are intentionally public for demonstration purposes.

FROM node:20.18.0-alpine

WORKDIR /app

COPY . .

RUN npm install --production

EXPOSE 8080

ENV PORT=8080
ENV MONGO_URL="mongodb+srv://frodgeuser:A7spJhwSJWLymXHC@frodge-app.zuinfnb.mongodb.net/frodge-prueba"
ENV TOKEN_KEY="FR0DG34CC355!>!>2077"

CMD ["npm", "run", "start"]