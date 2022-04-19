import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrivialistComponent } from './trivialist.component';

describe('TrivialistComponent', () => {
  let component: TrivialistComponent;
  let fixture: ComponentFixture<TrivialistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrivialistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrivialistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
