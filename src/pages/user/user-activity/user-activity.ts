import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal } from 'ionic-angular';

import { UtilityProvider } from '../../../providers/utility/utility';

@IonicPage({
  name: 'user-activity',
  defaultHistory: ['usercenter']
})
@Component({
  selector: 'page-user-activity',
  templateUrl: 'user-activity.html',
})
export class UserActivityPage {

  index = 0;

  countInfo: Modal;

  constructor(public navCtrl: NavController, public navParams: NavParams, public utility: UtilityProvider) {
  }

  ionViewWillLeave() {
    this.utility.dismissModal(this.countInfo);
  }

  countInfoModal() {
    this.utility.dismissModal(this.countInfo);
    this.countInfo = this.utility.openModal("modal-count-info", {}, { cssClass: 'small-modal' });
  }

}
