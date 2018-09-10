import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';

import { Result } from '../../../models/webapi';
import { UtilityProvider } from './../../../providers/utility/utility';

import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'registration',
  defaultHistory: ['activity-index']
})
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  id = (this.navCtrl as Nav).rootParams["id"];

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
    const confirm$ = this.utility.confirm("温馨提示", "参赛信息不可修改，请仔细核对", { icon: "ion-ios-wp-prompt", okText: "提交" });
    confirm$.onDidDismiss(
      (data, role) => {
        if (role == "ok") {
          const loading$ = this.utility.loading();

          const params = new HttpParams().set("activity", this.id);
          const registration$ = this.http.post<Result>("/participant/signup", form.value, { params });

          registration$.finally(
            () => {
              loading$.dismiss();
            }
          ).subscribe(
            (result) => {
              const ssInvite = sessionStorage.getItem("wp_invite");
              if (ssInvite) {
                try {
                  const invite = JSON.parse(ssInvite);
                  const activity = (this.navCtrl as Nav).rootParams["id"];

                  if (invite.activity == activity) {
                    this.joinTeam(invite);
                    return;
                  }
                }
                catch (ex) { }
              }

              this.navCtrl.push("registration-state");
            },
            (error) => { }
          );
        }
      }
    );
  }

  joinTeam(team) {
    const loading$ = this.utility.loading();
    const join$ = this.http.post<Result>("/team/join/invite/code", { activity: team.activity, team: team.id, code: team.code });

    join$.finally(
      () => {
        loading$.dismiss();
      }
    ).subscribe(
      (result) => {
        sessionStorage.removeItem("wp_invite");

        const alert$ = this.utility.alert("", "已成功加入队伍", { icon: "ion-ios-wp-success", okText: "立即前往" });
        alert$.onDidDismiss(
          (data, role) => {
            if (role == "ok") {
              this.navCtrl.setPages([{ page: "activity-index" }, { page: "team-item", data: { id: team.id } }]);
            }
          }
        );
      },
      (error) => {
        this.navCtrl.push("registration-state");
      }
    );
  }

}
