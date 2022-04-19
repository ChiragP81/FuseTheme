import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TxclusivelistComponent } from './txclusivelist.component';

describe('TxclusivelistComponent', () => {
  let component: TxclusivelistComponent;
  let fixture: ComponentFixture<TxclusivelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TxclusivelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TxclusivelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
