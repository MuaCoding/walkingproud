import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityIndexPage } from './activity-index';

import { DirectivesModule } from '../../../directives/directives.module';
import { ComponentsModule } from '../../../components/components.module';
import { ActivityComponentsModule } from '../../../components/activity.components.module';

@NgModule({
  declarations: [
    ActivityIndexPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivityIndexPage),
    DirectivesModule,
    ComponentsModule,
    ActivityComponentsModule,
  ],
})
export class ActivityIndexPageModule { }
