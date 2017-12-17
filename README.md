# Construllendo una aplicación con Angular y Angular CLI

## Pre-requisitos

### Node

En su ambiente de desarrollo de estar instalado [Node.js](https://nodejs.org/es/download/) antes de continuar.

Para asegurarse que se encuentre instalado puede hacer uso del siguiente comando

```
> node -v
v6.11.3
```

### Angular CLI

Para instalar [Angular CLI](https://cli.angular.io/) utilizando el manejador de paquetes de [Node.js](https://nodejs.org/es/download/) (npm) debe ejecutar el siguiente comando:

```
> npm install -g @angular/cli
```

Por último para verificar la instalación puede hacer uso del siguiente comando:

```
> ng -v
    _                      _                 ____ _     ___
   / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
  / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
 / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
/_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
               |___/
@angular/cli: 1.4.2
node: 6.11.3
os: win32 x64
```

Una vez realizados estos pasos estaremos listos para empezar a desarrollar nuestra aplicación.

## 1 - Angular CLI

Angular CLI es una interfaz de comandos para Angular que nos permite automatizar varios procesos mediante simples comandos, como por ejemplo:

- Crear aplicaciones en Angular rápidamente.
- Ejecutar un servidor de desarrollo con LiveReload.
- Añadir features a tu aplicación de Angular.
- Realizar pruebas unitarias y end-to-end.
- Hace build de tu aplicación para producción.

Y algo muy importante es que ya tiene muchas buenas prácticas oficiales preconfiguradas, así que nos va a ayudar a mantener un estándar de código.

## 2 - Crear una aplicación

Para generar un nuevo esqueleto de aplicación (una aplicación mínima) ideal para empezar a desarrollar siguiendo las mejores prácticas y estándares de programación en Angular, podemos hacer uso del comando _ng new_.

Supóngase que queremos crear un nuevo proyecto llamado *"BechMarvel"*:

```
> ng new BechMarvel -routing
```

Pero, ¿que está pasando cuando ejecutamos este comando?:

- Un nuevo directorio llamado "AccenTest" es creado.
- Todo los archivos del source de tu aplicación son creados, basándose en el nombre ("BechMarvel" en este caso) y siguiendo las buenas prácticas oficiales de Angular.
- Las dependencias son instaladas (usando NPM).
- Se configura TypeScript.
- Se configura Karma (Testing).
- Se configura Protractor (Testing).
- EL proyecto queda listo y configurado para que puedas usarlo como base y seguir construyendo sobre el mismo.

La forma más sencilla de ejecutar una aplicación para hacer pruebas y desarrollar nuevas funcionalidades es mediante el siguiente comando:

```
> ng serve
```

¿que está pasando cuando ejecutamos este comando?:

- Se carga la configuración definida en el archivo .angular-cli.json.
- Se ejecuta Webpack para construir y empaquetar todo el código en JavaScript y CSS.
- Se inicia el Webpack Dev Server en el puerto 4200.

## 3 - Crear un componente

Vamos a generar el primer componente de nuestra aplicación, ejecutando el siguiente comando:

```
> ng generate component ListadoDeHeroes
```

Nótese los archivos creados y los cambios en app.module.ts
