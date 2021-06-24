import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddQueueComponent } from './components/add-queue/add-queue.component';
import { QueueDetailsComponent } from './components/queue-details/queue-details.component';
import { ViewQueueComponent } from './components/view-queue/view-queue.component';
import { WaitingQueueComponent } from './components/waiting-queue/waiting-queue.component';

@NgModule({
  declarations: [
    AppComponent,
    AddQueueComponent,
    QueueDetailsComponent,
    ViewQueueComponent,
    WaitingQueueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
