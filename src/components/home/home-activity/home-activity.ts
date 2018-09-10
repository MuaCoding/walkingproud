import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { List } from '../../../models/webapi';

import 'rxjs/add/operator/finally';

@Component({
  selector: 'home-activity',
  templateUrl: 'home-activity.html'
})
export class HomeActivityComponent {

  activity: any[];
  completed = false;

  constructor(public http: HttpClient) {
  }

  ngOnInit() {
    this.getActivity();
  }

  getActivity() {
    const activity$ = this.http.get<List>("/activity/column");

    activity$.finally(
      () => {
        this.completed = true;
      }
    ).subscribe(
      (result) => {
        this.activity = result.data;
      },
      (error) => { }
    );
  }

}
