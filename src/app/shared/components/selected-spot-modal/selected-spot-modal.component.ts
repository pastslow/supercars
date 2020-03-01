import { Component, OnInit, Input } from '@angular/core';

import { Spot } from '../../interfaces/spot.interface';

@Component({
  selector: 'app-selected-spot-modal',
  templateUrl: './selected-spot-modal.component.html',
  styleUrls: ['./selected-spot-modal.component.scss']
})
export class SelectedSpotModalComponent implements OnInit {
  @Input() public selectedSpot: Spot;

  constructor() { }

  ngOnInit(): void {
  }

}
