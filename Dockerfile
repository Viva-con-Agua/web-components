FROM docker.io/node:20-alpine as build-develop
WORKDIR /app/src
ADD ./ /app/src/
RUN npm clean-install
RUN npm run build-develop

# develop nginx container
FROM docker.io/nginx:mainline as develop
ADD .docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-develop /app/src/dist/ /var/www/
EXPOSE 80/tcp

FROM docker.io/node:20-alpine as build-stage
WORKDIR /app/src
ADD ./ /app/src/
RUN npm clean-install
RUN npm run build-stage

FROM docker.io/nginx:mainline as stage
ADD .docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/src/dist/ /var/www/
EXPOSE 80/tcp

FROM docker.io/node:20-alpine as build-main
WORKDIR /app/src
ADD ./ /app/src/
RUN npm clean-install
RUN npm run build-main

FROM docker.io/nginx:mainline as main
ADD .docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-main /app/src/dist/ /var/www/
EXPOSE 80/tcp
