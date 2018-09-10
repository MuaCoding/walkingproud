import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserDonationPage } from './user-donation';

import { ComponentsModule } from '../../../components/components.module';
import { UserDonationListPageModule } from '../user-donation-list/user-donation-list.module';

@NgModule({
  declarations: [
    UserDonationPage,
  ],
  imports: [
    IonicPageModule.forChild(UserDonationPage),
    ComponentsModule,
    UserDonationListPageModule,
  ],
})
export class UserDonationPageModule { }
