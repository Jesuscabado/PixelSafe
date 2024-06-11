# Usa una imagen base oficial de Node.js
FROM node:18.0

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto de la aplicación
EXPOSE 3000

# Comando para inicializar la base de datos y luego iniciar la aplicación
CMD ["bash", "-c", "node initDatabase.js && npm run dev"]
