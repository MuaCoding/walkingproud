import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'registration-state',
  defaultHistory: ['activity-index']
})
@Component({
  selector: 'page-registration-state',
  templateUrl: 'registration-state.html',
})
export class RegistrationStatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  gotoTeamList() {
    this.navCtrl.setPages([{ page: "activity-index" }, { page: "team-list" }]);
  }

}
