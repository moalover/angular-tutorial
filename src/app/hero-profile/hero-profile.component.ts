import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Heroe } from '../classes/heroe';
import { HeroesService } from '../heroes.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-profile',
  templateUrl: './hero-profile.component.html',
  styleUrls: ['./hero-profile.component.css']
})
export class HeroProfileComponent implements OnInit {
  private id;
  public heroe: Heroe;

  constructor(private route: ActivatedRoute, private heroesService: HeroesService, private _location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.heroesService.getHeroe(this.id).subscribe(data => {
        const temp = data.data.results[0];
        this.heroe = new Heroe(temp.id, temp.name, temp.description, temp. modified, temp.thumbnail, temp.resourceURI);
      });
    });
  }

  goBack() {
    this._location.back();
  }

}
