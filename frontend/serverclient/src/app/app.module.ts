import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CommonModule } from "@angular/common";
import { provideHttpClient, withFetch } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
  ],
  providers: [
    provideHttpClient(withFetch()),
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }