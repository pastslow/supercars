import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { ViewMode } from '@app/feature/parking/enums/view-mode.enum';
import { ParkingArea } from '@app/feature/parking/interfaces/parking-area.interface';
import { SlotModel } from '@app/feature/parking/interfaces/slot-model.interface';

@Directive({
  selector: '[appPreviewSlotPlacement]',
})
export class PreviewSlotPlacementDirective {
  @Input() private rowNumber: number;
  @Input() private colNumber: number;
  @Input() private parkingViewMode: number;
  @Input() private selectedSlotModel: SlotModel;
  @Input() private selectedParkingArea: ParkingArea;

  constructor(private el: ElementRef) {}

  @HostListener('mouseover')
  onMouseOver() {
    if (!this.isEditingSpotAvailable()) {
      return;
    }

    if (this.isEraserModeActive()) {
      return;
    }

    this.el.nativeElement.classList.add(
      'vertical-line',
      this.selectedSlotModel.className
    );

    this.el.nativeElement.children[0].classList.add(
      this.selectedSlotModel.borderClass
    );
  }

  @HostListener('click') onMouseClick() {
    if (!this.isEditingSpotAvailable()) {
      return;
    }

    if (this.isEraserModeActive()) {
      this.removeSpot();
      return;
    }

    const selectedSpotIndicatorNumber =
      this.selectedParkingArea.spots.length === 0
        ? 1
        : this.selectedParkingArea.spots.length + 1;

    const newSpot = {
      active: 0,
      border: this.selectedSlotModel.borderClass,
      id: null,
      indicator: selectedSpotIndicatorNumber,
      orientation: this.selectedSlotModel.className,
      parkingAreaId: this.selectedParkingArea.id,
      parkingId: this.selectedParkingArea.parkingId,
      x: this.colNumber,
      y: this.rowNumber,
    };

    this.el.nativeElement.classList.add('placed');

    this.selectedParkingArea.spots.push(newSpot);
  }

  @HostListener('mouseout')
  onMouseOut() {
    if (!this.isEditingSpotAvailable()) {
      return;
    }

    if (this.isEraserModeActive()) {
      return;
    }

    this.el.nativeElement.classList.remove(
      'vertical-line',
      this.selectedSlotModel.className
    );

    this.el.nativeElement.children[0].classList.remove(
      this.selectedSlotModel.borderClass
    );
  }

  private isEraserModeActive(): boolean {
    return this.selectedSlotModel.title === 'Eraser' ? true : false;
  }

  private isEditingSpotAvailable(): boolean {
    if (!this.selectedSlotModel) {
      return false;
    }

    if (this.parkingViewMode !== ViewMode.edit) {
      return false;
    }

    if (
      this.el.nativeElement.classList.contains('placed') &&
      !this.isEraserModeActive()
    ) {
      return false;
    }

    return true;
  }

  private removeSpot(): void {
    const selectedSpot = this.selectedParkingArea.spots.find(
      (spot) => spot.x === this.colNumber && spot.y === this.rowNumber
    );

    if (!selectedSpot) {
      return;
    }

    const indexOfSelectedSpot = this.selectedParkingArea.spots.indexOf(
      selectedSpot
    );

    this.selectedParkingArea.spots.splice(indexOfSelectedSpot, 1);
    this.removeTerrainCssClasses();
    this.removeSpotCssClasses();
  }

  private removeTerrainCssClasses(): void {
    const defaultTerrainColumnClasses = ['terrain-col', 'edit-cell-enabled'];

    this.el.nativeElement.classList.forEach((className) => {
      const isDefaultClass = defaultTerrainColumnClasses.find(
        (cssClassName) => cssClassName === className
      );

      if (isDefaultClass) {
        return;
      }

      this.el.nativeElement.classList.remove(className);
    });
  }

  private removeSpotCssClasses(): void {
    const defaultCellClasses = ['cell'];
    const cellIndex = 0;

    this.el.nativeElement.children[cellIndex].classList.forEach((className) => {
      const isDefaultClass = defaultCellClasses.find(
        (cssClassName) => cssClassName === className
      );

      if (isDefaultClass) {
        return;
      }

      this.el.nativeElement.children[cellIndex].classList.remove(className);
    });
  }
}
