import { Component, Input } from '@angular/core';

@Component({
  selector: 'user-avatar',
  templateUrl: 'user-avatar.html'
})
export class UserAvatarComponent {

  @Input() picture: any;

  @Input() sex: number = 0;

  constructor() {
  }

}
