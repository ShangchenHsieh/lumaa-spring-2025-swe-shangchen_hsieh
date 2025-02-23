FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy .env file
COPY .env .env

# Print the contents of .env during the build
RUN echo "$(grep DB .env)"


COPY . .

EXPOSE 8080

CMD ["node", "index.js"]
