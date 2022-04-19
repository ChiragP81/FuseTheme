import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteroleComponent } from './instituterole.component';

describe('InstituteroleComponent', () => {
  let component: InstituteroleComponent;
  let fixture: ComponentFixture<InstituteroleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstituteroleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
