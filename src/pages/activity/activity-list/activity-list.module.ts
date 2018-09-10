import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityListPage } from './activity-list';

import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    ActivityListPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivityListPage),
    ComponentsModule,
  ],
})
export class ActivityListPageModule { }
