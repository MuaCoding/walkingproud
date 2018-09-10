import { Component, Input } from '@angular/core';
import { UtilityProvider } from './../../../providers/utility/utility';

@Component({
  selector: 'user-donation-list',
  templateUrl: 'user-donation-list.html'
})
export class UserDonationListComponent {

  @Input() data: any[] = [];

  constructor(public utility: UtilityProvider) {
  }

  trackByFn(index: number, item) {
    return item.id;
  }

  pay(item) {
    if (item.pay.way == 0) {
      this.utility.toast("正在开发中...");
    }
    else {
      this.utility.toast("此订单不支持重新支付");
    }
  }

}
