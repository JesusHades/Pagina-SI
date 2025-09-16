
## IMPORTANTE LEER

## Requisitos previos
Antes de iniciar, asegúrate de tener instalado:
Node.js v18 o superior y npm

## Instalar dependencias
Con el comando "npm install" lee package.json y descarga todas las librerías necesarias

## ARCHIVO .env
El proyecto debe contener un archivo con las credenciales de la base de datos para que se haga la conexión y pueda funcionar la app

# URI de conexión a MongoDB Atlas

MONGODB_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/talleresdb?retryWrites=true&w=majority

# Clave secreta para firmar los JWT

JWT_SECRET=mi_secreto_super_seguro

## Dependencias principales
Next.js: Framework de React
React: Librería de UI
TypeScript: Tipado estático
Tailwind: Estilos
MongoDB: Base de datos
jsonwebtoken: Manejo de tokens JWT

## Roles de usuario
Admin: Acceso al panel de administración (/admin)
User: Acceso al dashboard (/dashboard)

## USUARIOS ADMIN
Si se llegan a borrar todos los usuarios con rol de admin y ya no se puede acceder al panel de administracion lo que se debe hacer es ejecutar el archivo llamado "seed-admin.ts" ubicado en la ruta "src/scripts/seed-admin.ts".

Para ejecutar el script se debe poner en la terminal el siguiente comando npx tsx src/scripts/seed-admin.ts

Este script crea un usuario con el rol admin y con los datos que nosotros pongamos en dicho script
