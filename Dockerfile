FROM httpd:2.4
RUN ls ./build/
COPY ./build/ /usr/local/apache2/htdocs/
