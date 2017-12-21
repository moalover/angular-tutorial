import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-modal-poll',
  templateUrl: './modal-poll.component.html',
  styleUrls: ['./modal-poll.component.css']
})
export class ModalPollComponent implements OnInit {
  public show_modal: boolean = false;
  @Input() public title_modal : string;
  @Input() public team_selected : string;
  @Output() setTeam:EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  
  send_team(team: string): void {
    console.log("Im in child: ");
    console.log(team);
    this.setTeam.emit(team);
    this.toggle_modal();
  }
  
  toggle_modal(): void {
    this.show_modal = !this.show_modal;
  }

}
