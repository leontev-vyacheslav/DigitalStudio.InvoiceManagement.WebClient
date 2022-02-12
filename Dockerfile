FROM nginx:alpine

COPY ./dist/digital-studio-invoice-management-web-client/. /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
