import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingEditSpotsComponent } from './parking-edit-spots.component';

describe('ParkingEditSpotsComponent', () => {
  let component: ParkingEditSpotsComponent;
  let fixture: ComponentFixture<ParkingEditSpotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingEditSpotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingEditSpotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
