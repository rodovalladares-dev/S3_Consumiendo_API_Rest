# Etapa 1: Construcción (Build) -RvR
FROM node:18-alpine AS build
WORKDIR /app

# Copiar archivos de dependencias e instalar
# COPY package*.json ./
# RUN npm install

# Copiar el resto del código y compilar la app
COPY . .

RUN npm install
RUN npm run build --configuration=production

# Etapa 2: Servidor de Producción (Run)
FROM nginx:alpine

# Copiar los archivos compilados desde la etapa anterior al directorio de Nginx
# Nota: Asegúrate de que la ruta sea correct (dist/nombre-de-tu-app)
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]