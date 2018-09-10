import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { DirectivesModule } from '../directives/directives.module';
import { ComponentsModule } from './components.module';

import { ActivityCountdownComponent } from './activity/activity-countdown/activity-countdown';
import { ActivityStatisticsComponent } from './activity/activity-statistics/activity-statistics';
import { ActivityRankingComponent } from './activity/activity-ranking/activity-ranking';
import { ActivityPartnerComponent } from './activity/activity-partner/activity-partner';

@NgModule({
  declarations: [
    ActivityCountdownComponent,
    ActivityStatisticsComponent,
    ActivityRankingComponent,
    ActivityPartnerComponent,
  ],
  imports: [
    IonicModule,
    DirectivesModule,
    ComponentsModule,
  ],
  exports: [
    ActivityCountdownComponent,
    ActivityStatisticsComponent,
    ActivityRankingComponent,
    ActivityPartnerComponent,
  ],
})
export class ActivityComponentsModule { }
