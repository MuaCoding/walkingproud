import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserDonationListPage } from './user-donation-list';

import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    UserDonationListPage,
  ],
  imports: [
    IonicPageModule.forChild(UserDonationListPage),
    ComponentsModule,
  ],
  exports: [
    UserDonationListPage,
  ],
})
export class UserDonationListPageModule { }
