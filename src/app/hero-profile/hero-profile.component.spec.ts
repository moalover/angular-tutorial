import { async, ComponentFixture, ComponentFixtureAutoDetect, TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { Heroe } from '../classes/heroe';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { CapitalizePipe } from '../capitalize.pipe';

//schemas
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
// providers
import { HeroesService } from '../heroes.service';
// declarations
import { AppComponent } from '../app.component';
import { HeroProfileComponent } from './hero-profile.component';
import { ModalPollComponent } from '../modal-poll/modal-poll.component';


describe('HeroProfileComponent', () => {
  let component: HeroProfileComponent;
  let fixture: ComponentFixture<HeroProfileComponent>;
  let heroesService: HeroesService;
  const HEROE_OBJECT =[{
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
    teamColor:'yellow'
  }];
  
  
  class HeroServiceMock {
    public teams = new Map().set("1","yellow");

    public getHeroe(){
      return Observable.of({data:{results:HEROE_OBJECT}}).delay(1000);
    }

    public getTeamColor(){
      return "yellow";
    }
  }

  class LocationMock {
    back():void {}
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
        HeroProfileComponent,
        CapitalizePipe
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: HeroesService, useClass: HeroServiceMock },
        { provide: Location, useClass: LocationMock},
      ]
    })
      .compileComponents();
  }));
      
  beforeEach(() => {
    fixture = TestBed.createComponent(HeroProfileComponent);
    component = fixture.componentInstance;
    heroesService = TestBed.get(HeroesService);
    console.log("heroesService");
    console.log(heroesService);
    component.id = '3';
    component.heroe ={
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
      teamColor:'green'};
      fixture.detectChanges();
  });

  it('Debería crear el heroe', () => {
    //Arrange
    const spy = spyOn(heroesService, 'getHeroe').and.callThrough();
    /*const spy = spyOn(heroesService, 'getHeroe').and.callFake(() => {
      Observable.of({data:{results:HEROE_OBJECT}}).subscribe((data) => {
        const temp = data.data.results[0];
        component.heroe = new Heroe(temp.id, temp.name, temp.description, temp. modified, temp.thumbnail, temp.resourceURI,heroesService.getTeamColor(temp.id));
        component.team = component.heroe.teamColor;
      });
    });*/
    
    //Act
    component.ngOnInit();
    //Assert
    expect(heroesService.getHeroe).toHaveBeenCalled();
  });  

  it('Componente debería estar Creada', () => {
    expect(component).toBeDefined();
  });

  it('Se debe llamar a la función go back', inject([Location], (loc: Location) => {
    const spy = spyOn(loc, 'back');
    component.goBack();
    expect(spy).toHaveBeenCalled();
  }));

  it('should recognize a modal', async(() => {
    fixture.detectChanges();
    const modalchild: ModalPollComponent = fixture.componentInstance.modal;
    expect(modalchild).toBeDefined();
    const qm = "¿Dónde ubicarías a tu súper héroe?";
    component.question_modal = qm;
    component.launchModal();
    expect(component).toBeDefined();
  }));

  it('deberia llamar a getTeam', inject([HeroesService], (heroesService: HeroesService) => {
    const t = "verde";
    const id = 1231;
    component.team = t;
    heroesService.teams.set(id,t);
    component.getTeam(id);
    expect(heroesService.teams.size).toEqual(2);
  }));
  
});
