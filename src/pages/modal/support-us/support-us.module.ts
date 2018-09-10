import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupportUsPage } from './support-us';

import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    SupportUsPage,
  ],
  imports: [
    IonicPageModule.forChild(SupportUsPage),
    ComponentsModule,
  ],
})
export class SupportUsPageModule { }
