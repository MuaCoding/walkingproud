import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Result } from '../../../models/webapi';

import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'project-item',
  segment: 'project/:id'
})
@Component({
  selector: 'page-project-item',
  templateUrl: 'project-item.html',
})
export class ProjectItemPage {

  id = this.navParams.get("id");

  project: any;
  completed = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewDidLoad() {
    this.getProject();
  }

  getProject() {
    const project$ = this.http.get<Result>(`/project/${this.id}`);

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
