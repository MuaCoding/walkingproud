import { Component, Input } from '@angular/core';
import { isPresent } from 'ionic-angular/util/util';

import { UtilityProvider } from './../../../providers/utility/utility';

@Component({
  selector: 'partner',
  templateUrl: 'partner.html'
})
export class PartnerComponent {

  @Input() data: any[] = [];

  constructor(public utilit: UtilityProvider) {
  }

  toLink(partner) {
    const link = partner.link;
    if (isPresent(link)) {
      try {
        const url = new URL(link, location.origin);

        const confirm$ = this.utilit.confirm("", `即将离开益动并前往${partner.name}`, { icon: "ion-ios-wp-prompt", okText: "立即前往" });
        confirm$.onDidDismiss(
          (data, role) => {
            if (role == "ok") {
              location.href = url.toString();
            }
          }
        );
      }
      catch (ex) { }
    }
  }

  trackByFn(index: number, item) {
    return item.id;
  }

}
