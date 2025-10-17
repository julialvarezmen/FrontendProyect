# 💳 Gestor Bancario Simple

Aplicación web que permite la **gestión de usuarios, cuentas y transacciones bancarias** (depósitos, retiros y transferencias).  
Desarrollada con un **frontend en Node.js, Express y TypeScript**, que consume una **API REST en Java con Spring Boot**.

---

## 🧠 Descripción General

El **Gestor Bancario Simple** es una herramienta creada para simular las operaciones básicas de un sistema bancario.  
Permite realizar las siguientes acciones:

- Crear, listar, actualizar y eliminar **usuarios**.
- Crear y eliminar **cuentas bancarias** asociadas a un usuario.
- Realizar **depósitos**, **retiros** y **transferencias** entre cuentas.
- Mostrar la información de forma dinámica a través de vistas EJS.

El frontend se comunica con la API backend mediante **peticiones HTTP (fetch)** y está preparado para entornos locales o de despliegue.

---

## ⚙️ Tecnologías Utilizadas

### **Frontend**
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [EJS](https://ejs.co/) – Motor de plantillas para renderizar vistas dinámicas.
- [Axios / Fetch API](https://axios-http.com/) – Comunicación con la API.
- [Bootstrap 5](https://getbootstrap.com/) – Estilos y diseño responsivo.

### **Backend (API)**
- [Java 17+](https://www.oracle.com/java/)
- [Spring Boot](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [H2 / MySQL](https://www.mysql.com/) – Base de datos relacional.
- [Swagger](https://swagger.io/) – Documentación de la API.

---

2. Instalar dependencias
npm install


⚠️ Si usas TypeScript, instala también las dependencias de tipos:

npm install -D typescript ts-node @types/node @types/express

🔹 3. Ejecutar en modo desarrollo
npm run dev


O si no tienes ts-node:

npx ts-node server.ts

🔹 4. Compilar el proyecto
npm run build
