import { Component, OnInit } from '@angular/core';
import { QueueService } from 'src/app/services/queue.service';

@Component({
  selector: 'app-waiting-queue',
  templateUrl: './waiting-queue.component.html',
  styleUrls: ['./waiting-queue.component.css']
})
export class WaitingQueueComponent implements OnInit {

  queueing: any;
  currentQueue = null;
  currentIndex = -1;
  queueNumber = '';
  served = '';

  page = 1;
  count = 0;
  pageSize = 1;
  pageSizes = [1, 2, 3];

  constructor(private queueService: QueueService) { }

  ngOnInit(): void {
    this.retrieveQueueing();
  }

  getRequestParams(searchQueueNumber, page, pageSize): any {
    
    let params = {};

    if (searchQueueNumber) {
      params[`queueNumber`] = searchQueueNumber;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveQueueing(): void {
    const params = this.getRequestParams(this.queueNumber, this.page, this.pageSize);

    this.queueService.getAll(params)
      .subscribe(
        response => {
          const { queueing, totalItems } = response;
          this.queueing = queueing;
          this.count = totalItems;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  handlePageChange(event): void {
    this.page = event;
    this.retrieveQueueing();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveQueueing();
  }

  setActiveQueue(queue, index): void {
    this.currentQueue = queue;
    this.currentIndex = index;
  }

}
