# Install node v18
FROM node:18-alpine as build

# Add environment variables
ENV NODE_ENV="production"

# Set the workdir /var/www
WORKDIR /var/www

# Copy yarn workspace package.json and lock
COPY package.json yarn.lock ./
# Now copy in elements folders
COPY @elements/helpers @elements/helpers
COPY graphql-gateway graphql-gateway

# Set the workdir /var/www
WORKDIR /var/www/graphql-gateway

FROM build AS build-deps
# Install the dependencies
RUN yarn workspace @elements/helpers install --production=false --frozen-lockfile

# Install application dependencies
RUN yarn workspace graphql-gateway install --production=false --frozen-lockfile

FROM build-deps AS test

# Test
RUN yarn test

FROM build-deps as built

# Add the environment variables needed
ARG SENTRY_AUTH_TOKEN
ARG SENTRY_ORG
ARG SENTRY_PROJECT
ARG SENTRY_RELEASE

# Now build the packages
RUN yarn workspace @elements/helpers build

# Run the build
RUN yarn build

FROM build as runtime

# Set the workdir /var/www
WORKDIR /var/www

# Bring in built code
RUN rm -rf third-party @elements graphql-gateway
COPY --from=built  /var/www/graphql-gateway/build/src/ /var/www/graphql-gateway/package.json ./graphql-gateway/
COPY --from=built  /var/www/@elements/helpers/lib /var/www/@elements/helpers/package.json ./@elements/helpers/

# Install production modules
RUN yarn workspace @elements/helpers install --production=true --frozen-lockfile
RUN yarn workspace graphql-gateway install --production=true --frozen-lockfile

# Set the workdir /var/www
WORKDIR /var/www/graphql-gateway

# Cleanup src files
RUN rm -rf src tsconfig.json yarn.lock

# Expose application ports
EXPOSE 4000

# Allow yarn to run on read-only filesystems by pointing the cache and temp dir at an in memory directory.
ENV YARN_CACHE_FOLDER=/dev/shm/yarn_cache
ENV TMP=/dev/shm

# Start the application
CMD ["yarn", "serve"]
