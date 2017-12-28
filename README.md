# Desarrollando una aplicación con Angular y Angular CLI

## Pre-requisitos

### Node

En su ambiente de desarrollo debe estar instalado [Node.js](https://nodejs.org/es/download/) antes de continuar.

Para asegurarse que se encuentre instalado puede hacer uso del siguiente comando

```
> node -v
v6.11.3
```

### Angular CLI

Angular CLI requiere que se tenga instalado Node 6.9.0 o una versión superior, junto con NPM 3. Para instalar [Angular CLI](https://cli.angular.io/) utilizando el manejador de paquetes de [Node.js](https://nodejs.org/es/download/) (npm) debe ejecutar el siguiente comando:

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

- Un nuevo directorio llamado "BechMarvel" es creado.
- Todos los archivos del source de tu aplicación son creados, basándose en el nombre ("BechMarvel" en este caso) y siguiendo las buenas prácticas oficiales de Angular.
- Las dependencias son instaladas (usando NPM).
- Se configura TypeScript.
- Se configura Karma (Testing).
- Se configura Protractor (Testing).
- El proyecto queda listo y configurado para que puedas usarlo como base y seguir construyendo sobre el mismo.

Para continuar, nos dirigiremos al directorio recién creado dónde se creo la aplicación, para ello, en el terminal hacemos:
```
>  cd BechMarvel
```

La forma más sencilla de ejecutar una aplicación para hacer pruebas y desarrollar nuevas funcionalidades es mediante el siguiente comando:

```
> ng serve --open
```

¿que está pasando cuando ejecutamos este comando?:

- Se carga la configuración definida en el archivo .angular-cli.json.
- Se ejecuta Webpack para construir y empaquetar todo el código en JavaScript y CSS.
- Se inicia el Webpack Dev Server en el puerto 4200.
- Con el flag --open, se abrirá automáticamente una ventana del navegador con la aplicación corriendo. Es un flag opcional, que si no queremos que ocurra este comportamiento, podemos omitirlo.


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

## 4 - Incluyamos el componente ListadoDeHeroes en nuestro componente principal

Si inspeccionamos al archivo `src/app/listado-de-heroes/listado-de-heroes.component.ts` en donde se define el componente *ListadoDeHeroes* veremos el siguiente decorador:

```
@Component({
  selector: 'app-listado-de-heroes',
  ...
})
export class ListadoDeHeroesComponent implements OnInit {
```

Aquí vale la pena darle especial atención a la propiedad *"selector"* que contiene un selector al estilo de CSS, y es esto lo que va a utilizar Angular para incluir nuestro modulo en nuestra aplicación.

Lo veremos con un ejemplo, vamos a editar el template (HTML) de nuestro componente principal que se encuentra en `src/app/app.component.html`, de forma que se vea así:

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
> npm install --save bootstrap
```

Esto nos va a descargar el estilo de Bootstrap 3 en la siguiente ruta `../node_modules/bootstrap/dist/css/bootstrap.min.css`, ahora solo tenemos que configurar Angular CLI para que incluya este archivo de forma automática en nuestra aplicación, para esto editamos el archivo `.angular-cli.json` en la raiz de nuestra aplicación:

```
…
"styles": [
  "../node_modules/bootstrap/dist/css/bootstrap.min.css",
  "styles.css"
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
> ng g class /classes/Heroe
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
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-6 col-md-3">
      <a class="hero-entry" [style.background-image]="'url(' + heroes[0].thumbnail.path + '.' + heroes[0].thumbnail.extension + ')'">
        <span>{{heroes[0].name}}</span>
      </a>
    </div>
  </div>
</div>
```

El marcado anterior no contiene nada que no hayamos visto anteriormente a excepción de este fragmento `[style.background-image]="'url(' + heroe.thumbnail.path + '.' + heroe.thumbnail.extension + ')'"`, que es una _expresión de template (template expression)_ de angular y la estamos usando para definir la propiedad css _background-image_ del elemento en que se encuentra (de forma dinámica).

Es posible que si navegamos a nuestro proyecto nos de un error, pues _heroes[0]_ no existe aún, para solucionar este problema vamos a hacer uso de la directiva estructural `*ngIf` de Angular, para definir cuando se va a renderizar un elemento y cuando no. Sólo hay que añadir el siguiente fragmento al template del componente _ListadoDeHeroes_ en `src/app/listado-de-heroes/listado-de-heroes.component.html`:

```
    <div class="col-xs-12 col-sm-6 col-md-3" *ngIf="heroes.length > 0" ...
```

Ahora vamos a crear nuestro primer héroe, en la función ngOnInit de nuestro componente _ListadoDeHeroes_ (para más información consultar [aquí](https://v4.angular.io/guide/lifecycle-hooks)). Para ello vamos a incluir este código en `src/app/listado-de-heroes/listado-de-heroes.component.ts`:

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
    <div *ngFor="let heroe of heroes" class="col-xs-12 col-sm-6 col-md-3">
        <a class="hero-entry" [style.background-image]="'url(' + heroe.thumbnail.path + '.' + heroe.thumbnail.extension + ')'">
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
import { Heroe } from './classes/heroe';
...

@Injectable()
export class HeroesService {

  private protocol = 'https:';
  private ApiUrl = '//gateway.marvel.com:443/v1/public/';
  public heroes: Array<Heroe> = [];

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
}
```

Con esto ya existe un servicio de nuestra aplicación que provee la funcionalidad de obtener héroes del servicio de angular. Y este servicio lo vamos a utilizar desde el componente `ListadoDeHeroes` y para esto vamos a hacer varios cambios.

Importemos e inyectemos el servicio `Heroes` en el componente `ListadoDeHeroes`, editando el archivo `src/app/listado-de-heroes/listado-de-heroes.component.ts` de la siguiente forma:

```
import { HeroesService } from '../heroes.service';

...

    constructor(private heroesService: HeroesService) { }

    ngOnInit() {
        this.heroesService.getHeroes();
    }
``` 

Ya no vamos a utilizar la lista de héroes definida en el componente _ListadoDeHeroes_, en cambio vamos a usar la que definimos en nuestro servicio _Heroes_, por lo que vamos a eliminar esta línea de `src/app/listado-de-heroes/listado-de-heroes.component.ts`:

```
    public heroes: Array<Heroe> = [];
```

Tenemos que reflejar este cambio en el template del componente _ListadoDeHeroes_, por lo que debemos editar el archivo `src/app/listado-de-heroes/listado-de-heroes.component.ts` y cambiar la variable usada en el `*ngFor`:

```
    <div class="hero-entry" ... *ngFor="let heroe of heroesService.heroes" ...
```

Podemos revisar la aplicación desde cualquier navegador para ver los cambios en vivo.

## 11 - Búsqueda de héroes

Nos falta algo fundamental en nuestro componente, y es la capacidad de buscar un héroe en específico. Para esto vamos a añadir un filtro o campo de búsqueda en _ListadoDeHeroes_.

Antes de eso debemos asegurarnos que nuestro servicio _Heroes_ soporte el filtrado, por lo que debemos editar la función _getHeroes_ en `src/app/heroes.service.ts`:

```
  getHeroes (nameStartsWith?: string) {
    const url = this.protocol + this.ApiUrl + 'characters?apikey=56d2cc44b1c84eb7c6c9673565a9eb4b'
    + (nameStartsWith ? ('&nameStartsWith=' + nameStartsWith) : '');
    ...
  }
```

Lo segundo es agregar un nuevo atributo a la clase de nuestro componente _ListadoDeHeroes_ que nos sirva como campo de búsqueda, y adicionalmente creamos una función que realice dicha búsqueda, para esto editamos `src/app/listado-de-heroes/listado-de-heroes.component.html`:

```
export class ListadoDeHeroesComponent implements OnInit {

  ...
  public searchString : string;

  ...
  submitSearch() {
    this.heroesService.getHeroes(this.searchString);
  }
```

Lo que sigue es agregar el campo de texto al template en `src/app/listado-de-heroes/listado-de-heroes.component.html`:

```
<h1 class="text-center">{{title}}</h1>
<div class="row">


  <form (ngSubmit)="submitSearch()">
    <div class="form-group col-xs-12">
      <input type="text" [(ngModel)]="searchString" name="searchString" class="form-control" id="search" placeholder="Búsqueda de super-héroe">
    </div>
  </form>
  ...
```

Para resolver el error que la aplicación arroja en este momento, es necesario editar el módulo principal, en `src/app/app.module.ts` agregando el módulo _FormsModule_:

```
import { FormsModule } from '@angular/forms';
...

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...,
    FormsModule
  ],
  ...
```

Nótese la sentencia `ngSubmit` y el two-way binding `ngModel`. Lo que hacen en escencia es reaccionar al event "submit" del formulario y enlazar el atributo 'searchString' con el campo de texto respectivamente.

## 12 - Paginación

Nos sigue faltando algo muy importante en nuestro componente _ListadoDeHeroes_ y es la habilidad de poder paginar entre todos los héroes provistos por el servicio web de Marvel.

Tal y como hicimos al agregar la búsqueda de heroes, lo primero es asegurarnos de que el servicio _Heroes_ soporte la paginación. Por lo debemos editar la función _getHeroes_ en `src/app/heroes.service.ts`:

```
export class HeroesService {
    ...
    public page = 0;
    public step = 20;
    public total = 0;

    ...

    resetPager() {
        this.page = 0;
    }

    getHeroes (nameStartsWith?: string, page?: number) {
        if (page || page === 0) {
          this.page = page;
        }
        const url = this.protocol + this.ApiUrl + 'characters?apikey=56d2cc44b1c84eb7c6c9673565a9eb4b'
        + '&offset=' + (this.page * this.step)
        + (nameStartsWith ? ('&nameStartsWith=' + nameStartsWith) : '');
        this.http.get<any>(url).subscribe((data) => {
            this.heroes = [];
            this.total = Math.ceil(data.data.total / this.step);
        ...
```

Ahora vamos a agregar dos funciones a la clase del componente _ListadoDeHeroes_, editando `src/app/listado-de-heroes/listado-de-heroes.component.ts`

```
...
export class ListadoDeHeroesComponent implements OnInit {
  ...
  prevPage() {
    this.heroesService.getHeroes(this.searchString, this.heroesService.page - 1);
  }

  nextPage() {
    this.heroesService.getHeroes(this.searchString, this.heroesService.page + 1);
  }
```

Por último vamos a editar el template del componente _ListadoDeHeroes_ para agregar la paginación al HTML. Debemos editar el archivo `src/app/listado-de-heroes/listado-de-heroes.component.html`:

```
<div class="row">
  ...
  <div class="paginator col-xs-12">
    <a class="paginator-prev" (click)="prevPage()" *ngIf="heroesService.page > 0">Prev</a>
    Página {{heroesService.page + 1}} de {{heroesService.total}}
    <a class="paginator-next" (click)="nextPage()" *ngIf="heroesService.page < heroesService.total - 1">Next</a>
  </div>
</div>
```

## 13 - Perfil de héroe

Finalmente nuestra aplicación tiene lo esencial para consultar y listar héroes de forma amigable y efectiva. El próximo paso es poder seleccionar un héroe de la lista y ver más detalles del mismo. Para esto vamos a generar un nuevo componente usando _Angular CLI_:

```
> ng g component HeroProfile
```

De igual forma vamos a agregar una ruta en nuestro módulo enrutador que envíe al usuario al nuevo componente, para esto editamos `src/app/app-routing.module.ts`:

```
import { HeroProfileComponent } from './hero-profile/hero-profile.component';

...

const routes: Routes = [
  { path: 'listado-heroes', component: ListadoDeHeroesComponent},
  { path: 'heroe/:id', component: HeroProfileComponent},
  { path: '**', redirectTo: '/listado-heroes'}
];
```

Hasta ahora nuestras entradas en la lista de héroes del componente _ListadoDeHeroes_ han sido enlaces (\<a>) que no van a ningún lugar (no tienen atributo href), eso está a punto de cambiar. Editemos el template del _ListadoDeHeroes_ para que los enlaces de cada héroe enruten al usuario al compente _HeroProfile_ recién creado, para eso editemos `src/app/listado-de-heroes/listado-de-heroes.component.html`:

```
    <div *ngFor="let heroe of heroesService.heroes" class="col-xs-12 col-sm-6 col-md-3">
        <a [routerLink]="['/heroe', heroe.id]" ...>
            ...
        </a>
    </div>
```

Probemos haciendo click en algún héroe a ver que pasa.

El próximo paso es capturar el parámetro `:id` que definimos en la ruta a _HeroProfile_, para eso editamos `src/app/hero-profile/hero-profile.component.ts`:

```
...
import { ActivatedRoute } from '@angular/router';

...

export class HeroProfileComponent implements OnInit {
  private id;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
    });
  }

```

Ahora queremos ampliar nuestro servicio `Heroes` para poder hacer consultas de los detalles de un heroe en particular en base a su id (que ya poseemos). Editamos `src/app/heroes.service.ts` para agregar una nueva función:

```
export class HeroesService {
    ...
    getHeroe(id) {
        const url = this.protocol + this.ApiUrl + 'characters/' + id + '?apikey=56d2cc44b1c84eb7c6c9673565a9eb4b';
        return this.http.get<any>(url);
    }
```

A continuación podemos ampliar el componente `HeroProfile` para que utilice el parámetro id y haga una consulta al servicio web mediante el servicio `Heroes`. Editamos `src/app/hero-profile/hero-profile.component.ts`:

```
...
import { Heroe } from '../classes/heroe';
import { HeroesService } from '../heroes.service';
...

export class HeroProfileComponent implements OnInit {
  private id;
  public heroe: Heroe;
  
  constructor(private route: ActivatedRoute, private heroesService: HeroesService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.heroesService.getHeroe(this.id).subscribe(data => {
        const temp = data.data.results[0];
        this.heroe = new Heroe(temp.id, temp.name, temp.description, temp. modified, temp.thumbnail, temp.resourceURI,'');
      });
    });
    
  }
```

Ya tenemos la data del heroe en el componente _HeroProfile_, solo nos queda actualizar el template del mismo para reflejarla, editemos `src/app/hero-profile/hero-profile.component.html` para que se vea así:

```
<ng-container *ngIf="heroe">
  <h1 class="text-center">{{heroe.name}}</h1>
  <div class="container">
    <div class="row" class="heroe-profile">

      <div class="col-xs-12 col-sm-6 col-md-4">
        <img [src]="heroe.thumbnail.path + '.' + heroe.thumbnail.extension">
      </div>
      <div class="col-xs-12 col-sm-6 col-md-8">
        <h3>Descripción</h3>
        <p>{{heroe.description}}</p>
        <p class="modified">{{heroe.modified | date:'fullDate'}}, {{heroe.modified | date:'shortTime'}}</p>
      </div>
    </div>
  </div>
</ng-container>
```

Por último nos queda dar la opción al usuario de regresar al listado desde el perfil de algún héroe, esta opción la podemos incluir utilizando el service _Location_ que disponibiliza Angular. Vamos a incluir este servicio en _HeroProfile_ y a crear una función que devuelva al usuario a la página anterior, para esto editamos `src/app/hero-profile/hero-profile.component.ts`:

```
...
import { Location } from '@angular/common';
...

export class HeroProfileComponent implements OnInit {
    ...

    constructor(..., private _location: Location) { }

    goBack() {
        this._location.back();
    }
```

Solo nos queda añadir un botón en el template de _HeroProfile_ que llame a la función `goBack` y envíe al usuario a la página anterior, así que editemos `src/app/hero-profile/hero-profile.component.html`:

```
ng-container *ngIf="heroe">
    <h1 class="text-center">{{heroe.name}}</h1>
    <a class="goback" (click)="goBack()">Atrás</a>
    ...
```
## 14 - Clasificar a un héroe (Invocando un componente dentro de otro)

Añadiremos una funcionalidad más: poder ingresar a un héroe a un determinado equipo, caracterizado por un color. Para ello, nos valdremos de un componente más, un modal que nos muestre las categorías disponibles de Equipos y la posibilidad de agregar el héroe seleccionado a dicho equipo. Este modal, será inyectado desde el componente del Profile del Héroe y se podrá acceder a él mediante un botón.

Por tanto, lo primero que realizaremos será crear otro componente denominado modal-poll con ng cli:

```
> ng g component modal-poll
```

Llenaremos la clase del componente recién creada con los siguientes imports que ocuparemos posteriormente y el atributo show_modal, que nos permitirá controlar cuando se mostrará el modal en `src/app/modal-poll/modal-poll.component.ts`

```
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-modal-poll',
  templateUrl: './modal-poll.component.html',
  styleUrls: ['./modal-poll.component.css']
})
export class ModalPollComponent implements OnInit {
  public show_modal: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  toggle_modal(): void {
    this.show_modal = !this.show_modal;
  }

}
```

Ahora le daremos la estructura a nuestro modal, para ello editamos `src/app/modal-poll/modal-poll.component.html` y copiamos el siguiente código html:

```
<div class="page-modal" *ngIf="show_modal">
  <div class="modal-dialog">
      <div class="modal-content">
          <!-- Title -->
          <div *ngIf="title_modal!=''" class="modal-header">
              <button type="button" class="close" (click)="toggle_modal()" aria-hidden="true">
                  &times;
              </button>
              <h4 class="modal-title">Soy un modal</h4>
          </div>
          <!-- Content -->
          <div class="modal-body bg-white">
              <div class="width-100">
                  <div class="no-margin">
                      <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 red-row"></div>
                      <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 blue-row"></div>
                      <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 yellow-row"></div>
                  </div>
                  <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-center">
                      <div class="group bg-blue to_the_left">Azul</div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-center">
                      <div class="group bg-violet">Violeta</div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-center">
                      <div class="group bg-orange to_the_left">Naranjo</div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-center">
                      <div class="group bg-green">Verde</div>
                    </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</div>

```

Nótese que el tag que engloba todo el componente tiene una directiva de estructura *ngIf, que renderiza el elemento que la contiene sí y sólo sí se cumple la expresión que encierran sus comillas, en este caso nuestra expresión es una variale booleana.
```
*ngIf="show_modal"
```

Adicionalmente, se asocia la función que creamos en el archivo .ts que hará toggle de nuestro modal:
```
(click)="toggle_modal()"
```
Para poder comprobar que nuestro modal funciona, vamos a asociarle un url para acceder a él. Para esto, primero cambiamos su visibilidad asignando true a la variable show_modal en `src/app/modal-poll/modal-poll.component.ts`:
```
  public show_modal: boolean = true;
```
Luego, la ruta la agregamos en `src/app/app-routing.module.ts` de esta forma: 
```
....
import { ModalPollComponent } from './modal-poll/modal-poll.component';
....
{ path: 'modal-poll', component: ModalPollComponent},
.....
```
De esta forma, al acceder a `http://localhost:4200/modal-poll`,podremos ver el modal que creamos.

Ya que comprobamos la creación de nuestro nuevo componente, sigamos con nuestro objetivo: conectar este componente con el resto de la aplicación.

Primero, debemos editar `src/app/modal-poll/modal-poll.component.ts` y agregarle un atributo a nuestra clase que permita cambiar el nombre del modal. Pero haremos esta asignación de nombre desde el componente padre. Aquí introduciremos el decorador @Input, que permite instanciar variables de un componente en otro. 
```
    @Input() public title_modal : string;
```
Esta línea de código en esencia, lo que permite es que esa variable sea instanciada desde cualquier lugar de la aplicación.

Posteriormente, en el componente padre, se deben realizar algunas cosas para reconocer a este componente hijo que se pretende incluir.

Agregamos la ruta del componente hijo(modal-poll) en el componente padre(hero-profile). Así que abrimos el archivo `src/app/hero-profile/hero-profile.component.ts`, agregamos el import del componente hijo y declaramos una variable que servirá para instanciar el título del modal en el componente hijo:
```
...
import { ModalPollComponent } from '../modal-poll/modal-poll.component';
...

public question_modal: string;

..
```
Adicionalmente, debemos agregar el selector html o tag html que identifica al componente hijo dentro del componente padre, así como también, el atributo que deseamos llenar desde el componente padre *title_modal* es el nombre con el que se definió el atributo en el componente hijo, mientras que question_modal es el nombre con el que se declaró en el componente padre. Por tanto, en el archivo `src/app/hero-profile/hero-profile.component.html` agregamos lo siguiente:
```
<app-modal-poll [title_modal]="question_modal"></app-modal-poll>
```

Ya tenemos listas las asociaciones, pero nos hace falta un evento para disparar o invocar al componente del modal. Para ello, primero definimos una variable de template local sobre el tag html del componente hijo, en el archivo `src/app/hero-profile/hero-profile.component.html`, de esta forma: 

```
<modal-poll [title_modal]="question_modal" #modal></modal-poll>
```
Y en el archivo `src/app/hero-profile/hero-profile.component.ts`, declaramos lo siguiente: 
```
....
import { Component, OnInit, ViewChild } from '@angular/core';
...
@ViewChild('modal') modal;
....
```
Este decorador, permite manipular el objeto DOM asociado al selector que tiene entre paréntesis. El segundo nombre es por el cual será llamado en la clase del componente padre. Al hacer esa última línea, ya podremos utilizar todas las funciones asociadas al componente modal desde el componente padre.

Lo último que nos falta es invocar nuestro componente hijo, desde el componente padre. Lo haremos a través del evento click asociado a un botón en la interfaz del componente padre, que a su vez ejecutará la función launchModal(). Esta función realizará dos cosas: Instanciará el título del modal y lo hará visible, para ello, añadimos las siguientes líneas de código al archivo `src/app/hero-profile/hero-profile.component.ts`:

```
....
launchModal():void{
    this.question_modal="¿En cual grupo quieres colocar a tu súper héroe?";
    this.modal.toggle_modal();
  }
  ....
```
Y las siguientes líneas de código en `src/app/hero-profile/hero-profile.component.html`:
```
<p><button type="button" class="btn btn-primary" (click)="launchModal()">Clasificar</button></p>
```

Ahora queremos la comunicación del lado inverso, **queremos que el componente hijo le envíe información al componente padre**. La información que enviaremos será la elección del equipo elegido para un superhéroe en cuestión, para que se muestre en el profile del mismo. Para realizar esto, ocuparemos la clase *EventEmitter*, que permite enviar eventos entre componentes. El primer paso para realizar esto es crear en `src/app/modal-poll/modal-poll.component.ts` una variable que nos permita guardar el evento que vamos a crear y que posteriormente enviaremos, además esta variable debe contener el decorador Output que le indicará al componente que es una variable que se compartirá con otro componente:
```
...

@Output() setTeam:EventEmitter<string> = new EventEmitter<string>();
...

```

También será necesario incluir una función que llene esa variable, de forma tal que le permita empaquetarla y enviarla en la forma de un evento. Para esto en el mismo archivo que editamos anteriormente, hacemos:

```
send_team(team: string): void {
    this.setTeam.emit(team);
    this.toggle_modal();
  }
```
Luego en el html, `src/app/modal-poll/modal-poll.component.html`, asociamos la función recién creada a un evento click. Lo que ocurrirá aquí es que desde la interfaz se mandará el string *azul* como evento, una vez sea clickado ese botón:
```
<div class="group bg-blue to_the_left" (click)="send_team('azul')">Azul</div>
```
Lo que necesitamos ahora es preparar al componente padre para recibir tal evento, por tanto, en `src/app/hero-profile/hero-profile.component.ts`, creamos una variable que recibirá el team y la función que manipulará esa información guardada en *team*:
```
public team:string = "";
....
getTeam(team):void{
    this.team = team;
    this.heroesService.teams.set(this.heroe.id, this.team);
  }
.....

```
En este último código, podemos observar que estamos ocupando un atributo del servicio que no habíamos usado antes. Dado que no podemos modificar la API que consultamos, para hacer que persista la elección del equipo, creamos un objeto Map que permita guardar las asociaciones entre un héroe y un equipo en el servicio `src/app/heroes.service.ts`. La razón por la que se hace en el servicio es que queremos que esta información esté disponible para todos los componentes. Para ello, en este archivo, agregamos estas líneas:

Primero una variable que permita asociar un color en nombre natural con su código en hexadecimal:
```
public group_colors = {"azul" : "#1f8ff7",
            "violeta":"#a43de3",
            "naranjo":"#df5c0f",
            "verde":"#0ea521"}
```
También agregamos el atributo que guardará las asociaciones:
```
  public teams = new Map();

```
Se crea la función que buscará si el superheroe tiene equipo:
```
  getTeamColor(id):string{
      if(this.teams.get(id)!=undefined){
      return this.teams.get(id);
      }
      else{
      return "";
      }
  }
```
Y se coloca en la construcción inicial de todos los héroes para que pinte el color del equipo al que se le asignó:
```
new Heroe(
    result.id,
    result.name,
    result.description,
    result.modified,
    result.thumbnail,
    result.resourceURI,
    this.getTeamColor(result.id)
  )
```

Regresamos al componente padre. Nos falta establecer el binding desde el html del componente padre, es decir, recibir la información a través del objeto $event, para ello en el archivo `src/app/hero-profile/hero-profile.component.ts`, agregamos este atributo sobre el selector del componente hijo, quedando de esta forma:
```
<modal-poll (setTeam)="getTeam($event)" [title_modal]="question_modal" #modal></modal-poll>
```

*setTeam* es la función del componente hijo que emitirá el evento que guarda el equipo que se eligió. Y *getTeam* guardará el payload de lo que retorna la primera función, que básicamente es un evento $event.

De igual forma, ya podremos ver en el componente padre la selección que se realiza en el modal. Para comprobarlo, agregamos, en el mismo html, esta línea de código para ver el valor:
```
<p *ngIf="team!=undefined && team!=''">Acabas de clasificar a tu heroe en el equipo <b [style.color]="heroesService.group_colors[team]">{{team}}</b></p>
```

Este cambio a su vez nos servirá para que se evidencie la elección del equipo en el listado externo. Para ello basta agregar en el archivo
`src/app/listado-de-heroes/listado-de-heroes.component.html`, las siguientes líneas:

```
<a [routerLink]="'/heroe/' + heroe.id" class="hero-entry" [style.border-color]="heroesService['group_colors'][heroe.teamColor]" [style.background-image]="'url(' + heroe.thumbnail.path + '.' + heroe.thumbnail.extension + ')'">
      <span>{{heroe.name}}</span>
    </a>
```
Nos dirigimos al selector a, que contiene el id y thumbnail de la foto del héroe. Como podemos ve, el atributo que agregamos fue:
```
[style.border-color]="heroesService['group_colors'][heroe.teamColor]" 
```

Por último, vamos a comprobar si se agregó bien el equipo al superheroe. Deben ocurrir dos cosas:
- Al ingresar al componente *heroe-profile*, debe indicar el equipo al cual ya pertenece el héroe.
- Al ingresar al componente modal-poll, se debe marcar la selección realizada previamente.

Lo primero se logrará revisando si el superheroe pertenece a algún grupo, al invocar la función getTeamColor del servicio que creamos, que se colocará en la creación del heroe. Todo esto en el archivo `src/app/hero-profile/hero-profile.component.ts`
```
this.heroe = new Heroe(temp.id, temp.name, temp.description, temp. modified, temp.thumbnail, temp.resourceURI,this.heroesService.getTeamColor(temp.id));
```
Así mismo, se guardará ese valor en la
variable team del componente, que inicialmente la inicializamos en "".
```
this.team = this.heroe.teamColor;
```

Lo segundo se logra mandándole el team seleccionado que se guardó en la variable team del componente `src/app/hero-profile/hero-profile.component.ts`, al componente del modal a través de una variable con decorador @Input, que permitirá instanciar la variable team_selected del componente modal desde el componente padre que es heroes-profile. Por tanto primero definimos la variable en el componente modal(`src/app/modal-poll/modal-poll.component.ts`), haciendo:
```
@Input() public team_selected : string;
```

Y luego en el html del componente padre o hero-profile(`src/app/hero-profile/hero-profile.component.html`), colocamos:
```
[team_selected]="team" 
```
Lo cual nos quedaría en:
```
<modal-poll (setTeam)="getTeam($event)" [title_modal]="question_modal" [team_selected]="team" #modal></modal-poll>
```

Finalmente, en la interfaz del componente hijo (modal-poll), nos valemos de la directiva ngClass, para establecer una lógica que permita agregar una clase selected al div que haya sido seleccionado, agregando en cada botón la siguiente propiedad, con su color correspondiente:
```
[ngClass]="{'selected': team_selected=='azul'}"
```
Para hacer más rápido el trabajo, reemplazamos todo el bloque de botones con:
```
                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-center">
                      <div class="group bg-blue to_the_left" [ngClass]="{'selected': team_selected=='azul'}" (click)="send_team('azul')">Azul</div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-center">
                      <div class="group bg-violet" [ngClass]="{'selected': team_selected=='violeta'}" (click)="send_team('violeta')">Violeta</div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-center">
                      <div class="group bg-orange to_the_left" [ngClass]="{'selected': team_selected=='naranjo'}" (click)="send_team('naranjo')">Naranjo</div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-center">
                      <div class="group bg-green" [ngClass]="{'selected': team_selected=='verde'}" (click)="send_team('verde')">Verde</div>
                    </div>
                  </div>
```

Esperamos el curso haya resultado útil, por favor, nos serviría mucho si nos dan su feedback a través de este enlace: [ENCUESTA](https://form.jotformz.com/73514590034654).




