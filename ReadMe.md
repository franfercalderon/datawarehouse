"Data Warehouse", sistema de gestión de contactos.

Trabajo integrador del curso de Desarrollo Web Full Stack de Acámica.

Recursos y tecnologías utilizadas

CSS/Sass
JavaScript
Node.js
Nodemon
Express
JWT para autenticación via Token
MySQL
Sequelize
Postman para manejo de endpoints y testing

El objetivo del trabajo es generar un sitio de visualización y gestión de contactos para una empresa de marketing.


Instalación e inicializacion del proyecto

1 - Instalación de dependencias

npm install

3 - Creando base de datos

Abrir XAMPP y asegurarse que el puerto sobre el cual se está ejecutando es el 3306
Inicializar los servicios de Apache y MySQL
Abrir el panel de control del servicio MySQL
Generar una nueva base de datos llamada datawarehouse desde el panel de control

4 - Iniciando el servidor

Desde la terminal poner el siguiente comando :

node server.js

5 - Generar contenido de "relleno" de base de datos:

Desde Postman u otro cliente API, realizar peticiones POST para llenar base de datos. Es importante que se realicen en este orden ya que están relacionados por foreignKeys:

    localhost:3000/start/users
    localhost:3000/start/regions
    localhost:3000/start/countries
    localhost:3000/start/cities
    localhost:3000/start/companies
    localhost:3000/start/contacts
    localhost:3000/start/channels
    localhost:3000/start/contactInfo

Colección de peticiones Postman incluida en los archivos ()

6 - Listo para usar!

Iniciar sesión con el siguiente usuario:

    User: evaluador@acamica.com
    Password: Password123!


______________________________________________________________

"Data Warehouse", contacts management web app.

Last work for Acamica's Full Stack Development course.

Technologies and resources used:

CSS/Sass
JavaScript
Node.js
Nodemon
Express
JWT for Token authentication
MySQL
Sequelize
Postman for endpoints handling testing

This project objective is to provide the (a marketing agency) client with a site to access and handle contacts


Install and initializing project:

1 - Dependencies:

npm install

3 - Data base creation

Open XAMPP and make sure selected port it 3306.
Initialize Apache and MySQL services.
Open MySQL control panel.
Create a new Data Base named datawarehouse.

4 - Starting the server

From the terminal :

node server.js

5 - Generate "filling" content for data base:

From Postman or other API client, make the following POST petitions. It is important to respect this order, since models are linked via foreignKeys:

    localhost:3000/start/users
    localhost:3000/start/regions
    localhost:3000/start/countries
    localhost:3000/start/cities
    localhost:3000/start/companies
    localhost:3000/start/contacts
    localhost:3000/start/channels
    localhost:3000/start/contactInfo

Postman petition collection is incuded on files()

6 - Ready to use!

Sign in using the following information:

    User: evaluador@acamica.com
    Password: Password123!

