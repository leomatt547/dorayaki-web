FROM php:8-alpine3.13
RUN mkdir /app
WORKDIR /app

COPY . .

EXPOSE 3001

# COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN composer install

CMD ["php", "-S", "localhost:3001"]
