import { Component, Input } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IonicPage, NavController, NavParams, Refresher, InfiniteScroll, ActionSheet, ActionSheetButton } from 'ionic-angular';

import { Result, Paging } from '../../../models/webapi';
import { Pagination } from '../../../models/pagination';

import { UtilityProvider } from './../../../providers/utility/utility';

import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'team-audit-list',
  defaultHistory: ['activity-index']
})
@Component({
  selector: 'page-team-audit-list',
  templateUrl: 'team-audit-list.html',
})
export class TeamAuditListPage {

  id = this.navParams.get("id");

  @Input() params: { [param: string]: string | string[]; };

  result = new Pagination();

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public utility: UtilityProvider) {
  }

  ngOnInit() {
    this.getAudit();
  }

  getAudit(refresher?: Refresher | InfiniteScroll) {
    const params = new HttpParams({ fromObject: this.params }).set("team", this.id).set("page", this.result.current.toString());
    const audit$ = this.http.get<Paging>("/team/join/apply", { params });

    audit$.finally(
      () => {
        this.result.completed = true;

        setTimeout(() => {
          refresher && refresher.complete();
        }, 20);
      }
    ).subscribe(
      (result) => {
        this.result.loading(result);
      },
      (error) => {
        this.result.reset(true);
      }
    );
  }

  doRefresh(refresher?) {
    this.result.reset();
    this.getAudit(refresher);
  }

  doInfinite(infiniteScroll) {
    if (this.result.more) {
      this.getAudit(infiniteScroll);
    }
  }

  more(item) {
    if (item.status != 0) {
      return false;
    }

    const agree: ActionSheetButton = {
      text: '同意加入',
      handler: () => {
        this.agree(item, actionSheet$)
        return false;
      }
    };

    const refuse: ActionSheetButton = {
      text: '拒绝申请',
      role: 'destructive',
      handler: () => {
        this.refuse(item, actionSheet$);
        return false;
      }
    };

    const actionSheetButtons: ActionSheetButton[] = [agree, refuse];

    const actionSheet$ = this.utility.actionSheet(null, actionSheetButtons);
  }

  agree(item, actionSheet?: ActionSheet) {
    if (item.status != 0) {
      return false;
    }

    const confirm$ = this.utility.confirm("", `同意${item.name}加入队伍`, { icon: "ion-ios-wp-feedback-outline" });
    confirm$.onDidDismiss(
      (data, role) => {
        if (role == "ok") {
          const loading$ = this.utility.loading();
          const agree$ = this.http.post<Result>(`/team/join/apply/${item.id}/agree`, null);

          agree$.finally(
            () => {
              loading$.dismiss();
            }
          ).subscribe(
            (result) => {
              const alert$ = this.utility.alert("", "队员已成功加入队伍", { icon: "ion-ios-wp-success" });
              alert$.onDidDismiss(
                (data, role) => {
                  if (role == "ok") {
                    actionSheet && actionSheet.dismiss();
                    this.doRefresh();
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

  refuse(item, actionSheet?: ActionSheet) {
    if (item.status != 0) {
      return false;
    }

    const confirm$ = this.utility.confirm("", `拒绝${item.name}加入队伍`, { icon: "ion-ios-wp-feedback-outline" });
    confirm$.onDidDismiss(
      (data, role) => {
        if (role == "ok") {
          const loading$ = this.utility.loading();
          const refuse$ = this.http.post<Result>(`/team/join/apply/${item.id}/refuse`, null);

          refuse$.finally(
            () => {
              loading$.dismiss();
            }
          ).subscribe(
            (result) => {
              const alert$ = this.utility.alert("", "已拒绝申请加入", { icon: "ion-ios-wp-delete" });
              alert$.onDidDismiss(
                (data, role) => {
                  if (role == "ok") {
                    actionSheet && actionSheet.dismiss();
                    this.doRefresh();
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
