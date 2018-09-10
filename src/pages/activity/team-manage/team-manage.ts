import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams, ActionSheet, ActionSheetButton, DeepLinker } from 'ionic-angular';

import { Result } from './../../../models/webapi';
import { UtilityProvider } from '../../../providers/utility/utility';

import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'team-manage',
  segment: 'team/:id/manage',
  defaultHistory: ['activity-index']
})
@Component({
  selector: 'page-team-manage',
  templateUrl: 'team-manage.html',
})
export class TeamManagePage {

  id = this.navParams.get("id");

  team: any;
  completed = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public deepLink: DeepLinker, public utility: UtilityProvider) {
  }

  ionViewWillEnter() {
    this.getTeam();
  }

  getTeam() {
    const team$ = this.http.get<Result>(`/team/${this.id}/detail`);

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

  /** 更改logo */
  changeLogo(logo) {
    const loading$ = this.utility.loading();
    const change$ = this.http.patch<Result>(`/team/${this.team.id}/picture`, { picture: logo });

    change$.finally(
      () => {
        loading$.dismiss();
      }
    ).subscribe(
      (result) => {
        const alert$ = this.utility.alert("", "已成功更改队伍标志", { icon: "ion-ios-wp-success" });
        alert$.onDidDismiss(
          (data, role) => {
            if (role == "ok") {
              this.team.picture = logo;
            }
          }
        );
      },
      (error) => { }
    );
  }

  /** 更改队名 */
  changeName(team) {
    const prompt$ = this.utility.prompt("更改队伍名称", "队伍名称不可重复", {
      input: { name: "name", value: team.name, placeholder: "给你的队伍起个响亮的名称吧" },
      handler: (output) => {
        if (output.name) {
          const loading$ = this.utility.loading();
          const change$ = this.http.patch<Result>(`/team/${this.team.id}/name`, { name: output.name });

          change$.finally(
            () => {
              loading$.dismiss();
            }
          ).subscribe(
            (result) => {
              const alert$ = this.utility.alert("", "已成功更改队伍名称", { icon: "ion-ios-wp-success" });
              alert$.onDidDismiss(
                (data, role) => {
                  if (role == "ok") {
                    this.team.name = output.name;
                    prompt$.dismiss(null, "ok");
                  }
                }
              );
            },
            (error) => { }
          );
        }

        return false;
      }
    });
  }

  /** 更改口号 */
  changeSlogan(team) {
    const prompt$ = this.utility.prompt("更改队伍口号", "为空时使用默认口号", {
      input: { name: "slogan", value: team.slogan, placeholder: "每一步，都有力量！" },
      handler: (output) => {
        output.slogan = output.slogan || "每一步，都有力量！";

        const loading$ = this.utility.loading();
        const change$ = this.http.patch<Result>(`/team/${this.team.id}/slogan`, { slogan: output.slogan });

        change$.finally(
          () => {
            loading$.dismiss();
          }
        ).subscribe(
          (result) => {
            const alert$ = this.utility.alert("", "已成功更改队伍口号", { icon: "ion-ios-wp-success" });
            alert$.onDidDismiss(
              (data, role) => {
                if (role == "ok") {
                  this.team.slogan = output.slogan;
                  prompt$.dismiss(null, "ok");
                }
              }
            );
          },
          (error) => { }
        );

        return false;
      }
    });
  }

  /** 解散队伍 */
  dissolve(team) {
    const prompt$ = this.utility.prompt("解散并退出队伍", `请输入 <b>${team.name}</b> 进行解散`, {
      input: { name: "name" },
      handler: (data) => {
        if (data.name == team.name) {

          const loading$ = this.utility.loading();
          const dissolve$ = this.http.delete<Result>(`/team/${this.id}/disband`);

          dissolve$.finally(
            () => {
              loading$.dismiss();
            }
          ).subscribe(
            (result) => {
              const alert$ = this.utility.alert("", "已成功解散并退出队伍", { icon: "ion-ios-wp-success" });
              alert$.onDidDismiss(
                (data, role) => {
                  if (role == "ok") {
                    prompt$.dismiss(null, "ok");
                  }
                }
              );
            },
            (error) => { }
          );
        }

        return false;
      }
    });

    prompt$.onDidDismiss(
      (data, role) => {
        if (role == "ok") {
          this.navCtrl.goToRoot({});
        }
      }
    );
  }

  /** 队长转让 */
  transfer(member, actionSheet$: ActionSheet) {
    const confirm$ = this.utility.confirm("将成员升为队长", "您将失去管理权限，降为普通成员", { icon: "ion-ios-wp-prompt" });
    confirm$.onDidDismiss(
      (data, role) => {
        if (role == "ok") {
          const loading$ = this.utility.loading();
          const transfer$ = this.http.post<Result>(`/team/${this.id}/member/${member.id}/leader`, null);

          transfer$.finally(
            () => {
              loading$.dismiss();
            }
          ).subscribe(
            (result) => {
              const alert$ = this.utility.alert("", "您已成功转让队长权限", { icon: "ion-ios-wp-success" });
              alert$.onDidDismiss(
                (data, role) => {
                  if (role == "ok") {
                    actionSheet$.dismiss(null, "transfer");
                  }
                }
              );
            },
            (error) => { }
          );
        }
      }
    );

    actionSheet$.onDidDismiss(
      (data, role) => {
        if (role == "transfer") {
          if (this.navCtrl.canGoBack) {
            this.navCtrl.pop();
          }
          else {
            this.navCtrl.goToRoot({});
          }
        }
      }
    );
  }

  /** 删除/踢出成员 */
  kickout(member, actionSheet$: ActionSheet) {
    const origin = member.origin;
    const options = {
      title: origin == 0 ? "将成员信息删除" : "将成员踢出队伍",
      message: origin == 0 ? "删除后需要重新添加信息" : "退出后需要重新申请入队",
      tips: origin == 0 ? "已删除成员信息" : "成员已被踢出队伍"
    }

    const confirm$ = this.utility.confirm(options.title, options.message, { icon: "ion-ios-wp-prompt" });
    confirm$.onDidDismiss(
      (data, role) => {
        if (role == "ok") {
          const loading$ = this.utility.loading();
          const kickout$ = this.http.delete<Result>(`/team/${this.id}/member/${member.id}`);

          kickout$.finally(
            () => {
              this.getTeam();
              loading$.dismiss();
            }
          ).subscribe(
            (result) => {
              const alert$ = this.utility.alert("", options.tips, { icon: "ion-ios-wp-success" });
              alert$.onDidDismiss(
                (data, role) => {
                  if (role == "ok") {
                    actionSheet$.dismiss(null, "destructive");
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

  /** 选中成员 */
  member(member) {
    if (member.identity != 1) {
      return false;
    }

    const contact: ActionSheetButton = {
      text: `联系电话 (${member.mobile})`,
      handler: () => {
        const a = document.createElement("a");
        a.href = `tel:${member.mobile}`;
        a.click();
      }
    }

    const transfer: ActionSheetButton = {
      text: '转让队长',
      handler: () => {
        this.transfer(member, actionSheet$);
        return false;
      }
    };

    const remove: ActionSheetButton = {
      text: '删除成员',
      role: 'destructive',
      handler: () => {
        this.kickout(member, actionSheet$);
        return false;
      }
    };

    const actionSheetButtons: ActionSheetButton[] = [contact, remove];

    if (member.origin == 1) {
      actionSheetButtons.splice(1, 0, transfer);
    }

    const actionSheet$ = this.utility.actionSheet(member.name, actionSheetButtons);
  }

  /** 邀请码 */
  invitationCode(callback: (result: Result) => void) {
    const confirm$ = this.utility.confirm("生成邀请码", "邀请码仅可一人使用且三十分钟内有效", { icon: "ion-ios-wp-prompt" });
    confirm$.onDidDismiss(
      (data, role) => {
        if (role == "ok") {
          const loading$ = this.utility.loading();
          const code$ = this.http.get<Result>(`/team/join/invite/${this.id}/code`);

          code$.finally(
            () => {
              loading$.dismiss();
            }
          ).subscribe(
            (result) => {
              callback && callback(result);
            },
            (error) => { }
          );
        }
      }
    );
  }

  /** 添加成员 */
  addMember() {
    const add: ActionSheetButton = {
      text: '添加成员',
      handler: () => {
        this.navCtrl.push("team-member", { id: this.id });
      }
    };

    const recommend: ActionSheetButton = {
      text: '平台推荐',
      handler: () => {
        this.navCtrl.push("team-recommend", { id: this.id });
      }
    };

    const invite_link: ActionSheetButton = {
      text: '邀请链接',
      handler: () => {
        this.invitationCode(
          (result) => {
            actionSheet$.dismiss(null, "link");
            actionSheet$.onDidDismiss(
              (data, role) => {
                if (role == "link") {
                  this.navCtrl.push("team-invite", { id: this.id, code: result.data });
                }
              }
            );
          }
        );
        return false;
      }
    };

    const invite_qrcode: ActionSheetButton = {
      text: '二维码邀请',
      handler: () => {
        this.invitationCode(
          (result) => {
            const createUrl = this.deepLink.createUrl(this.navCtrl, "team-invite", { id: this.id, code: result.data });
            const url = new URL(createUrl, this.utility.origin).toString();

            actionSheet$.dismiss(null, "qrcode");
            actionSheet$.onDidDismiss(
              (data, role) => {
                if (role == "qrcode") {
                  this.utility.qrcode(url, "邀请二维码");
                }
              }
            );
          }
        );
        return false;
      }
    };

    const actionSheetButtons: ActionSheetButton[] = [];

    const join_way = this.team.join_way as string[];
    if (join_way.indexOf("CreateParticipant") >= 0) {
      actionSheetButtons.push(add);
    }
    if (join_way.indexOf("InviteJoin") >= 0) {
      actionSheetButtons.push(recommend);
    }
    if (join_way.indexOf("QRCodeJoin") >= 0) {
      actionSheetButtons.push(invite_link, invite_qrcode);
    }

    const actionSheet$ = this.utility.actionSheet(null, actionSheetButtons);
  }

}
