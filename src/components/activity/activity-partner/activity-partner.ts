import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { List } from '../../../models/webapi';

import 'rxjs/add/operator/finally';

@Component({
  selector: 'activity-partner',
  templateUrl: 'activity-partner.html'
})
export class ActivityPartnerComponent {

  @Input() id: any;

  partner: any[];
  completed = false;

  constructor(public http: HttpClient) {
  }

  ngOnInit() {
    this.getPartner();
  }

  getPartner() {
    const partner$ = this.http.get<List>(`/activity/${this.id}/partner`);

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
