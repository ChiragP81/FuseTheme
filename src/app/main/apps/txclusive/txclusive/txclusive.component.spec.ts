import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TxclusiveComponent } from './txclusive.component';

describe('TxclusiveComponent', () => {
  let component: TxclusiveComponent;
  let fixture: ComponentFixture<TxclusiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TxclusiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TxclusiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
