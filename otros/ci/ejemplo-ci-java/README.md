# Ejemplo en Java

Requerimientos:

- Java 8 o superior
- Maven

```bash
# Limpiar y correr pruebas de unidad
mvn clean test

# Limpiar y correr build completo: compilar, pruebas de unidad y generacion de jar
mvn clean package

# Ejecutar Checkstyle
mvn checkstyle:check


# Correr todo
mvn clean install
```
