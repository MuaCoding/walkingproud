import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Result } from '../../models/webapi';
import { WxjssdkProvider, WxShare } from '../../providers/wxjssdk/wxjssdk';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { UtilityProvider } from '../../providers/utility/utility';

import { AsyncSubject } from 'rxjs/AsyncSubject';
import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'certificate'
})
@Component({
  selector: 'page-certificate',
  templateUrl: 'certificate.html',
})
export class CertificatePage {

  id = this.utility.parseUrlParam("order_id") || this.navParams.get("id");

  certificate: any;
  completed = false;

  outer = false;

  wxShare = new AsyncSubject<WxShare>();

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public auth: AuthenticationProvider, public utility: UtilityProvider, public wxjssdk: WxjssdkProvider) {
    this.outer = !this.viewCtrl.isOverlay;
  }

  ionViewWillEnter() {
    this.getCertificate();
  }

  getCertificate() {
    const params = new HttpParams().set("outerid", this.id);
    const certificate$ = this.http.get<Result>("/pay/certificate", { params });

    certificate$.finally(
      () => {
        this.completed = true;
      }
    ).subscribe(
      (result) => {
        this.certificate = result.data;

        this.initShare(this.certificate);
      },
      (error) => { }
    );
  }

  initShare(certificate) {
    const userInfo$ = this.auth.getUserInfo();

    userInfo$.subscribe(
      (info) => {
        const shareaParams = {
          activity: certificate.activity.name,
          project: certificate.project.name,
          name: info.nick_name,
          money: certificate.money
        };

        const title = this.utility.eval(certificate.share.certificate_title, shareaParams);
        const desc = this.utility.eval(certificate.share.certificate_desc, shareaParams);
        const imgUrl = certificate.activity.cover ? new URL(certificate.activity.cover, location.origin).toString() : null;
        const link = new URL("/certificate", location.origin);
        link.search = `order_id=${this.id}`;

        const custom = { title, desc, imgUrl, link: link.href };

        if (!this.outer) {
          this.wxjssdk.share(custom);
        }
        else {
          this.wxShare.next(custom);
          this.wxShare.complete();
        }
      },
      (error) => {
        this.wxShare.error(error);
      }
    );
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  gotoMain() {
    this.utility.gotoPlatform();
  }

  gotoTeam(certificate) {
    const defer = this.utility.gotoSubstation(certificate.activity.id, "team-item", { id: certificate.team.id });
    defer.then(
      () => { this.navCtrl.goToRoot({}); },
      (reason) => { }
    );
  }

}
