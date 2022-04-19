import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutelistComponent } from './institutelist.component';

describe('InstitutelistComponent', () => {
  let component: InstitutelistComponent;
  let fixture: ComponentFixture<InstitutelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
