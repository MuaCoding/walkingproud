import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamChargePage } from './team-charge';

import { ComponentsModule } from './../../../components/components.module';

@NgModule({
  declarations: [
    TeamChargePage,
  ],
  imports: [
    IonicPageModule.forChild(TeamChargePage),
    ComponentsModule,
  ],
})
export class TeamChargePageModule { }
