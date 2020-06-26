# Imagen base
FROM python:3.7-alpine


RUN apk add htop

# Directorio de trabajo
WORKDIR /app

# Copiar del host al container
COPY requirements.txt /app

# Ejecutar un comando en el container
RUN pip3 install -r requirements.txt

# Copiar todo este directorio al contenedor
COPY . /app

# Comando que se ejecuta al correr el container
ENTRYPOINT ["python3"]

# Parametros default del ENTRYPOINT
CMD ["app.py"]
