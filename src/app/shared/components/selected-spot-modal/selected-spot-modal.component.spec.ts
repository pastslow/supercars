import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedSpotModalComponent } from './selected-spot-modal.component';

describe('SelectedSpotModalComponent', () => {
  let component: SelectedSpotModalComponent;
  let fixture: ComponentFixture<SelectedSpotModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedSpotModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedSpotModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
