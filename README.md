
## iMPORTANTE LEER PROFE

## 1.- ARCHIVO .emv
Si al momento de clonar el repositorio no esta el archivo .env, se debe de crear uno para que funcione la base de datos. El archivo debe contenter los siguientes parametros (solo copiar y pegar):


## 2.- USUARIOS ADMIN
Si se llegan a borrar todos los usuarios con rol de admin y ya no se puede acceder al panel de administracion lo que se debe hacer es ejecutar el archivo llamado "seed-admin.ts" ubicado en la ruta "src/scripts/seed-admin.ts".

Para ejecutar el script se debe poner en la terminal el siguiente comando npx tsx src/scripts/seed-admin.ts

Este script crea un usuario con el rol admin y con los datos que nosotros pongamos en dicho script