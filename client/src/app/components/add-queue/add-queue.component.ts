import { Component, OnInit } from '@angular/core';
import { QueueService } from 'src/app/services/queue.service';

@Component({
  selector: 'app-add-queue',
  templateUrl: './add-queue.component.html',
  styleUrls: ['./add-queue.component.css']
})
export class AddQueueComponent implements OnInit {
  queue = {
    queueNumber: '',
    name: '',
    idNo: '',
    year: '',
    course: '',
    college: '',
    mobileNo: '',
    email: '',
    service: '',
    queuedAt: '',
    served: false
  };
  submitted = false;

  constructor(private queueService: QueueService) { }

  ngOnInit(): void {
  }

  saveQueue(): void {
    const data = {
      queueNumber: this.queue.queueNumber,
      name: this.queue.name,
      idNo: this.queue.idNo,
      year: this.queue.year,
      course: this.queue.course,
      college: this.queue.college,
      mobileNo: this.queue.mobileNo,
      email: this.queue.email,
      service: this.queue.service,
      queuedAt: this.queue.queuedAt
    };

    this.queueService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newQueue(): void {
    this.submitted = false;
    this.queue = {
      queueNumber: '',
      name: '',
      idNo: '',
      year: '',
      course: '',
      college: '',
      mobileNo: '',
      email: '',
      service: '',
      queuedAt: '',
      
      served: false
    };
  }

}
