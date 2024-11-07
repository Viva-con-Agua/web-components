FROM docker.io/node:20-alpine as build-develop
WORKDIR /app/src
ADD ./ /app/src/
RUN yarn install --check-files
RUN yarn run build-main


# develop nginx container
FROM docker.io/nginx:mainline as develop
ADD .docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-develop /app/src/dist/ /var/www/
EXPOSE 80/tcp

FROM docker.io/node:20-alpine as build-stage
WORKDIR /app/src
ADD ./ /app/src/
RUN yarn install --check-files
RUN yarn run build-main


FROM docker.io/nginx:mainline as stage
ADD .docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/src/dist/ /var/www/
EXPOSE 80/tcp

FROM docker.io/node:20-alpine as build-main
WORKDIR /app/src
ADD ./ /app/src/
RUN yarn install --check-files
RUN yarn run build-main

FROM docker.io/nginx:mainline as main
ADD .docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-main /app/src/dist/ /var/www/
EXPOSE 80/tcp

FROM docker.io/node:20-alpine AS src
ENV NODE_OPTIONS=--openssl-legacy-provider
ENV GENERATE_SOURCEMAP=false
WORKDIR /app/src
ADD ./ /app/src/
RUN yarn install --check-files

FROM src as storybook
RUN yarn run build-storybook --disable-telemetry -o /app/dist/

FROM docker.io/nginx:mainline as storybook-http
ADD .docker/storybook.nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80/tcp
COPY --from=storybook /app/storybook-static/ /var/www/
