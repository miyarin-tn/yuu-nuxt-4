FROM node:22.19.0-alpine3.22

# Update and install the latest dependencies
# Add non root user to the docker image and set the user
RUN apk update && apk upgrade && adduser -D yuu

# Run with this user
USER yuu

# Set work dir as app
WORKDIR /usr/local/app/nuxt

# Copy package files to docker
COPY ["package.json", "yarn.lock", "./"]

# Install package
RUN yarn install

# Copy project content with proper permission for the user yuu
COPY --chown=yuu:yuu . .

# Expose port
EXPOSE 3000

# env host to access outside container
ENV HOST=0.0.0.0

# Run project
CMD ["yarn", "dev"]
