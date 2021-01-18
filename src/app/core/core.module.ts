import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionService } from '@app/core/services/session.service';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [SessionService],
})
export class CoreModule {}
