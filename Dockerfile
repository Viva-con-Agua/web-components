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

#FROM docker.io/node:20-alpine AS src
#ENV NODE_OPTIONS=--openssl-legacy-provider
#ENV GENERATE_SOURCEMAP=false
#WORKDIR /app/src
#ADD ./ /app/src/
#RUN yarn install --check-files

#FROM src as storybook
#RUN yarn run build-storybook --disable-telemetry -o /app/dist/

#FROM docker.io/nginx:mainline as storybook-http
#ADD .docker/storybook.nginx.conf /etc/nginx/conf.d/default.conf
#EXPOSE 80/tcp
#COPY --from=storybook /app/dist/ /var/www/

# Schritt 1: Baue das Storybook-Projekt
FROM node:20-alpine AS storybook

# Setze das Arbeitsverzeichnis auf /app
WORKDIR /app

# Kopiere package.json und yarn.lock
COPY package.json yarn.lock ./

# Installiere die Abhängigkeiten mit Yarn
RUN yarn install

# Kopiere den Rest des Projekts und baue Storybook
COPY . .
RUN yarn build-storybook

# Schritt 2: Nginx verwenden, um die statischen Dateien bereitzustellen
FROM nginx:stable-alpine as storybook-http

# Kopiere die statischen Dateien in /var/www/html
COPY --from=build /app/storybook-static /var/www/html

# Kopiere die benutzerdefinierte Nginx-Konfiguration
ADD .docker/nginx.conf /etc/nginx/conf.d/default.conf

# Exponiere Port 80 für Nginx
EXPOSE 80

# Startet Nginx im Vordergrund
CMD ["nginx", "-g", "daemon off;"]
