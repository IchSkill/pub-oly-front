# Serve app with nginx server

# Use official nginx image as the base image
FROM nginx

# Copy the build output to replace the default nginx contents.
COPY ./dist/MORPH-IT /usr/share/nginx/html