import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CountInfoPage } from './count-info';

import { ComponentsModule } from './../../../components/components.module';

@NgModule({
  declarations: [
    CountInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(CountInfoPage),
    ComponentsModule,
  ],
})
export class CountInfoPageModule { }
