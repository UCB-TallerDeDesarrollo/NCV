# Aplicacion Niños con valor

<img alt="Logo" align="right" src="./web-ui/src/Assets/img/logo-ncv.png" width="20%" />

<details>
    <summary><strong>Comandos para instalar</strong></summary>

- Abrir una ventana de comandos CMD
  Ejecutar los siguientes comandos para verificar la instalación
  node --version
  npm --version
- Crear un proyecto con React Js
  npx create-react-app "Nombre de la aplicacion"
- Abrir Visual studio Code y ejecutar el siguiente comando
  npm start
- Comandos adicionales en caso de que las rutas no funcionen
  npm i react-router-dom

</details>

<details>
  <summary><strong>Comandos para Inicializar</strong></summary>

#### Comando para instalar Dependencias

    npm install

#### Comando para Ejecutar el Proyecto

    npm start

- _Comienza a escuchar en el puerto [localhost 3000](http://localhost:3000/)_

</details>

<details>
    <summary><strong>Tecnologías usadas</strong></summary>

[![Material Version](https://img.shields.io/badge/Material--ui-v5.-blue)](https://mui.com/material-ui/getting-started/installation/)

Nos ofrece componentes para un desarrollo web más rápido y fácil. Construya su propio sistema de diseño o comience con el diseño de materiales.

[![React Version](https://img.shields.io/badge/React-17.0.2-9cf)](https://es.reactjs.org/)

React te ayuda a crear interfaces de usuario interactivas de forma sencilla. Diseña vistas simples para cada estado en tu aplicación, y React se encargará de actualizar y renderizar de manera eficiente los componentes correctos cuando los datos cambien.

[![Firebase Version](https://img.shields.io/badge/Firebase-4.5.0-yellowgreen)](https://console.firebase.google.com/u/0/?hl=es&pli=1)

Nos ofrece herramientas de Google para compilar infraestructuras de apps, mejorar la calidad de las apps y desarrollar tu empresa

[![Axios Version](https://img.shields.io/badge/Axios-0.27.2-red)](https://www.npmjs.com/package/axios)

Cliente HTTP basado en promesas para el navegador y el nodo.js

[![JavaScript Version](https://img.shields.io/badge/Javascript-ECMA%206-inactive)](https://www.w3schools.com/js/js_es6.asp)

ECMAScript 2015 fue la segunda revisión importante de JavaScript.

[![react-export-excel Version](https://img.shields.io/badge/react--export--excel-0.5.3-blueviolet)](https://www.npmjs.com/package/react-export-excel)

Una biblioteca de exportación a Excel creada con y para React.

</details>

<details>
    <summary><strong>Estructura de Carpetas y Folders</strong></summary>

- api

  - NinosConValorAPI

    - **Controller**

    - **Data**

    - **Documentation**
    - **Exceptions**
    - **Migrations**
    - **Models**
    - **Properties**
    - **Services** -**AutomapperProfile.cs** -**NinosConValorAPI.csproj** -**Program.cs** -**appsettings.Development.json** -**appsettings.json**

  - UnitTests
  - NinosConValorAPI.sln

- web-ui

  - cypress

  - build

  - node modules

  - public

  - src

    - **Assets**: Imagenes que se usan, como el logo, etc.

    - **Components**: El proyecto utilza componentes para poder reutilizarlos en varias vistas.

    - **Views**: En este folder se encuentran todas las vistas del proyecto.
      - **FixedAssets** : En esta vista se manejan los activos fijos de la organizacion
      - **HomePage**: La vista secundaria desde esta vista se redireccionan a las demas vistas si se inicio sesion correctamente
      - **KidsFile**: Manejo de los files de niños
      - **Login**: Vista principal de la pagina si no se inicia sesion no se podra acceder a las demas vistas
      - **User**: En este archivo se gestiona todo lo relacionado con los usuarios.

  - .env

- package.json
- README.md

</details>

</details>

### Pila de Tecnologia

<code><img height="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/firebase/firebase.png"></code>
<code><img height="30" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/250px-React.svg.png"></code>
<code><img height="30" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Visual_Studio_Icon_2019.svg/125px-Visual_Studio_Icon_2019.svg.png"></code>
<code><img height="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/visual-studio-code/visual-studio-code.png"></code>

<code><img height="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/git/git.png"></code>
<code><img height="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/terminal/terminal.png"></code>
