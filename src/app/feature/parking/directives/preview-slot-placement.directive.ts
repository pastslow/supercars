import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { ViewMode } from '@app/feature/parking/enums/view-mode.enum';
import { SlotModel } from '@app/feature/parking/interfaces/slot-model.interface';

@Directive({
  selector: '[appPreviewSlotPlacement]',
})
export class PreviewSlotPlacementDirective {
  @Input() private rowNumber: number;
  @Input() private colNumber: number;
  @Input() private parkingViewMode: number;
  @Input() private selectedSlotModel: SlotModel;

  constructor(private el: ElementRef) {}

  @HostListener('mouseover')
  onMouseOver() {
    if (!this.selectedSlotModel) {
      return;
    }

    if (this.parkingViewMode !== ViewMode.edit) {
      return;
    }

    if (this.el.nativeElement.classList.contains('placed')) {
      return;
    }

    this.selectedSlotModel.classNames.forEach((className: string) => {
      this.el.nativeElement.classList.add(className);
    });

    this.el.nativeElement.children[0].classList.add(
      this.selectedSlotModel.borderClass
    );
  }

  @HostListener('mouseout')
  onMouseOut() {
    if (!this.selectedSlotModel) {
      return;
    }

    if (this.parkingViewMode !== ViewMode.edit) {
      return;
    }

    if (this.el.nativeElement.classList.contains('placed')) {
      return;
    }

    this.selectedSlotModel.classNames.forEach((className: string) => {
      this.el.nativeElement.classList.remove(className);
    });

    this.el.nativeElement.children[0].classList.remove(
      this.selectedSlotModel.borderClass
    );
  }
}
