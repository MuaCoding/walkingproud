import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamInvitePage } from './team-invite';

import { DirectivesModule } from '../../../directives/directives.module';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    TeamInvitePage,
  ],
  imports: [
    IonicPageModule.forChild(TeamInvitePage),
    DirectivesModule,
    ComponentsModule,
  ],
})
export class TeamInvitePageModule { }
