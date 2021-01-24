import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralConfirmModalComponent } from '@app/shared/components/general-confirm-modal/general-confirm-modal.component';

@NgModule({
  declarations: [GeneralConfirmModalComponent],
  exports: [GeneralConfirmModalComponent],
  imports: [CommonModule],
})
export class SharedModule {}
