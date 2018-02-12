import { async, ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { Heroe } from '../classes/heroe';
import { Observable } from 'rxjs';

//schemas
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
// providers
import { HeroesService } from '../heroes.service';
// declarations
import { AppComponent } from '../app.component';
import { HeroProfileComponent } from '../hero-profile/hero-profile.component';
import { ModalPollComponent } from '../modal-poll/modal-poll.component';


import { ListadoDeHeroesComponent } from './listado-de-heroes.component';

describe('ListadoDeHeroesComponent', () => {
  let component: ListadoDeHeroesComponent;
  let fixture: ComponentFixture<ListadoDeHeroesComponent>;
  let heroesService: HeroesService;
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
    public getHeroes(){
      return Observable.of({data:{results:HEROES_OBJECT}}).delay(1000);
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
        ListadoDeHeroesComponent
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: HeroesService, useClass: HeroServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoDeHeroesComponent);
    component = fixture.componentInstance;
    heroesService = TestBed.get(HeroesService);
    fixture.detectChanges();
  });

  it('Debería traer el listado de heroes', () => {
    spyOn(heroesService, 'getHeroes').and.callThrough();
    component.ngOnInit();
    expect(heroesService.getHeroes).toHaveBeenCalled();
  });  

  it('Componente debería estar Creada', () => {
    expect(component).toBeDefined();
  });
});
