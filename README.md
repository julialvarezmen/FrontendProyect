## 🏦 OrangeBank – Gestor Bancario

**OrangeBank** es una aplicación web desarrollada con **React + TypeScript + Vite** que permite gestionar usuarios, cuentas y transacciones bancarias de forma sencilla y eficiente.  
El sistema fue diseñado para simular las operaciones básicas de un banco digital, con una interfaz moderna y responsive.

---

## 🚀 Tecnologías utilizadas

### ⚙️ Frontend
- **React 18**
- **TypeScript 5**
- **Vite 4**
- **Axios** para las peticiones HTTP
- **Bootstrap 5** y **Bootstrap Icons** para el diseño visual
- **React Router DOM 6** para la navegación entre páginas

### 🧩 Backend (conectado)
- **Java Spring Boot**  
  (servicios REST para usuarios, cuentas y transacciones)

---

- 🏠 **Página principal** 
<img width="1920" height="1032" alt="Gestor Bancario y 3 páginas más - Perfil 1_ Microsoft​ Edge 23_10_2025 3_15_25 p  m" src="https://github.com/user-attachments/assets/a107b177-a9ab-4db5-aca5-d830493727e0" />

- **Creacion de usuario** 
<img width="1920" height="1032" alt="Gestor Bancario y 3 páginas más - Perfil 1_ Microsoft​ Edge 23_10_2025 3_15_59 p  m" src="https://github.com/user-attachments/assets/9b195113-a099-47e8-938b-de8081d25bf5" />

- **Inicio de sesión**
<img width="1920" height="1032" alt="Gestor Bancario y 3 páginas más - Perfil 1_ Microsoft​ Edge 23_10_2025 3_16_14 p  m" src="https://github.com/user-attachments/assets/214484b4-fe49-4779-9fd4-c32de03ef0df" />

- **Dashboard principal**
<img width="1920" height="1032" alt="Gestor Bancario y 3 páginas más - Perfil 1_ Microsoft​ Edge 23_10_2025 3_17_16 p  m" src="https://github.com/user-attachments/assets/f8ea7f47-e34d-401d-b7a0-cdb4ae2e0422" />

- **Crear una nueva cuenta bancaria** 
<img width="1920" height="1032" alt="Gestor Bancario y 3 páginas más - Perfil 1_ Microsoft​ Edge 23_10_2025 3_18_02 p  m" src="https://github.com/user-attachments/assets/08d5ca85-dfa2-422b-b349-c2d66cfd4938" />

- **Realizar un deposito a una cuenta propia**
 <img width="1920" height="1032" alt="Gestor Bancario y 3 páginas más - Perfil 1_ Microsoft​ Edge 23_10_2025 3_21_20 p  m" src="https://github.com/user-attachments/assets/bd50bf9a-23dc-4d16-a75d-723d979073c7" />

- **Realizar un retiro a una cuenta propia**
<img width="1920" height="1032" alt="Gestor Bancario y 3 páginas más - Perfil 1_ Microsoft​ Edge 23_10_2025 3_21_29 p  m" src="https://github.com/user-attachments/assets/312976ae-e4d1-4a32-82c0-cbf39f2872e2" />

- **Realizar una transferencia a otra cuenta bancaria**
<img width="1920" height="1032" alt="Gestor Bancario y 3 páginas más - Perfil 1_ Microsoft​ Edge 23_10_2025 3_21_36 p  m" src="https://github.com/user-attachments/assets/9a1445ef-cf1a-4958-ba70-2cd98f749720" />

- **Detalles de la Cuenta**
<img width="1920" height="1032" alt="Gestor Bancario y 3 páginas más - Perfil 1_ Microsoft​ Edge 23_10_2025 4_08_48 p  m" src="https://github.com/user-attachments/assets/81206ad8-7022-4276-8c5f-187f1d4e1146" />


---

## 🧠 Funcionalidades principales

- Registro, edición y eliminación de **usuarios**
- Creación, edición y eliminación de **cuentas bancarias**
- Registro de **transacciones (depósitos, retiros y transferencias)**
- Navegación por rutas con **React Router**
- Consumo de API REST usando **Axios**
- Manejo de errores global con interceptores HTTP
- Diseño responsive con **Bootstrap 5**

---

## 🧩 Estructura del proyecto

Frontend/
│
├── src/
│ ├── api/ # Configuración de Axios y servicios (users, accounts, transactions)
│ ├── components/ # Componentes reutilizables
│ ├── pages/ # Páginas principales (Login, Home, Users, Accounts, Transactions)
│ ├── types/
│ ├── App.tsx # Enrutamiento principal
│ └── main.tsx # Punto de entrada del proyecto
│
│
├── package.json
└── vite.config.ts

---

## ⚙️ Instalación y ejecución

### 1️⃣ Clonar el repositorio
    https://github.com/julialvarezmen/FrontendProyect

### 2️⃣ Instalar dependencias
     npm install

### 3️⃣ Ejecutar en modo desarrollo
     npm run dev
     
### 🔌 Variables de entorno
Crea un archivo .env en la raíz del proyecto con:

VITE_API_URL=http://localhost:8080

### DESARROLLADORES 
- Karoll Escalante
- Julian Alvarez 
