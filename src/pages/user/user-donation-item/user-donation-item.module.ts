import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserDonationItemPage } from './user-donation-item';

import { DirectivesModule } from './../../../directives/directives.module';
import { ComponentsModule } from './../../../components/components.module';

@NgModule({
  declarations: [
    UserDonationItemPage,
  ],
  imports: [
    IonicPageModule.forChild(UserDonationItemPage),
    DirectivesModule,
    ComponentsModule,
  ],
})
export class UserDonationItemPageModule { }
