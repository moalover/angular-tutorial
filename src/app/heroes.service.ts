import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heroe } from './classes/heroe';

@Injectable()
export class HeroesService {

  private protocol = 'https:';
  private ApiUrl = '//gateway.marvel.com:443/v1/public/';
  public heroes: Array<Heroe> = [];

  public page = 0;
  public step = 20;
  public total = 0;

  public group_colors = {"azul" : "#1f8ff7",
                        "violeta":"#a43de3",
                        "naranjo":"#df5c0f",
                        "verde":"#0ea521"}
  
  public teams = new Map();

  constructor(private http: HttpClient) { }

  resetPager() {
    this.page = 0;
  }

  getHeroes (nameStartsWith?: string, page?: number) {
    console.log("TEAMS");
    console.log(Array.from(this.teams));
    if (page || page === 0) {
      this.page = page;
    }
    const url = this.protocol + this.ApiUrl + 'characters?apikey=56d2cc44b1c84eb7c6c9673565a9eb4b'
    + '&offset=' + (this.page * this.step)
    + (nameStartsWith ? ('&nameStartsWith=' + nameStartsWith) : '');
    this.http.get<any>(url).subscribe((data) => {
      this.heroes = [];
      this.total = Math.ceil(data.data.total / this.step);
      data.data.results.forEach( result => {
          this.heroes.push(new Heroe(
            result.id,
            result.name,
            result.description,
            result.modified,
            result.thumbnail,
            result.resourceURI,
            this.getTeamColor(result.id)
          ));
        }
      );
    });
  }

  getHeroe(id) {
    const url = this.protocol + this.ApiUrl + 'characters/' + id + '?apikey=56d2cc44b1c84eb7c6c9673565a9eb4b';
    return this.http.get<any>(url);
  }

  getTeamColor(id):string{
    if(this.teams.get(id)!=undefined){
      return this.teams.get(id);
    }
    else{
      return "";
    }
  }

}
