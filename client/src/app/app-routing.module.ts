import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewQueueComponent } from './components/view-queue/view-queue.component';
import { QueueDetailsComponent } from './components/queue-details/queue-details.component';
import { AddQueueComponent } from './components/add-queue/add-queue.component';
import { WaitingQueueComponent } from './components/waiting-queue/waiting-queue.component';

const routes: Routes = [
  { path: '', redirectTo: 'queueing', pathMatch: 'full' },
  { path: 'queueing', component: ViewQueueComponent },
  { path: 'queueing/:id', component: QueueDetailsComponent },
  { path: 'add', component: AddQueueComponent },
  { path: 'waiting', component: WaitingQueueComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
