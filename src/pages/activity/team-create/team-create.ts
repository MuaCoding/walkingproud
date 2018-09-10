import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';

import { MultiPickerColumn } from 'ion-multi-picker';
import { Result, List } from '../../../models/webapi';

import { UtilityProvider } from '../../../providers/utility/utility';
import { MultiPickerProvider } from '../../../providers/multi-picker/multi-picker';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'team-create',
  defaultHistory: ['activity-index']
})
@Component({
  selector: 'page-team-create',
  templateUrl: 'team-create.html',
})
export class TeamCreatePage {

  formData = {
    picture: null,
    name: null,
    slogan: null,
    type: null,
    project: null,
    money: {
      target: null
    }
  };

  typePicker: MultiPickerColumn[];
  projectPicker: MultiPickerColumn[];
  completed = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public utility: UtilityProvider, public multiPicker: MultiPickerProvider) {
  }

  ionViewDidLoad() {
    Observable.forkJoin([this.getType(), this.getProject()]).finally(
      () => {
        this.completed = true;
      }
    ).subscribe(
      (result) => {
        const types = result[0].data;
        if (types.length == 1) {
          this.formData.type = types[0].id;
        }
        this.typePicker = this.multiPicker.fromatArray(types);

        const projects = result[1].data;
        if (projects.length == 1) {
          this.formData.project = projects[0].id;
        }
        this.projectPicker = this.multiPicker.fromatArray(projects);
      },
      (error) => { }
    );
  }

  getType() {
    const id = (this.navCtrl as Nav).rootParams["id"];
    const params = new HttpParams().set("notAuthorize", null);
    const type$ = this.http.get<List>(`/activity/${id}/group`, { params });

    return type$;
  }

  getProject() {
    const id = (this.navCtrl as Nav).rootParams["id"];
    const params = new HttpParams().set("notAuthorize", null);
    const project$ = this.http.get<List>(`/activity/${id}/project`, { params });

    return project$;
  }

  process(form: NgForm) {
    if (form.valid) {
      const id = (this.navCtrl as Nav).rootParams["id"];
      const formData = Object.assign({ activity: id }, this.formData);
      formData.slogan = formData.slogan || "每一步，都有力量！";

      const confirm$ = this.utility.confirm("", "队伍创建后，组别、捐赠项目、筹款目标不可修改，请仔细核对", { icon: "ion-ios-wp-prompt", okText: "提交" });
      confirm$.onDidDismiss(
        (data, role) => {
          if (role == "ok") {
            const loading$ = this.utility.loading();
            const create$ = this.http.post<Result>("/team/create", formData);

            create$.finally(
              () => {
                loading$.dismiss();
              }
            ).subscribe(
              (result) => {
                const alert$ = this.utility.alert("", "已成功创建队伍", { icon: "ion-ios-wp-success", okText: "立即前往" });
                alert$.onDidDismiss(
                  (data, role) => {
                    if (role == "ok") {
                      this.navCtrl.push("team-item", { id: result.data });
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
    else {
      this.utility.toast("表单中有未通过验证项，请更正后重试");
    }
  }

}
