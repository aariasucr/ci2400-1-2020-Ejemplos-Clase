# Imagen usada de base
FROM python:3.7-alpine

# RUN apk add htop

# Directorio de trabajo
WORKDIR /app

# Copiar de la maquina fisica al contenedor
COPY requirements.txt /app

# Ejecutar comando
RUN pip3 install -r requirements.txt

# Copiar
COPY . /app

# Comando que se ejecuta al correr el container
ENTRYPOINT ["python3"]

# Parametros default del ENTRYPOINT
CMD ["app.py"]
