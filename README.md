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

Nótese los archivos creados y los cambios en app.module.ts.

Vamos a incluir el siguiente título en el archivo `src/app/listado-de-heroes/listado-de-heroes.component.html` recién generado:

```
<h1>HOLA SOY EL COMPONENTE</h1>
```

## 4 - Incluyamos el componente ListadoDeHeroes in nuestro componente principal

Si inspeccionamos al archivo `src/app/listado-de-heroes/listado-de-heroes.component.ts` en donde se define el componente *ListadoDeHeroes* veremos el siguiente decorador:

```
@Component({
  selector: 'app-listado-de-heroes',
  ...
})
export class ListadoDeHeroesComponent implements OnInit {
```

Aquí vale la pena darle especial atención a la propiedad *"selector"* que contiene un selector al estilo de CSS, y es esto lo que va a utilizar Angular para incluir nuestro modulo en nuestra aplicación.

Lo veremos con un ejemplo, vamos a editar el template (HTML) de nuestro componente principal que se encuentra en `src/app/listado-de-heroes/listado-de-heroes.component.html`, de forma que se vea así:

```
<app-listado-de-heroes></app-listado-de-heroes>
```

Dese cuenta que es el mismo selector que definimos anteriormente. Ahora revisemos la aplicación para ver que ha pasado.

## 5 - Agreguemos una ruta a nuestro componente ListadoDeHeroes

Existe otro método para incluir componentes en nuestra aplicación, asociándolo a una _ruta_ o _URL_, y para esto vamos a utilizar el módulo de enrutamienta que nos creó el Angular CLI en `src/app/app-routing.module.ts`. Si abrimos el archivo con un editor de texto podremos ver algo similiar a:

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```

El arreglo `routes` (que por los momenos está vacío) es una lista de rutas, estas rutas no son más que objetos en JavaScript similares a:

```
{
    path: 'path/a/mi/componente',
    componente: MiComponente
}
```

De forma que para acceder a nuestro componente *ListadoDeHeroes* mediante una ruta o URL, agreguemos la siguiente entrada al arreglo *routes* en `src/app/app-routing.module.ts`:

```
import { ListadoDeHeroesComponent } from './listado-de-heroes/listado-de-heroes.component';
```
...
```
const routes: Routes = [
  { path: 'listado-heroes', component: ListadoDeHeroesComponent}
];
```

Ahora solo debemos indicar en dónde se va a ver el componente cuando el usuario navegue a la ruta definida, para esto el sistema de enrutamiento de Angular nos proporciona el tag predefinido `<router-outlet></router-outlet>`. De forma que vamos a editar el HTML de nuestro componente principal en `src/app/app.component.html` para que contenga:

```
<router-outlet></router-outlet>
```

Vayamos en nuestro navegador a `https://localhost:4200/listado-heroes` y veamos que pasa.

Para finalizar queda definir una ruta por defecto, en caso de que el usuario navegue a una ruta que no hayamos definido anteriormente, para esto editamos de nuevo nuestro arreglo *routes* en `src/app/app-routing.module.ts`:

```
const routes: Routes = [
  { path: 'listado-heroes', component: ListadoDeHeroesComponent},
  { path: '**', redirectTo: '/listado-heroes'}
];
```

## 6 - Interpolación de Strings

Cuando desarrollamos aplicaciones en Angular es muy común que nos encontramos en el caso de querer mostrar o imprimir el contenido de una variable de nuestro controlador en el HTML. Eso es lo que vamos a hacer a continuación, vamos a definir un atributo del controlador ListadoDeHeroes en `src/app/listado-de-heroes/listado-de-heroes.component.ts`:

```
...
export class ListadoDeHeroesComponent implements OnInit {

    public title = 'Tutorial de Angular - Héroes de Marvel';
...
```

Y a continuación vamos a utilizar la interpolación de string de Angular, mediante la cual podremos acceder a nuestra lógica desde el template (HTML). La notación hace uso de llaves dobles, así:

```
    {{ __expresion__ }}
```

Vamos a editar el template de nuestro componente ListadoDeHeroes, en `src/app/listado-de-heroes/listado-de-heroes.component.html` para imprimir la variable _title_:

```
<h1 class="text-center">{{title}}</h1>
```

## 7 - Importar estilo en la aplicación

Vamos a instalar el paquete de bootstrap mediante _npm_:

```
> npm install –s bootstrap
```

Esto nos va a descargar el estilo de Bootstrap 3 en la siguiente ruta `../node_modules/bootstrap/dist/css/bootstrap.min.css`, ahora solo tenemos que configurar Angular CLI para que incluya este archivo de forma automática en nuestra aplicación, para esto editamos el archivo `.angular-cli.json` en la raiz de nuestra aplicación:

```
…
"styles": [
	"styles.css", 
	"../node_modules/bootstrap/dist/css/bootstrap.min.css“
],
…
```

## 8 - Creación de la clase Heroe

Una de las ventajas de desarrollar con _TypeScript_ es que aplicar conceptos de la programación orientada a objetos es mucho más amigable, y con Angular CLI, crear nuevas clases es muy sencillo. Primero creemos una carpeta en nuestra aplicación para guardar las clases:

```
> mkdir src/app/classes
```

Ahora vamos a generar una clase llamada Heroe usando Angular CLI:

```
> ng g /classes/Heroe
```

Este comando nos va a generar el archivo `src/app/classes/heroe.ts`. El que vamos a editar a continuación para agregar nuevos atributos:

```
constructor(
    public id: string,
    public name: string,
    public description: string,
    public modified: Date,
    public thumbnail: Object,
    public resourceURI: string,
    public teamColor: string
) {}
```

Ahora vamos a incluir un arreglo de héroes en nuesto componente _ListadoDeHeroes_, antes de usar esta nueva clase debemos importarla en `src/app/listado-de-heroes/listado-de-heroes.component.ts`:

```
import { Heroe } from '../classes/heroe';
...
export class ListadoDeHeroesComponent implements OnInit {
    ...
    public heroes: Array<Heroe> = [];
``` 

## 9 - Mostrar la lista de héroes en pantalla

Vamos a descargar [este](https://raw.githubusercontent.com/moalover/angular-tutorial/master/src/styles.css) archivo css y vamos a sobreescribir el siguiente archivo en nuestro proyecto `src/styles.css`.

Después vamos a incluir el siguiente fragmento en el template de nuestro componente en `src/app/listado-de-heroes/listado-de-heroes.component.html`:

```
<h1 class="text-center">{{title}}</h1>
<div class="row">
  <div class="col-xs-12 col-sm-6 col-md-3">
    <a class="hero-entry" [style.background-image]="'url(' + heroes[0].thumbnail.path + '.' + heroes[0].thumbnail.extension + ')'">
      <span>{{heroes[0].name}}</span>
    </a>
  </div>
</div>
```

El marcado anterior no contiene nada que no hayamos visto anteriormente a excepción de este fragmento `[style.background-image]="'url(' + heroe.thumbnail.path + '.' + heroe.thumbnail.extension + ')'"`, que es una _expresión de template (template expression)_ de angular y la estamos usando para definir la propiedad css _background-image_ del elemento en que se encuentra (de forma dinámica).

Es posible que si navegamos a nuestro proyecto nos de un error, pues _heroes[0]_ no existe aún, para solucionar este problema vamos a hacer uso de la directiva estructural `*ngIf` de Angular, para definir cuando se va a renderizar un elemento y cuando no. Sólo hay que añadir el siguiente fragmento al template del componente _ListadoDeHeroes_ en `src/app/listado-de-heroes/listado-de-heroes.component.html`:

```
    <a class="hero-entry" *ngIf="heroes.length > 0" ...
```

Ahora vamos a crear nuestro primer héroe, en la función ngOnInit de nuestro componente _ListadoDeHeroes_ (para más información consultar [aquí](https://v4.angular.io/guide/lifecycle-hooks)). Para ello vamos a incluir este código en `src/app/listado-de-heroes/listado-de-heroes.component.html`:

```
ngOnInit() {
    this.heroes.push(new Heroe(
      '1',
      'Spiderman',
      'El hombre que araña',
      new Date(),
      {
        'path': 'https://i.pinimg.com/originals/c2/93/56/c293563aa553250601d8cb768c044d4b',
        'extension': 'jpg'},
      'http://gateway.marvel.com/v1/public/characters/1011334',
      ''
    ));
}
```

Ahora si navegamos a nuestra aplicación veremos la información del super-héroe. ¿Pero que pasa si tenemos mas de uno?, para solucionar este problema haremos uso de otra directiva estructural, en este caso `*ngFor`, que nos permite iterar sobre un array de elementos. Haremos los siguientes cambios en `src/app/listado-de-heroes/listado-de-heroes.component.html`:

```
    <div class="col-xs-12 col-sm-6 col-md-3">
        <a class="hero-entry" *ngIf="heroes.length > 0" *ngFor="let heroe of heroesService.heroes" [style.background-image]="'url(' + heroe.thumbnail.path + '.' + heroe.thumbnail.extension + ')'">
        <span>{{heroe.name}}</span>
        </a>
    </div>
```

## 10 - Creando un servicio

Vamos a utilizar _Angular CLI_ para crear un servicio dentro de nuestra aplicación. Para ello ejecutamos el siguiente comando:

```
> ng g service Heroes -m app.module.ts
```

Nótese los archivos creados y los cambios en app.module.ts.

La idea de este nuevo servicio es crear un canal de comunicación con un servicio web, en este caso el [API público de Marvel](https://developer.marvel.com/). Y el servicio ha de proveer esta funcionalidad de forma sencilla y reusable al resto de la aplicación.

Dentro de nuestro servicio vamos a hacer uso de otro servicio integrado de Angular que provee funcionalidades de comunicación mediante HTTP, y está disponible en el módulo [HttpClientModule](https://v4.angular.io/guide/http). Primero vamos a incluir dicho módulo en nuestro módulo, editando el archivo `src/app/app.module.ts`:

```
import { HttpClientModule } from '@angular/common/http';

...

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
    HttpClientModule
  ],
```

Ahora podemos hacer uso de este módulo en nuestro servicio, para esto editemos el archivo `src/app/heroes.service.ts`:

```
import { HttpClient } from '@angular/common/http';
...

@Injectable()
export class HeroesService {

  private protocol = 'https:';
  private ApiUrl = '//gateway.marvel.com:443/v1/public/';

  constructor(private http: HttpClient) { }

  getHeroes () {
    const url = this.protocol + this.ApiUrl + 'characters?apikey=56d2cc44b1c84eb7c6c9673565a9eb4b';
    this.http.get<any>(url).subscribe((data) => {
      this.heroes = [];
      data.data.results.forEach( result => {
          this.heroes.push(new Heroe(
            result.id,
            result.name,
            result.description,
            result.modified,
            result.thumbnail,
            result.resourceURI,
            ''
          ));
        }
      );
    });
  }
```