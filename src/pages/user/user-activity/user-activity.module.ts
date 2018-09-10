import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserActivityPage } from './user-activity';

import { ComponentsModule } from '../../../components/components.module';
import { UserActivityListPageModule } from '../user-activity-list/user-activity-list.module';

@NgModule({
  declarations: [
    UserActivityPage,
  ],
  imports: [
    IonicPageModule.forChild(UserActivityPage),
    ComponentsModule,
    UserActivityListPageModule,
  ],
})
export class UserActivityPageModule { }
