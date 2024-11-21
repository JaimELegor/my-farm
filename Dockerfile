#Escoger la imagen correcta
FROM node:18-alpine as BUILD_IMAGE
WORKDIR /app/react-app

COPY package.json .

#Instalar los paquetes 
RUN npm install

#Copiar los archivos necesarios
COPY . .

#Compilar proyecto
RUN npm run build 

#Implementar el compilado multi-etapa. Reduce el tamano 
#y no expone el codigo en el contenedor.

FROM node:18-alpine as PRODUCTION_IMAGE
WORKDIR /app/react-app
#Vite genera un dir dist donde se encuentran los archivos de compilado
COPY --from=BUILD_IMAGE /app/react-app/dist/ /app/react-app/dist/
EXPOSE 8080
COPY package.json .
COPY vite.config.ts .
RUN npm install typescript
EXPOSE 8080
CMD ["npm", "run", "preview"]
