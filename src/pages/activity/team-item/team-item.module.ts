import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamItemPage } from './team-item';

import { DirectivesModule } from '../../../directives/directives.module';
import { ComponentsModule } from '../../../components/components.module';
import { TeamComponentsModule } from './../../../components/team.components.module';
import { PipesModule } from './../../../pipes/pipes.module';

@NgModule({
  declarations: [
    TeamItemPage,
  ],
  imports: [
    IonicPageModule.forChild(TeamItemPage),
    DirectivesModule,
    ComponentsModule,
    TeamComponentsModule,
    PipesModule,
  ],
})
export class TeamItemPageModule { }
