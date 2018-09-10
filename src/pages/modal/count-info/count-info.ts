import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Result } from '../../../models/webapi';

import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'modal-count-info'
})
@Component({
  selector: 'page-count-info',
  templateUrl: 'count-info.html',
})
export class CountInfoPage {

  countInfo: any;
  completed = false;

  mock: Result = {
    code: 0,
    msg: "",
    data: {
      count: 5,
      money: 95462,
      mileage: 63.3,
      step: 608000,
    }
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public http: HttpClient) {
  }

  ngOnInit() {
    this.getCountInfo();
  }

  getCountInfo() {
    const countInfo$ = this.http.get<Result>(JSON.stringify(this.mock));

    countInfo$.finally(
      () => {
        this.completed = true;
      }
    ).subscribe(
      (result) => {
        this.countInfo = result.data;
      },
      (error) => { }
    );
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
