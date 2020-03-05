import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-parking-status-header',
  templateUrl: './parking-status-header.component.html',
  styleUrls: ['./parking-status-header.component.scss']
})
export class ParkingStatusHeaderComponent implements OnInit {
  @Input() public parking;

  constructor() { }

  ngOnInit(): void {
  }

}
