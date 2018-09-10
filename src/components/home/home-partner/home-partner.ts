import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { List } from '../../../models/webapi';

import 'rxjs/add/operator/finally';

@Component({
  selector: 'home-partner',
  templateUrl: 'home-partner.html'
})
export class HomePartnerComponent {

  partner: any[];
  completed = false;

  constructor(public http: HttpClient) {
  }

  ngOnInit() {
    this.getPartner();
  }

  getPartner() {
    const partner$ = this.http.get<List>(`/activity/0/partner`);

    partner$.finally(
      () => {
        this.completed = true;
      }
    ).subscribe(
      (result) => {
        this.partner = result.data;
      },
      (error) => { }
    );
  }

}
