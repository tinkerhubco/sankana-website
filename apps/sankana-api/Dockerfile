FROM node:lts-alpine

WORKDIR /usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install production dependencies.
# If you add a package-lock.json, speed your build by switching to 'npm ci'.
RUN npm ci

# copy application
COPY . .

# Build and output it here
RUN npx nx build sankana-api --prod --outputPath=.

CMD npx next start -p $PORT
