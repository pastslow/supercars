import { Directive, ElementRef, HostListener, Input } from '@angular/core';

import { ViewMode } from '@app/feature/parking/enums/view-mode.enum';
import { SlotModel } from '@app/feature/parking/interfaces/slot-model.interface';
import { Spot } from '@app/feature/parking/interfaces/spot.interface';
import { ParkingArea } from '@app/feature/parking/interfaces/parking-area.interface';

import { ParkingFacadeService } from '@app/feature/parking/services/parking-facade-service.service';

@Directive({
  selector: '[appPreviewSlotPlacement]',
})
export class PreviewSlotPlacementDirective {
  @Input() private rowNumber: number;
  @Input() private colNumber: number;
  @Input() private parkingViewMode: number;
  @Input() private selectedSlotModel: SlotModel;
  @Input() private selectedParkingArea: ParkingArea;

  constructor(
    private el: ElementRef,
    private parkingFacadeService: ParkingFacadeService
  ) {}

  @HostListener('mouseover')
  onMouseOver(): void {
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

  @HostListener('click') onMouseClick(): void {
    if (!this.isEditingSpotAvailable()) {
      return;
    }

    if (this.isEraserModeActive()) {
      this.removeSpot();
      return;
    }

    let selectedSpotIndicatorNumber = 0;

    if (this.selectedParkingArea.spots.length === 0) {
      selectedSpotIndicatorNumber = 1;
    } else {
      selectedSpotIndicatorNumber = this.getIndicatorNumber();
    }

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
    const temporaryPlacedSpots = this.parkingFacadeService.getTemporaryAreaSpotsStateValue();
    temporaryPlacedSpots.push(newSpot);

    this.parkingFacadeService.updateTemporaryAreaSpotsState(
      temporaryPlacedSpots
    );
  }

  @HostListener('mouseout')
  onMouseOut(): void {
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
    this.el.nativeElement.setAttribute(
      'class',
      'terrain-col edit-cell-enabled'
    );
  }

  private removeSpotCssClasses(): void {
    const cellIndex = 0;

    this.el.nativeElement.children[cellIndex].setAttribute('class', 'cell');
  }

  private getIndicatorNumber(): number {
    const nextIndicatorNumber = this.selectedParkingArea.spots.length + 1;

    const placedIndicators = [];

    this.selectedParkingArea.spots.forEach((spot: Spot) => {
      placedIndicators.push(spot.indicator);
    });

    const [min, max] = [
      Math.min(...placedIndicators),
      Math.max(...placedIndicators),
    ];

    if (min || max) {
      const firestDeletedIndicatorIndex = 0;
      const deletedIndicators = Array.from(
        Array(max - min),
        (v, i) => i + min
      ).filter((i) => !placedIndicators.includes(i));

      if (deletedIndicators.length === 0) {
        return nextIndicatorNumber;
      } else {
        return deletedIndicators[firestDeletedIndicatorIndex];
      }
    } else {
      return nextIndicatorNumber;
    }
  }
}
