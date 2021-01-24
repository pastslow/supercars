import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-general-confirm-modal',
  templateUrl: './general-confirm-modal.component.html',
  styleUrls: ['./general-confirm-modal.component.scss'],
})
export class GeneralConfirmModalComponent implements OnInit {
  @Input() public title: string;
  @Output()
  public emitConfimChanged: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  public ngOnInit(): void {}

  public emitAnswer() {
    this.emitConfimChanged.next(true);
  }
}
