# Prueba Técnica Backend – Sistema de Reservas

## Descripción

Este proyecto es un **backend desarrollado en Node.js** que implementa un sistema básico de reservas de propiedades, utilizando **GraphQL**, **Apollo Server**, **Express**, **Sequelize** y **MySQL**.

El sistema permite:

- Registro y autenticación de usuarios mediante **JWT**
- Manejo de roles: **owner (propietario)** y **traveler (viajero)**
- CRUD de propiedades (solo propietarios)
- Búsqueda de propiedades disponibles por rango de fechas y capacidad
- Bloqueo de fechas por parte de propietarios
- Creación de reservas por parte de viajeros, respetando reglas de negocio

Este desarrollo corresponde a la **Prueba Técnica Backend 05DIC2025**.

---

## Requisitos

Asegúrate de tener instalado:

- **Node.js v12**
- **MySQL**
- **npm**

---

## Instalación y ejecución

### Clonar el repositorio

```bash
git clone https://github.com/Kylan021/mis-rentas-backend.git
cd mis-rentas-backend
```

### Instalar dependencias

```bash
npm install
```

### Crear base de datos MySQL

Ejecutar en MySQL:

```sql
CREATE DATABASE mis_rentas;
```

---

### Configurar variables de entorno

Copia el archivo `.env.example` y crea tu `.env`:

```bash
cp .env.example .env
```

Ejemplo de `.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=mis_rentas

JWT_SECRET=supersecretkey
PORT=4000
```

---

### Ejecutar el proyecto

Modo desarrollo:

```bash
npm run dev
```

Modo estándar:

```bash
npm start
```

Salida esperada:

```txt
Database connection established successfully.
Models synchronized successfully.
Server running on http://localhost:4000
GraphQL endpoint ready at http://localhost:4000/graphql
```

---

## Endpoint GraphQL

```
http://localhost:4000/graphql
```

Incluye **Apollo Playground** para pruebas.

---

## Ejemplos rápidos

### Registro

```graphql
mutation {
  register(
    name: "Andrés"
    email: "andres@example.com"
    password: "123456"
    role: "owner"
  ) {
    id
    name
    email
    role
  }
}
```

### Login

```graphql
mutation {
  login(email: "andres@example.com", password: "123456") {
    token
    user {
      id
      name
      role
    }
  }
}
```

Agregar el token en **HTTP HEADERS**:

```json
{
  "Authorization": "Bearer TU_TOKEN_AQUÍ"
}
```

### Crear propiedad (owner)

```graphql
mutation {
  createProperty(
    title: "Casa frente al mar"
    description: "Hermosa vista"
    maxGuests: 4
    basePricePerNight: 120.5
  ) {
    id
    title
    maxGuests
    basePricePerNight
  }
}
```

### Buscar propiedades disponibles

```graphql
query {
  searchAvailableProperties(
    start: "2025-12-10"
    end: "2025-12-15"
    guests: 3
  ) {
    id
    title
    maxGuests
    basePricePerNight
  }
}
```

---

## Notas técnicas

- Se utiliza **Apollo Server v2** para compatibilidad con **Node.js 12**
- Manejo de fechas con `DATEONLY`
- Validaciones estrictas de solapamiento
- Uso de `sequelize.sync()` por contexto de prueba técnica

---

## Estado del proyecto

- Autenticación y autorización  
- Manejo de roles  
- Propiedades  
- Búsqueda de disponibilidad  
- Bloqueo de fechas  
- Reservas  

---

## Autor

**Andrés Torres**  
Prueba Técnica Backend – 05DIC2025
