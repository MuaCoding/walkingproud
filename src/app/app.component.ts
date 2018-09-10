import { Component } from '@angular/core';
import { AuthenticationProvider } from './../providers/authentication/authentication';
import { WxjssdkProvider } from './../providers/wxjssdk/wxjssdk';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  constructor(public auth: AuthenticationProvider,public wxjssdk: WxjssdkProvider) {
    this.auth.reuqest();
    // this.wxjssdk.init(location.href);
  }

}
