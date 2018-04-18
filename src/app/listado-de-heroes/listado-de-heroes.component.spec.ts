import { async, ComponentFixture, ComponentFixtureAutoDetect, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { Heroe } from '../classes/heroe';
import { Observable } from 'rxjs';
import { Router, Routes} from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { CapitalizePipe } from '../capitalize.pipe';


//schemas
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
// providers
import { HeroesService } from '../heroes.service';
// declarations
import { AppComponent } from '../app.component';
import { HeroProfileComponent } from '../hero-profile/hero-profile.component';
import { ModalPollComponent } from '../modal-poll/modal-poll.component';


import { ListadoDeHeroesComponent } from './listado-de-heroes.component';
import { Location } from '@angular/common';

describe('ListadoDeHeroesComponent', () => {
  let component: ListadoDeHeroesComponent;
  let fixture: ComponentFixture<ListadoDeHeroesComponent>;
  let heroesService: HeroesService;
  let router: Router;

  const routes: Routes = [
    { path: 'listado-heroes', component: ListadoDeHeroesComponent},
    { path: 'heroe/:id', component: HeroProfileComponent},
    { path: 'modal-poll', component: ModalPollComponent},
    { path: '**', redirectTo: '/listado-heroes'}
  ];
  const HEROES_OBJECT =[
    {
      id:'1',
      name:'Spiderman',
      description: 'El hombre que araña',
      modified:new Date(1518417160),
      thumbnail:
      {
      'path': 'https://i.pinimg.com/originals/c2/93/56/c293563aa553250601d8cb768c044d4b',
      'extension': 'jpg'
      },
      resourceURI:'http://gateway.marvel.com/v1/public/characters/1011334',
      teamColor:'yellow'},
    {
      id:'2',
      name:'Spiderman',
      description: 'El hombre que araña',
      modified:new Date(1518417160),
      thumbnail:
      {
      'path': 'https://i.pinimg.com/originals/c2/93/56/c293563aa553250601d8cb768c044d4b',
      'extension': 'jpg'
      },
      resourceURI:'http://gateway.marvel.com/v1/public/characters/1011334',
      teamColor:'red'},
    {
      id:'3',
      name:'Spiderman',
      description: 'El hombre que araña',
      modified:new Date(1518417160),
      thumbnail:
      {
      'path': 'https://i.pinimg.com/originals/c2/93/56/c293563aa553250601d8cb768c044d4b',
      'extension': 'jpg'
      },
      resourceURI:'http://gateway.marvel.com/v1/public/characters/1011334',
      teamColor:'green'}
  ];
  
  
  class HeroServiceMock {
    page;
    public getHeroes(){
      return Observable.of({data:{results:HEROES_OBJECT}}).delay(1000);
    }
    resetPager() {
      const he = new HeroServiceMock();
      he.page = 0;
    }
  
  }
  class RouterStub {
    navigateByUrl(url: string):string {
        return url;
    }
  }
  beforeEach(async(() => {
    
    TestBed.configureTestingModule({
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      declarations: [
        AppComponent,
        ModalPollComponent,
        ListadoDeHeroesComponent,
        HeroProfileComponent,
        CapitalizePipe
      ],
      imports: [RouterTestingModule],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: HeroesService, useClass: HeroServiceMock },
        { provide: Router, useClass: RouterStub},
      ]
    })
    .compileComponents();
      
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoDeHeroesComponent);
    component = fixture.componentInstance;
    heroesService = TestBed.get(HeroesService);
    fixture.detectChanges();
    component.searchString = "spider";
  });

  it('Componente debería estar Creada', () => {
    expect(component).toBeDefined();
  });

  it('Debería traer el listado de heroes', () => {
    spyOn(heroesService, 'getHeroes').and.callThrough();
    component.ngOnInit();
    expect(heroesService.getHeroes).toHaveBeenCalled();
  });  

  it('Debería invocar submitSearch', () => {
    spyOn(heroesService, 'resetPager').and.callThrough();
    spyOn(heroesService, 'getHeroes').and.callThrough();
    component.submitSearch();
    expect(heroesService.getHeroes).toHaveBeenCalled();
  });  
  
  
  it('Debería invocar go_to', inject([Router], (router: Router) => {
    const spy = spyOn(router, 'navigateByUrl').and.callThrough();

    component.go_to(1);

    const url = spy.calls.first().args[0];

    expect(url).toBe('/heroe/1');
}));


  
});

