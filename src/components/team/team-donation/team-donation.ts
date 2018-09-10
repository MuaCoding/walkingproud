import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Paging } from './../../../models/webapi';
import { Pagination } from './../../../models/pagination';

import 'rxjs/add/operator/finally';

@Component({
  selector: 'team-donation',
  templateUrl: 'team-donation.html'
})
export class TeamDonationComponent {

  @Input() id: any;

  @Output() change = new EventEmitter();

  result = new Pagination();

  constructor(public http: HttpClient) {
  }

  ngOnInit() {
    this.getDontaion();
  }

  getDontaion(loadMore?) {
    const params = new HttpParams().set("page", this.result.current.toString());
    const donation$ = this.http.get<Paging>(`/team/${this.id}/donation`, { params });

    donation$.finally(
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
      this.getDontaion(loadMore);
    }
  }

}
