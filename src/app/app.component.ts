import { Component, OnInit } from '@angular/core';

import { SpinnerService } from '@app/shared/services/spinner-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'nodeJsProject';
  public isSpinnerDisplayed: boolean;

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.spinnerService.isSpinnerDisplayed.subscribe((res) => {
      debugger
      this.isSpinnerDisplayed = res;
    })
  }
}

