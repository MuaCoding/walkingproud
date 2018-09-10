import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';

import { List } from '../../../models/webapi';

import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'activity-project-list',
  segment: 'activity-project',
  defaultHistory: ['activity-index']
})
@Component({
  selector: 'page-activity-project-list',
  templateUrl: 'activity-project-list.html',
})
export class ActivityProjectListPage {

  project: any[];
  completed = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewDidLoad() {
    this.getProject();
  }

  getProject() {
    const id = (this.navCtrl as Nav).rootParams["id"];
    const project$ = this.http.get<List>(`/activity/${id}/project`);

    project$.finally(
      () => {
        this.completed = true;
      }
    ).subscribe(
      (result) => {
        this.project = result.data;
      },
      (error) => { }
    );
  }

}
