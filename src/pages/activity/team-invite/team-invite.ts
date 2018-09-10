import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UtilityProvider } from '../../../providers/utility/utility';
import { Result } from '../../../models/webapi';

import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'team-invite',
  segment: 'team/:id/invite/:code',
  defaultHistory: ['activity-index']
})
@Component({
  selector: 'page-team-invite',
  templateUrl: 'team-invite.html',
})
export class TeamInvitePage {

  id = this.navParams.get("id");
  code = this.navParams.get("code");

  team: any;
  completed = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public utility: UtilityProvider) {
  }

  ionViewDidLoad() {
    this.getTeam();
  }

  getTeam() {
    const team$ = this.http.get<Result>(`/team/join/invite/${this.id}/${this.code}`);

    team$.finally(
      () => {
        this.completed = true;
      }
    ).subscribe(
      (result) => {
        this.team = result.data;
      },
      (error) => { }
    );
  }

  gotoMain(index?: number) {
    this.utility.gotoPlatform(index);
  }

  join(team) {
    const confirm$ = this.utility.confirm("", `确定加入${team.name}`, { icon: "ion-ios-wp-feedback-outline" });
    confirm$.onDidDismiss(
      (data, role) => {
        if (role == "ok") {
          const loading$ = this.utility.loading();
          const join$ = this.http.post<Result>("/team/join/invite/code", { activity: team.activity.id, team: this.id, code: this.code });

          join$.finally(
            () => {
              loading$.dismiss();
            }
          ).subscribe(
            (result) => {
              const alert$ = this.utility.alert("", "已成功加入队伍", { icon: "ion-ios-wp-success", okText: "立即前往" });
              alert$.onDidDismiss(
                (data, role) => {
                  if (role == "ok") {
                    this.navCtrl.setPages([{ page: "activity-index" }, { page: "team-item", data: { id: this.id } }]);
                  }
                }
              );
            },
            (error) => { }
          );
        }
      }
    );
  }

  registration(team) {
    const invite = {
      id: team.id,
      name: team.name,
      activity: team.activity.id,
      code: this.code
    };

    sessionStorage.setItem("wp_invite", JSON.stringify(invite));
    this.navCtrl.setPages([{ page: "activity-index" }, { page: "activity-protocol" }]);
  }

}
