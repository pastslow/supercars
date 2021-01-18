import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from '@app/app.component';
import { HeaderComponent } from '@app/feature/header/header.component';

import { AppRoutingModule } from '@app/app-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { SpinnerService } from './shared/services/spinner-service';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CoreModule,
  ],
  providers: [SpinnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
