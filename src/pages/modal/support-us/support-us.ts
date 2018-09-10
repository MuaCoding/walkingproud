import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Loading } from 'ionic-angular';

import { AuthenticationProvider } from './../../../providers/authentication/authentication';
import { UtilityProvider } from './../../../providers/utility/utility';

@IonicPage({
  name: 'modal-support-us',
})
@Component({
  selector: 'page-support-us',
  templateUrl: 'support-us.html',
})
export class SupportUsPage {

  loading$: Loading;

  team: any;

  selected: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public auth: AuthenticationProvider, public utility: UtilityProvider) {
    this.team = Object.assign({}, this.navParams.get("team"));
    this.team.money = this.team.money.existing;

    const participant = this.navParams.get("participant");
    const selected = this.team.members.find(item => item.id == participant) || this.team;
    this.selected = selected;
  }

  ngOnDestroy() {
    this.loading$ && this.loading$.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  process(selected) {
    this.loading$ = this.utility.loading();

    const team = this.team;

    const userInfo$ = this.auth.getUserInfo();

    userInfo$.subscribe(
      (info) => {
        const uid = info.id;

        const params = { activity: team.activity.id, project: team.project.id, team: team.id, participant: (selected != team ? selected.id : null) };
        const extra_params = encodeURIComponent(btoa(JSON.stringify(params)));

        let query = `_setting_form_popup=1&extra_params=${extra_params}&outer_uid=${uid}`;
        if (team.participant) {
          const participant = team.participant;
          query += `&_default_name=${participant.name}&_default_mobile=${participant.mobile}&_default_email=${participant.email}`
        }

        const link = `https://cf.lingxi360.com/p/${team.project.pay.id_lx}?${query}`
        location.href = link;
      },
      (error) => { }
    );
  }
}
