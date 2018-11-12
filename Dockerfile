#
# react-hawksearch dockerfile
#
# Logical layers:
#
#   1) install npm packages
#   2) run npm build
#   3) copy npm build outputs to nginx static hosting dir
#

FROM node:8-alpine AS build
WORKDIR /app

# copy the npm package files and restore
COPY package.json package-lock.json ./
RUN npm install

# now copy all sources and build
COPY . .
RUN npm run build


FROM nginx:alpine AS runtime
WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist/. .
