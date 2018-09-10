import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamManagePage } from './team-manage';

import { DirectivesModule } from './../../../directives/directives.module';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    TeamManagePage,
  ],
  imports: [
    IonicPageModule.forChild(TeamManagePage),
    DirectivesModule,
    ComponentsModule,
  ],
})
export class TeamManagePageModule { }
