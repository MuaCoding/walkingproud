import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';

import { Result, List, Paging } from '../../models/webapi';

import { Observable } from 'rxjs/observable';
import { AsyncSubject } from 'rxjs/AsyncSubject';

@Injectable()
export class MockInterceptorProvider implements HttpInterceptor {

  constructor() {
  }

  mock_result: Result = {
    code: 0,
    msg: "",
    data: ""
  };

  mock_list: List = {
    code: 0,
    msg: "",
    data: []
  };

  mock_paging: Paging = {
    code: 0,
    msg: "",
    data: {
      count: 1,
      page: 1,
      data: []
    }
  };

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const subject = new AsyncSubject<HttpEvent<any>>();

    let mock: HttpResponse<any>;
    try {
      mock = new HttpResponse({
        body: this.mock(req.url)
      });
    }
    catch (ex) {
      return next.handle(req);
    }

    setTimeout(() => {
      subject.next(mock);
      subject.complete();
    }, 500);

    return subject;

  }

  mock(input: string) {
    try {
      return JSON.parse(input);
    }
    catch (ex) {
      switch (input) {
        case "Result": return this.mock_result;
        case "List": return this.mock_list;
        case "Paging": return this.mock_paging;
        default: throw "real address";
      }
    }
  }
}
