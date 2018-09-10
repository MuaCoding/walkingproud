import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityIntroductionPage } from './activity-introduction';

import { DirectivesModule } from './../../../directives/directives.module';
import { ComponentsModule } from './../../../components/components.module';
import { PipesModule } from './../../../pipes/pipes.module';

@NgModule({
  declarations: [
    ActivityIntroductionPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivityIntroductionPage),
    DirectivesModule,
    ComponentsModule,
    PipesModule,
  ],
})
export class ActivityIntroductionPageModule { }
