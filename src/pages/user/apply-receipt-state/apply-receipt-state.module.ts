import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplyReceiptStatePage } from './apply-receipt-state';

import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    ApplyReceiptStatePage,
  ],
  imports: [
    IonicPageModule.forChild(ApplyReceiptStatePage),
    ComponentsModule,
  ],
})
export class ApplyReceiptStatePageModule { }
