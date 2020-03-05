import { Component, OnInit } from '@angular/core';
import { ParkingLogicService } from '@app/shared/services/parking-logic.service';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss']
})
export class ParkingComponent implements OnInit {
  public displayParkingZone: boolean;
  public adminParkings;
  public userId = 1;
  public selectedParking;
  constructor(private parkingService: ParkingLogicService) { }

  ngOnInit(): void {
    this.parkingService.getAdminParkings(1).subscribe(response => {
      if(response) {
        this.adminParkings = response;
      }
    })
  }

  public getSelectedParking(parking) {
    console.log(parking)
    this.selectedParking = parking;
    this.displayParkingZone = true;
  }

}
