import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingItemsComponent } from './parking-items.component';

describe('ParkingItemsComponent', () => {
  let component: ParkingItemsComponent;
  let fixture: ComponentFixture<ParkingItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
