import { Component, OnInit, ViewChild } from '@angular/core';
import { Heroe } from '../classes/heroe';
import { HeroesService } from '../heroes.service';
import { Router } from '@angular/router';
import { CapitalizePipe } from '../capitalize.pipe';

@Component({
  selector: 'app-listado-de-heroes',
  templateUrl: './listado-de-heroes.component.html',
  styleUrls: ['./listado-de-heroes.component.css']
})
export class ListadoDeHeroesComponent implements OnInit {

  public title = 'Tutorial de Angular - Héroes de Marvel';
  public searchString;
  public focus_this = false
  
  // The child component : spinner
  @ViewChild('spi') spinner;
  /* public heroes: Array<Heroe> = []; */

  constructor(private heroesService: HeroesService, private router:Router) { }

  submitSearch() {
    this.heroesService.resetPager();
    this.heroesService.getHeroes(this.searchString);
  }

  prevPage() {
    this.heroesService.getHeroes(this.searchString, this.heroesService.page - 1);
  }

  nextPage() {
    this.heroesService.getHeroes(this.searchString, this.heroesService.page + 1);
  }

  go_to(id){
    this.router.navigateByUrl('/heroe/'+id);
  }

  ngOnInit() {
    /* this.heroes.push(new Heroe(
      '1',
      'chiquitoman',
      'un man que es chiquito chiquito',
      new Date(),
      {
        'path': 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
        'extension': 'jpg'},
      'http://gateway.marvel.com/v1/public/characters/1011334'
    ));

    this.heroes.push(new Heroe(
      '1',
      'chiquitoman 2',
      'un man que es chiquito chiquito',
      new Date(),
      {
        'path': 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
        'extension': 'jpg'},
      'http://gateway.marvel.com/v1/public/characters/1011334'
    ));

    this.heroes.push(new Heroe(
      '1',
      'chiquitoman 3',
      'un man que es chiquito chiquito',
      new Date(),
      {
        'path': 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
        'extension': 'jpg'},
      'http://gateway.marvel.com/v1/public/characters/1011334'
    ));

     */
    //this.spinner.toggle_spinner();

    this.heroesService.getHeroes();

    

  }

}
