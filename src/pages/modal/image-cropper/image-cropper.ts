import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Result } from './../../../models/webapi';
import { UtilityProvider } from './../../../providers/utility/utility';

import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'modal-image-cropper'
})
@Component({
  selector: 'page-image-cropper',
  templateUrl: 'image-cropper.html',
})
export class ImageCropperPage {

  file: File;
  cropped: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public http: HttpClient, public utility: UtilityProvider) {
  }

  ngOnInit() {
    this.file = this.navParams.get("file");
  }

  imageCropped(cropped: string) {
    this.cropped = cropped;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save() {
    const loading$ = this.utility.loading();
    const upload$ = this.http.post<Result>("/other/image", { dataURI: this.cropped });

    upload$.finally(
      () => {
        loading$.dismiss();
      }
    ).subscribe(
      (result) => {
        this.viewCtrl.dismiss(result.data, "ok");
      },
      (error) => { }
    );
  }

}
