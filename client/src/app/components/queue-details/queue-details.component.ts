import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QueueService } from 'src/app/services/queue.service';

@Component({
  selector: 'app-queue-details',
  templateUrl: './queue-details.component.html',
  styleUrls: ['./queue-details.component.css']
})
export class QueueDetailsComponent implements OnInit {
  currentQueue = null;
  message = '';

  constructor(
    private queueService: QueueService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getQueue(this.route.snapshot.paramMap.get('id'));
  }

  getQueue(id): void {
    this.queueService.get(id)
      .subscribe(
        data => {
          this.currentQueue = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateServed(status): void {
    const data = {
      queueNumber: this.currentQueue.queueNumber,
      name: this.currentQueue.name,
      idNo: this.currentQueue.idNo,
      year: this.currentQueue.year,
      course: this.currentQueue.course,
      college: this.currentQueue.college,
      mobileNo: this.currentQueue.mobileNo,
      email: this.currentQueue.email,
      service: this.currentQueue.service,
      served: status
    };

    this.queueService.update(this.currentQueue.id, data)
      .subscribe(
        response => {
          this.currentQueue.served = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateQueue(): void {
    this.queueService.update(this.currentQueue.id, this.currentQueue)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The queue number was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteQueue(): void {
    this.queueService.delete(this.currentQueue.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/queueing']);
        },
        error => {
          console.log(error);
        });
  }
}
