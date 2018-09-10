import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { isPresent } from 'ionic-angular/util/util';
import { Observable } from 'rxjs/observable';

import { isResult } from '../../models/webapi';
import { UtilityProvider } from '../utility/utility';
import { AuthenticationProvider } from '../authentication/authentication';

import 'rxjs/add/operator/do';

@Injectable()
export class InterceptorProvider implements HttpInterceptor {

  constructor(public utility: UtilityProvider, public auth: AuthenticationProvider) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 不需要身份
    const notAuthorize = req.params.has("notAuthorize");
    // 停止错误拦截
    const stopErrorIntercept = req.params.has("stopErrorIntercept");
    // 移除标识
    const params = req.params.delete("notAuthorize").delete("stopErrorIntercept");

    // 自动添加基地址
    const url = new URL(req.url, this.utility.webapi).toString();

    // 自动添加身份token
    if (notAuthorize) {
      req = req.clone({ url, params });
    }
    else {
      if (this.auth.valid) {
        req = req.clone({ url, params, setHeaders: { "User-Token": this.auth.identity.token } });
      }
      else {
        this.auth.login();
        return null;
      }
    }

    // 响应后处理
    return next.handle(req).do(
      (event) => { },
      (response) => {
        // 错误统一处理
        if (response instanceof HttpErrorResponse) {
          const error = response.error;
          const hasErrorMsg = isResult(error) && isPresent(error.msg);
          const reason = hasErrorMsg ? error.msg : response.message;

          // 需要登录
          if (response.status === 401) {
            this.auth.login();
            return;
          }
          // 拒绝访问
          else if (response.status === 403) {
            this.utility.toast("无权访问");
            return;
          }
          // 普通错误
          else if (response.status == 500) {
            if (!stopErrorIntercept) {
              this.utility.toast(reason);
              return;
            }
          }
        }
      }
    );
  }

}
