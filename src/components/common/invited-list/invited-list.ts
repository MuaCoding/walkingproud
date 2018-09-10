import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Result } from '../../../models/webapi';
import { UtilityProvider } from './../../../providers/utility/utility';

import 'rxjs/add/operator/finally';

@Component({
  selector: 'invited-list',
  templateUrl: 'invited-list.html',
})
export class InvitedListComponent {

  @Input() data: any[] = [];

  @Output() resize: EventEmitter<any> = new EventEmitter<any>();

  constructor(public http: HttpClient, public utility: UtilityProvider) {
  }

  trackByFn(index: number, item) {
    return item.id;
  }

  agree(item) {
    if (item.status != 0) {
      return false;
    }

    const confirm$ = this.utility.confirm("", `同意${item.team.name}的邀请`, { icon: "ion-ios-wp-feedback-outline" });
    confirm$.onDidDismiss(
      (data, role) => {
        if (role == "ok") {
          const loading$ = this.utility.loading();
          const agree$ = this.http.post<Result>(`/team/join/invite/${item.id}/agree`, null);

          agree$.finally(
            () => {
              loading$.dismiss();
            }
          ).subscribe(
            (result) => {
              const alert$ = this.utility.alert("", "已成功加入队伍", { icon: "ion-ios-wp-success" });
              alert$.onDidDismiss(
                (data, role) => {
                  if (role == "ok") {
                    this.resize.emit();
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

  refuse(item) {
    if (item.status != 0) {
      return false;
    }

    const confirm$ = this.utility.confirm("", `拒绝${item.team.name}的邀请`, { icon: "ion-ios-wp-feedback-outline" });
    confirm$.onDidDismiss(
      (data, role) => {
        if (role == "ok") {
          const loading$ = this.utility.loading();
          const refuse$ = this.http.post<Result>(`/team/join/invite/${item.id}/refuse`, null);

          refuse$.finally(
            () => {
              loading$.dismiss();
            }
          ).subscribe(
            (result) => {
              const alert$ = this.utility.alert("", "已拒绝入队邀请", { icon: "ion-ios-wp-delete" });
              alert$.onDidDismiss(
                (data, role) => {
                  if (role == "ok") {
                    this.resize.emit();
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
