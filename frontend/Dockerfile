# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install
COPY package*.json ./
RUN npm install

# Copy everything else
COPY . .

# Build the Next.js app
RUN npm run build

# Start app in production mode
CMD ["npm", "run", "start"]
