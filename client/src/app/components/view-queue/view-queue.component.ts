import { Component, OnInit } from '@angular/core';
import { QueueService } from 'src/app/services/queue.service';

@Component({
  selector: 'app-view-queue',
  templateUrl: './view-queue.component.html',
  styleUrls: ['./view-queue.component.css']
})
export class ViewQueueComponent implements OnInit {

  queueing: any;
  currentQueue = null;
  currentIndex = -1;
  queueNumber = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

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

  removeAllQueueing(): void {
    this.queueService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveQueueing();
        },
        error => {
          console.log(error);
        });
  }
}