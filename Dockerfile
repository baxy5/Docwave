FROM node:20-alpine3.20

WORKDIR /app

# Copy only package files first for caching

# It allows Docker to cache the npm install 
# layer. If you only change your application 
# code, Docker doesn't have to re-run npm 
# install every time you rebuild the image, 
# making builds much faster.
COPY package*.json .env ./

RUN npm install --production

COPY . /app

RUN npm run build:css

ENV HOSTNAME=0.0.0.0

EXPOSE 6543

CMD ["node" , "app.js"]

