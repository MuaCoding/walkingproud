import { Component, ViewChild, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams, Nav, Content, Header, Modal } from 'ionic-angular';

import { Result } from '../../../models/webapi';
import { WxShare } from './../../../providers/wxjssdk/wxjssdk';
import { AuthenticationProvider } from './../../../providers/authentication/authentication';
import { UtilityProvider } from '../../../providers/utility/utility';

import { AsyncSubject } from 'rxjs/AsyncSubject';
import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'team-item',
  segment: 'team/:id',
  defaultHistory: ['activity-index', 'team-list']
})
@Component({
  selector: 'page-team-item',
  templateUrl: 'team-item.html',
})
export class TeamItemPage {

  @ViewChild(Header) header: Header;

  @ViewChild(Content) content: Content;

  id = this.navParams.get("id");

  participant = this.utility.parseUrlParam("participant");

  team: any;
  completed = false;

  applyJoin = false;

  wxShare = new AsyncSubject<WxShare>();

  supportModal: Modal

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public renderer: Renderer2, public auth: AuthenticationProvider, public utility: UtilityProvider) {
  }

  ngOnInit() {
    this.content.ionScroll.subscribe(this.headerTransparent.bind(this))
  }

  ionViewWillEnter() {
    this.getTeam();
  }

  getTeam() {
    const team$ = this.http.get<Result>(`/team/${this.id}`);

    team$.finally(
      () => {
        this.headerTransparent();
        this.completed = true;
        this.content.resize();
      }
    ).subscribe(
      (result) => {
        this.team = result.data;

        const join_way = this.team.join_way as string[];
        this.applyJoin = join_way.indexOf("ApplyJoin") >= 0;

        this.initShare(this.team);
      },
      (error) => { }
    );
  }

  headerTransparent() {
    const d = this.content.getContentDimensions();

    if (d.scrollTop >= d.contentTop) {
      this.removeClass();
    }
    else {
      this.setClass();
    }
  }

  setClass() {
    this.team && this.renderer.addClass(this.header.getNativeElement(), 'transparent');
  }

  removeClass() {
    this.team && this.renderer.removeClass(this.header.getNativeElement(), 'transparent');
  }

  initShare(team) {
    const userInfo$ = this.auth.getUserInfo();

    userInfo$.subscribe(
      (info) => {
        const shareaParams = {
          activity: team.activity.name,
          project: team.project.name,
          team: team.name,
          slogan: team.slogan,
          name: info.nick_name
        };

        const title = this.utility.eval(team.activity.share.team_title, shareaParams);
        const desc = this.utility.eval(team.activity.share.team_desc, shareaParams);
        const imgUrl = team.picture ? new URL(team.picture, location.origin).toString() : null;
        const params = (team.participant && team.participant.team == team.id) ? (`participant=${team.participant.id}`) : null;

        this.wxShare.next({ title, desc, imgUrl, params });
        this.wxShare.complete();
      },
      (error) => {
        this.wxShare.error(error);
      }
    );
  }

  qrcode() {
    this.utility.qrcode(location.href, "队伍二维码");
  }

  joinTeam(team) {
    const activity = (this.navCtrl as Nav).rootParams["id"];

    const confirm$ = this.utility.confirm("", `确定加入${team.name}`, { icon: "ion-ios-wp-feedback-outline" });
    confirm$.onDidDismiss(
      (data, role) => {
        if (role == "ok") {
          const loading$ = this.utility.loading();
          const join$ = this.http.post<Result>("/team/join/apply", { activity, team: this.id });

          join$.finally(
            () => {
              loading$.dismiss();
            }
          ).subscribe(
            (result) => {
              const alert$ = this.utility.alert("", "申请成功请等待队长审核", { icon: "ion-ios-wp-success" });
              alert$.onDidDismiss(
                (data, role) => {
                  if (role == "ok") {
                    this.getTeam();
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

  exitTeam(team) {
    const prompt$ = this.utility.prompt("", `请输入 <b>${team.name}</b> 进行退队`, {
      input: { name: "name" },
      handler: (data) => {
        if (data.name == team.name) {
          const loading$ = this.utility.loading();
          const exit$ = this.http.delete<Result>(`/team/${this.id}/exit`);

          exit$.finally(
            () => {
              loading$.dismiss();
            }
          ).subscribe(
            (result) => {
              const alert$ = this.utility.alert("", "已成功退出队伍", { icon: "ion-ios-wp-success" });
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

  registration(team) {
    if (team.charge > 0) {
      const confirm$ = this.utility.confirm("缴纳报名费", `共计 ${team.charge * team.members.length} 元（ ${team.charge} 元/人）`, { icon: "ion-ios-wp-feedback-outline", okText: "立即报名" });
      confirm$.onDidDismiss(
        (data, role) => {
          if (role == "ok") {
            this.registrationProcess(team);
          }
        }
      );
    }
    else {
      this.registrationProcess(team);
    }
  }

  registrationProcess(team) {
    const loading$ = this.utility.loading();
    const signup$ = this.http.post<Result>(`/team/${this.id}/signup`, null);

    signup$.finally(
      () => {
        loading$.dismiss();
      }
    ).subscribe(
      (result) => {
        var orderId = result.data;
        if (orderId) {
          this.utility.gotoPay(orderId);
        }
        else {
          const alert$ = this.utility.alert("", "报名成功", { icon: "ion-ios-wp-success" });
          alert$.onDidDismiss(
            (data, role) => {
              if (role == "ok") {
                this.getTeam();
              }
            }
          );
        }
      },
      (error) => { }
    );
  }

  support(team) {
    this.utility.dismissModal(this.supportModal);
    this.supportModal = this.utility.openModal("modal-support-us", { team, participant: this.participant }, { cssClass: 'bottom-modal' });
  }

}
