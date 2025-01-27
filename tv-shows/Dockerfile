# Step 1: Build the React app
FROM node:16 AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app
RUN npm run build

# Step 2: Serve the React app using a lightweight web server (e.g., nginx)
FROM nginx:alpine

# Copy the built React app from the build stage to the nginx folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the frontend
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
