import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Result } from '../../models/webapi';

import 'rxjs/add/operator/shareReplay';

interface Identity {
  token: string;
  exp: Date;
  openId: string;
}

@Injectable()
export class AuthenticationProvider {

  info: any;

  constructor(public http: HttpClient) {
  }

  get identity(): Identity {
    return <Identity>JSON.parse(localStorage["wp_identity"] || '{}');
  }

  get token(): string {
    return this.identity.token;
  }

  get exp(): Date {
    let exp = this.identity.exp;

    if (exp) {
      try {
        return new Date(exp);
      }
      catch (ex) {
        return null;
      }
    }
    else {
      return null;
    }
  }

  get openId(): string {
    return this.identity.openId;
  }

  get valid(): boolean {
    let token = this.token;
    let exp = this.exp;

    if (!token) {
      return false;
    }
    else if (!exp) {
      return false;
    }
    else {
      let now = new Date();

      if ((exp.getTime() - now.getTime()) <= 0) {
        return false;
      }
      else {
        return true;
      }
    }
  }

  get userToken(): HttpHeaders {
    if (this.valid) {
      return new HttpHeaders({ "User-Token": this.token });
    }
    else {
      this.login();
      return null;
    }
  }

  login() {
    let login_url = new URL("/assets/login.html", location.origin);
    login_url.search = `url=${location.href}`;
    location.replace(String(login_url));
  }

  logout() {
    localStorage.removeItem("wp_identity");
  }

  reuqest() {
    const userInfo$ = this.http.get<Result>("/user/info/status").shareReplay();

    userInfo$.subscribe(
      (result) => {
        this.info = result.data;
      },
      (error) => { }
    );

    return userInfo$;
  }

  getUserInfo(refresh?: boolean): Observable<any> {
    return new Observable<any>(
      (observer) => {
        if (this.info && !refresh) {
          observer.next(this.info);
          observer.complete();
        }
        else {
          this.reuqest().subscribe(
            (result) => {
              observer.next(this.info);
              observer.complete();
            },
            (error) => {
              observer.error(error);
            }
          );
        }
      }
    );
  }
}
