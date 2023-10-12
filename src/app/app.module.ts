import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customers/customer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomerOneComponent } from './customers/customer-one.component';

@NgModule({
  declarations: [AppComponent, CustomerComponent, CustomerOneComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
