import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../heroes.service';
//import { CapitalizePipe } from '../capitalize.pipe';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})

export class SpinnerComponent implements OnInit {
  constructor(private heroesService: HeroesService,) { }

  ngOnInit() {
    
  }
}