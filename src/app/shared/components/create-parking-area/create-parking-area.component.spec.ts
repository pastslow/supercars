import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateParkingAreaComponent } from './create-parking-area.component';

describe('CreateParkingAreaComponent', () => {
  let component: CreateParkingAreaComponent;
  let fixture: ComponentFixture<CreateParkingAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateParkingAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateParkingAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
