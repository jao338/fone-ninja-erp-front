FROM node:20-alpine

WORKDIR /app

# Copia TODO o projeto antes
COPY . .

# Instala dependências (agora o quasar.config existe)
RUN npm install

EXPOSE 9000

CMD ["npm", "run", "dev"]