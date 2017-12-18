# Desarrolando una aplicación con Angular y Angular CLI

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

- Un nuevo directorio llamado "BechMarvel" es creado.
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
	"styles.css", 
	"../node_modules/bootstrap/dist/css/bootstrap.min.css"
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
    <a class="hero-entry" ... *ngFor="let heroe of heroesService.heroes" ...
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
        if (page) {
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

Finalmente nuestra aplicación tiene lo escencial para consultar y listar héroes de forma amigable y efectiva. El próximo paso es poder seleccionar un héroe de la lista y ver más detalles del mismo. Para esto vamos a generar un nuevo componente usando _Angular CLI_:

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
  
  <div class="row" class="heroe-profile">

    <div class="col-xs-12 col-sm-6 col-md-4">
      <img [src]="heroe.thumbnail.path + '.' + heroe.thumbnail.extension">
    </div>
    <div class="col-xs-12 col-sm-6 col-md-8">
      <h3>Descripción</h3>
      <p>{{heroe.description}}</p>
      <span class="modified">{{heroe.modified | date:'fullDate'}}, {{heroe.modified | date:'shortTime'}}</span>
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