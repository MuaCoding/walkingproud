import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Result } from '../../../models/webapi';

import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'contact-us',
  defaultHistory: ['usercenter']
})
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage {

  contactUs: any;
  completed = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewDidLoad() {
    this.getContactUs();
  }

  getContactUs() {
    const contactUs$ = this.http.get<Result>("/article/contact");

    contactUs$.finally(
      () => {
        this.completed = true;
      }
    ).subscribe(
      (result) => {
        this.contactUs = result.data;
      },
      (error) => { }
    );
  }

}
