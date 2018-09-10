import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserActivityListPage } from './user-activity-list';

import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    UserActivityListPage,
  ],
  imports: [
    IonicPageModule.forChild(UserActivityListPage),
    ComponentsModule,
  ],
  exports: [
    UserActivityListPage,
  ],
})
export class UserActivityListPageModule { }
