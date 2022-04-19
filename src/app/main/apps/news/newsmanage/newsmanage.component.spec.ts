import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsmanageComponent } from './newsmanage.component';

describe('NewsmanageComponent', () => {
  let component: NewsmanageComponent;
  let fixture: ComponentFixture<NewsmanageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsmanageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsmanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
