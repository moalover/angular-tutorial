import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroesService } from './heroes.service';
import { HttpModule, Http, ResponseOptions, XHRBackend, ConnectionBackend, RequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('HeroesService', () => {
  let service: HeroesService;
  class RouterStub {
    navigateByUrl(url: string) {
        return url;
    }
  }

  class LocationStub {
    back():void {}
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientModule, HttpClientTestingModule],
        providers: [
          HeroesService,
          {provide: XHRBackend, useClass: MockBackend}
        ]
    });
      service = TestBed.get(HeroesService);
      service.heroes = [
        {
          id:'1',
          name:'Spiderman1',
          description: 'El hombre que araña',
          modified:new Date(1518417160),
          thumbnail:
          {
          'path': 'https://i.pinimg.com/originals/c2/93/56/c293563aa553250601d8cb768c044d4b',
          'extension': 'jpg'
          },
          resourceURI:'http://gateway.marvel.com/v1/public/characters/1011334',
          teamColor:'yellow'
        },
        {
          id:'2',
          name:'Spiderman1',
          description: 'El hombre que araña',
          modified:new Date(1518417160),
          thumbnail:
          {
          'path': 'https://i.pinimg.com/originals/c2/93/56/c293563aa553250601d8cb768c044d4b',
          'extension': 'jpg'
          },
          resourceURI:'http://gateway.marvel.com/v1/public/characters/1011334',
          teamColor:'yellow'
        }
      ]
  });

  afterEach(() => { 
      service = null;
  });

  it('Servicio debería estar Creado', () => {
    expect(service).toBeTruthy();
  });

  it('should test getHeroes function', () => {
    spyOn(service, 'getHeroes').and.callThrough();
    service.getHeroes();
    expect(service.getHeroes).toHaveBeenCalled();
    expect(service.heroes).toBeDefined();
});

  it('should test getHeroe function',
    inject([HeroesService, XHRBackend], (hservice, mockBackend) => {
    const mockResponse = {
      results:
          {
            id:'1',
            name:'Spiderman1',
            description: 'El hombre que araña',
            modified:new Date(1518417160),
            thumbnail:
            {
            'path': 'https://i.pinimg.com/originals/c2/93/56/c293563aa553250601d8cb768c044d4b',
            'extension': 'jpg'
            },
            resourceURI:'http://gateway.marvel.com/v1/public/characters/1011334',
            teamColor:'yellow'
          }
    };

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: {data: JSON.stringify(mockResponse)}
      })));
    });
    
    hservice.getHeroe('1').subscribe((heroe) => {
      expect(heroe.data.results.length).toBe(1);
      expect(heroe.data.results[0].name).toEqual('Spiderman1');
    });
  }));

  it('test getTeamColor function', function() {
    spyOn(service, 'getTeamColor').and.callThrough();
    service.teams = new Map().set("1","green");
    service.getTeamColor("1");
    expect(service.getTeamColor).toHaveBeenCalled();
    expect(service.getTeamColor).toBeDefined();
    expect(service.teams.get("1")).toBe("green");
  })
  
  /*it('if discipline is null', function() {
    vm.selectedDisciplineCode = '';
    vm.onDisciplineCodeChange();
    var result = {
      code: null,
      userDefined: false,
      userDefinedDiscipline: null
    };
    expect(vm.selectedDiscipline).toBe(result);
  })
  
  
  it('if discipline is different', function() {
    vm.selectedDisciplineCode = 'nothing';
    vm.onDisciplineCodeChange();
    var result = {
      code: vm.selectedDisciplineCode,
      userDefined: false,
      userDefinedDiscipline: null
    };
    expect(vm.selectedDiscipline).toBe(result);
  })*/
});
