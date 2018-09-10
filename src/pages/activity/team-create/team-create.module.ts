import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamCreatePage } from './team-create';

import { MultiPickerModule } from 'ion-multi-picker';
import { DirectivesModule } from '../../../directives/directives.module';
import { ComponentsModule } from './../../../components/components.module';

@NgModule({
  declarations: [
    TeamCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(TeamCreatePage),
    MultiPickerModule,
    DirectivesModule,
    ComponentsModule,
  ],
})
export class TeamCreatePageModule { }
