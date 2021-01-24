import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionService } from '@app/core/services/session.service';
import { SpinnerModalComponent } from '@app/core/components/spinner-modal/spinner-modal.component';
import { SpinnerService } from '@app/core/services/spinner-service';

@NgModule({
  declarations: [SpinnerModalComponent],
  exports: [SpinnerModalComponent],
  imports: [CommonModule],
  providers: [SessionService, SpinnerService],
})
export class CoreModule {}
