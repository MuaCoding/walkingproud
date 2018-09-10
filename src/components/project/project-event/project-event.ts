import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Paging } from './../../../models/webapi';
import { Pagination } from './../../../models/pagination';

import 'rxjs/add/operator/finally';

@Component({
  selector: 'project-event',
  templateUrl: 'project-event.html'
})
export class ProjectEventComponent {

  @Input() id: any;

  @Output() change = new EventEmitter();

  result = new Pagination();

  constructor(public http: HttpClient) {
  }

  ngOnInit() {
    this.getEvent();
  }

  getEvent(loadMore?) {
    const params = new HttpParams().set("project", this.id).set("page", this.result.current.toString());
    const event$ = this.http.get<Paging>("/project/brief", { params });

    event$.finally(
      () => {
        this.result.completed = true;
        this.change.emit();

        setTimeout(() => {
          loadMore && loadMore.complete();
        }, 20);
      }
    ).subscribe(
      (result) => {
        this.result.loading(result);
      },
      (error) => {
        this.result.reset(true);
      }
    );
  }

  doLoadMore(loadMore) {
    if (this.result.more) {
      this.getEvent(loadMore);
    }
  }
}
