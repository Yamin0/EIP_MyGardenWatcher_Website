FROM httpd:2.4
RUN ls -R
COPY ./build/ /var/www/html/
