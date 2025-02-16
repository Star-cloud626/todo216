FROM node:latest

WORKDIR /app

# Copy the lockfile and install dependencies
COPY package.json package-lock.json* ./
RUN npm install
COPY . .

CMD ["npm", "run", "dev"]