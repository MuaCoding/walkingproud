import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'team-audit',
  segment: 'team/:id/audit',
  defaultHistory: ['activity-index']
})
@Component({
  selector: 'page-team-audit',
  templateUrl: 'team-audit.html',
})
export class TeamAuditPage {

  index = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
