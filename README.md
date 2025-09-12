
## iMPORTANTE LEER PROFE

## 1.- ARCHIVO .emv
Si al momento de clonar el repositorio no esta el archivo .env, se debe de crear uno para que funcione la base de datos. El archivo debe contenter los siguientes parametros (solo copiar y pegar):

#URI de conexión a MongoDB Atlas

MONGODB_URI=mongodb+srv://jesusadmin:TheHades05@talleresmx-cluster.eadxgbn.mongodb.net/talleresdb?retryWrites=true&w=majority

#Clave secreta para firmar los JWT

JWT_SECRET=mi_secreto_super_seguro

## 2.- USUARIOS ADMIN
Si se llegan a borrar todos los usuarios con rol de admin y ya no se puede acceder al panel de administracion lo que se de hacer es ejecutar el archivo llamado "seed-admin.ts" ubicado en la ruta "src/scripts/seed-admin.ts".

Para ejecutar el script se debe poner en la terminal el siguiente comando npx tsx src/scripts/seed-admin.ts