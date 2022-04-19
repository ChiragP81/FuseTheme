import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertlistComponent } from './advertlist.component';

describe('AdvertlistComponent', () => {
  let component: AdvertlistComponent;
  let fixture: ComponentFixture<AdvertlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
