import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { List } from '../../../models/webapi';

import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'team-charge',
  segment: 'team/:id/charge',
  defaultHistory: ['activity-index']
})
@Component({
  selector: 'page-team-charge',
  templateUrl: 'team-charge.html',
})
export class TeamChargePage {

  id = this.navParams.get("id");

  total: number;

  member: any[];
  completed = false;

  mock: List = {
    code: 0,
    msg: "",
    data: [{
      id: 1,
      identity: 2,
      name: "ETXIN",
      sex: 1,
      picture: null,
      money: 2000.32,
      fee: 50
    },
    {
      id: 2,
      identity: 1,
      name: "XXH",
      sex: 1,
      picture: null,
      money: 2009,
      fee: 50
    },
    {
      id: 3,
      identity: 1,
      name: "GLuo",
      sex: 1,
      picture: null,
      money: 1100,
      fee: 50
    }]
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewDidLoad() {
    this.getMember();
  }

  getMember() {
    const params = new HttpParams().set("id", this.id);
    const member$ = this.http.get<List>(JSON.stringify(this.mock), { params });

    member$.finally(
      () => {
        this.completed = true;
      }
    ).subscribe(
      (result) => {
        this.member = result.data;
        this.total = this.member.map((value) => value.fee).reduce((prev, current) => prev + current);
      },
      (error) => { }
    );
  }

  pay() {

  }

}
