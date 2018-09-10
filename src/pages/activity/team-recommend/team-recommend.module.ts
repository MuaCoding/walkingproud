import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamRecommendPage } from './team-recommend';

import { ComponentsModule } from './../../../components/components.module';

@NgModule({
  declarations: [
    TeamRecommendPage,
  ],
  imports: [
    IonicPageModule.forChild(TeamRecommendPage),
    ComponentsModule,
  ],
})
export class TeamRecommendPageModule { }
