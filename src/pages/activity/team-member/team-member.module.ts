import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamMemberPage } from './team-member';

import { ComponentsModule } from './../../../components/components.module';

@NgModule({
  declarations: [
    TeamMemberPage,
  ],
  imports: [
    IonicPageModule.forChild(TeamMemberPage),
    ComponentsModule,
  ],
})
export class TeamMemberPageModule { }
