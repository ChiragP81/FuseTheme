import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituterequestComponent } from './instituterequest.component';

describe('InstituterequestComponent', () => {
  let component: InstituterequestComponent;
  let fixture: ComponentFixture<InstituterequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstituterequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituterequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
