# Fone Ninja - Desafio Técnico

Este projeto utiliza **Quasar Framework + Vue 3 + Typescript** rodando em containers Docker.

---
## 🧱 Stack

* Node.js
* Quasar Framework (Vite)
* Vue 3
* TypeScript
* Pinia
* Vue Router
* Docker + Docker Compose

---

## 🚀 Executando com Docker

Este projeto já está preparado para execução via Docker. **Não é necessário instalar Node.js ou dependências localmente**.

### Pré-requisitos

* Docker
* Docker Compose

### Subir o projeto

Na raiz do projeto, execute:

```bash
docker compose up -d --build
```

A aplicação estará disponível em:

```
http://localhost:9000
```

### Parar o projeto

```bash
docker compose down
```

---

## 🛠️ Execução local (sem Docker)

### Instalar dependências

```bash
yarn
# ou
npm install
```

### Rodar em modo desenvolvimento

```bash
quasar dev
```

Acesse:

```
http://localhost:9000
```