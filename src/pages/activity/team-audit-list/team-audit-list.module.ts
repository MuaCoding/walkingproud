import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamAuditListPage } from './team-audit-list';

import { DirectivesModule } from './../../../directives/directives.module';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    TeamAuditListPage,
  ],
  imports: [
    IonicPageModule.forChild(TeamAuditListPage),
    DirectivesModule,
    ComponentsModule,
  ],
  exports: [
    TeamAuditListPage,
  ],
})
export class TeamAuditListPageModule { }
