import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityProtocolPage } from './activity-protocol';

import { ComponentsModule } from './../../../components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    ActivityProtocolPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivityProtocolPage),
    ComponentsModule,
    PipesModule,
  ],
})
export class ActivityProtocolPageModule { }
