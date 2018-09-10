import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';

import { Result } from '../../../models/webapi';

import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'activity-protocol',
  defaultHistory: ['activity-index']
})
@Component({
  selector: 'page-activity-protocol',
  templateUrl: 'activity-protocol.html',
})
export class ActivityProtocolPage {

  protocol: any;
  completed = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewDidLoad() {
    this.getProtocol();
  }

  getProtocol() {
    const id = (this.navCtrl as Nav).rootParams["id"];
    const protocol$ = this.http.get<Result>(`/activity/${id}/protocol`);

    protocol$.finally(
      () => {
        this.completed = true;
      }
    ).subscribe(
      (result) => {
        this.protocol = result.data;
      },
      (error) => { }
    );
  }

}
