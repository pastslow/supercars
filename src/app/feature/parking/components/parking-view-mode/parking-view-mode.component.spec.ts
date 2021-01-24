import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingViewModeComponent } from './parking-view-mode.component';

describe('ParkingViewModeComponent', () => {
  let component: ParkingViewModeComponent;
  let fixture: ComponentFixture<ParkingViewModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingViewModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingViewModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
