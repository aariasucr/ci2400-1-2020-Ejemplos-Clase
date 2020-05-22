# PHP

Requerimientos:

- PHP7 o Docker

```bash
# Si usan docker

# Levantar el container
docker-compose -f docker-compose-php-build.yml up -d

# SSH hacia el container e instalar dependencias
docker exec -it php_php_build_1 /bin/bash
apt-get update # esto se arregla con un Dockerfile
apt-get install git # esto se arregla con un Dockerfile

# Usar composer para bajar dependencias
php composer.phar install

# Correr linting en tests
php -l tests/*.php

# Correr linting en archivos
php -l src/*.php

# Ejecutar PHP Code Sniffer (analisis de codigo)
./vendor/bin/phpcs src tests

# Correr pruebas de unidad
./vendor/bin/phpunit

# Si usan docker, apagar el container
docker-compose -f docker-compose-php-build.yml down
```
