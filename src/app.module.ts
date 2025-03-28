import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { TaskComponent } from './task.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, TaskComponent],
  imports: [BrowserModule, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }