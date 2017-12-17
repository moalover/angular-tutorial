import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})

export class SpinnerComponent implements OnInit {
  show_spinner: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggle_spinner(): void {
    this.show_spinner = !this.show_spinner;
  }
}