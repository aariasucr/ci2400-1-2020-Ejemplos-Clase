# Github Actions

[Mas info](https://help.github.com/en/actions/reference/events-that-trigger-workflows)

## Eventos que disparan un action

Push de cualquier branch

```yaml
name: Solo en Push
on: push
```

Al hacer pull request

```yaml
name: Solo en Pull Request
on: pull_request
```

Al hacer push o pull_request

```yaml
name: Todos Juntos
on: [push, pull_request]
```

Calendarizado (formato cron)

```yaml
name: Cada 15 minutos
on:
  schedule:
    - cron: "*/15 * * * *"
```

## Branches

Tambien se puede filtrar por evento y branch

```yaml
name: Solo Push en Master
on:
  push:
    branches:
      - master
```

```yaml
name: Push en cualquier branch que no sea master
on:
  push:
    branches:
      - "*" # usar comillas cuando se usa * o !
      - "!master"
```

## Pasos condicionales

Ejecutar pasos de un mismo archivo dependiendo del branch

```yaml
name: Ejemplo
on: [push] # va a correr al hacer push en cualquier branch
jobs:
  build:
    name: Pasos de ejemplo
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v1

      - name: Instalar dependencias
        working-directory: ejemplo-clase
        run: npm install

      # Este paso no corre en master
      - name: Pruebas que no corren en master
        if: github.ref != 'refs/heads/master'
        working-directory: ejemplo-clase
        run: npm run ci:test

      # Este paso corre solo en master
      - name: Crear build solo en master
        if: github.ref == 'refs/heads/master'
        working-directory: ejemplo-clase
        run: npm run build
```
