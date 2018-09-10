import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Result } from '../../../models/webapi';
import { UtilityProvider } from './../../../providers/utility/utility';

import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'team-member',
  segment: 'team/:id/member',
  defaultHistory: ['activity-index']
})
@Component({
  selector: 'page-team-member',
  templateUrl: 'team-member.html',
})
export class TeamMemberPage {

  id = this.navParams.get("id");

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public utility: UtilityProvider) {
  }

  process(form: FormGroup) {
    const confirm$ = this.utility.confirm("", "成员信息不可修改，请仔细核对", { icon: "ion-ios-wp-prompt", okText: "提交" });
    confirm$.onDidDismiss(
      (data, role) => {
        if (role == "ok") {
          const loading$ = this.utility.loading();
          const registration$ = this.http.post<Result>(`/team/${this.id}/member/create`, form.value);

          registration$.finally(
            () => {
              loading$.dismiss();
            }
          ).subscribe(
            (result) => {
              const alert$ = this.utility.alert("", "已成功添加成员", { icon: "ion-ios-wp-success" });
              alert$.onDidDismiss(
                (data, role) => {
                  if (role == "ok") {
                    if (this.navCtrl.canGoBack()) {
                      this.navCtrl.pop();
                    }
                    else {
                      this.navCtrl.popToRoot({});
                    }
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

}
