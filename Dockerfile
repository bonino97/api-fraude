# Utiliza una imagen base de Node
FROM node:18.10

# Crea un directorio para la aplicación
WORKDIR /usr/src/app

# Instala las dependencias del proyecto
COPY package*.json ./
RUN npm install

# Compila el proyecto de TypeScript a JavaScript
COPY . .
RUN npm run build

# Expone el puerto que tu aplicación utilizará
EXPOSE 8080

# Inicia la aplicación
CMD [ "node", "dist/server.js" ]
