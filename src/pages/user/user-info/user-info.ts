import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Result } from '../../../models/webapi';
import { UtilityProvider } from './../../../providers/utility/utility';

import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'user-info',
  defaultHistory: ['usercenter']
})
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfoPage {

  @ViewChild('form')
  set _form(element: ElementRef) {
    setTimeout(() => {
      this.form = element;
    });
  }
  form: ElementRef;

  info: any;
  completed = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public utility: UtilityProvider) {
  }

  ionViewDidLoad() {
    this.getInfo();
  }

  getInfo() {
    const info$ = this.http.get<Result>("/user/info");

    info$.finally(
      () => {
        this.completed = true;
      }
    ).subscribe(
      (result) => {
        this.info = result.data;
      },
      (error) => {
        this.info = {};
      }
    );
  }

  process(form: FormGroup) {
    const loading$ = this.utility.loading();
    const registration$ = this.http.put<Result>("/user/info/edit", form.value);

    registration$.finally(
      () => {
        loading$.dismiss();
      }
    ).subscribe(
      (result) => {
        this.utility.alert("保存成功", "报名参赛时将会自动填充", { icon: "ion-ios-wp-success" });
      },
      (error) => { }
    );
  }

}
