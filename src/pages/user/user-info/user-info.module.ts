import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserInfoPage } from './user-info';

import { ComponentsModule } from './../../../components/components.module';

@NgModule({
  declarations: [
    UserInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(UserInfoPage),
    ComponentsModule,
  ],
})
export class UserInfoPageModule { }
