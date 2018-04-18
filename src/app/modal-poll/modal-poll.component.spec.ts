import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPollComponent } from './modal-poll.component';

describe('ModalPollComponent', () => {
  let component: ModalPollComponent;
  let fixture: ComponentFixture<ModalPollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.show_modal= false;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test send_team with "green" choice', () => {
    const color = "verde";
    component.setTeam.subscribe(col => expect(col).toEqual("verde"));
    component.send_team(color);
    expect(component.show_modal).toBe(true);
  });
  
});
