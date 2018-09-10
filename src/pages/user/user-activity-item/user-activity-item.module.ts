import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserActivityItemPage } from './user-activity-item';

import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    UserActivityItemPage,
  ],
  imports: [
    IonicPageModule.forChild(UserActivityItemPage),
    ComponentsModule,
  ],
})
export class UserActivityItemPageModule { }
