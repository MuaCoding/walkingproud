import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamAuditPage } from './team-audit';

import { ComponentsModule } from '../../../components/components.module';
import { TeamAuditListPageModule } from '../team-audit-list/team-audit-list.module';

@NgModule({
  declarations: [
    TeamAuditPage,
  ],
  imports: [
    IonicPageModule.forChild(TeamAuditPage),
    ComponentsModule,
    TeamAuditListPageModule,
  ],
})
export class TeamAuditPageModule { }
