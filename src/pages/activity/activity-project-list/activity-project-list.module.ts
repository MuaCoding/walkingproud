import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityProjectListPage } from './activity-project-list';

import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    ActivityProjectListPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivityProjectListPage),
    ComponentsModule,
  ],
})
export class ActivityProjectListPageModule { }
