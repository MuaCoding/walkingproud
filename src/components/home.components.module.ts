import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { DirectivesModule } from './../directives/directives.module';
import { ComponentsModule } from './components.module';

import { HomeBannerComponent } from './home/home-banner/home-banner';
import { HomeStatisticsComponent } from './home/home-statistics/home-statistics';
import { HomeActivityComponent } from './home/home-activity/home-activity';
import { HomePartnerComponent } from './home/home-partner/home-partner';

@NgModule({
  declarations: [
    HomeBannerComponent,
    HomeStatisticsComponent,
    HomeActivityComponent,
    HomePartnerComponent,
  ],
  imports: [
    IonicModule,
    DirectivesModule,
    ComponentsModule,
  ],
  exports: [
    HomeBannerComponent,
    HomeStatisticsComponent,
    HomeActivityComponent,
    HomePartnerComponent,
  ],
})
export class HomeComponentsModule { }
