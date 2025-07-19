FROM node:18


WORKDIR /app

# First copy package files to cache dependencies
COPY package*.json ./
COPY . .

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]