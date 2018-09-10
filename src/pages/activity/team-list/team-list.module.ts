import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamListPage } from './team-list';

import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    TeamListPage,
  ],
  imports: [
    IonicPageModule.forChild(TeamListPage),
    ComponentsModule,
  ],
})
export class TeamListPageModule { }
