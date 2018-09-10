import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayRecordPage } from './pay-record';

import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    PayRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(PayRecordPage),
    ComponentsModule,
  ],
})
export class PayRecordPageModule { }
