import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplyReceiptPage } from './apply-receipt';

import { MultiPickerModule } from 'ion-multi-picker';
import { ComponentsModule } from './../../../components/components.module';

@NgModule({
  declarations: [
    ApplyReceiptPage,
  ],
  imports: [
    IonicPageModule.forChild(ApplyReceiptPage),
    MultiPickerModule,
    ComponentsModule,
  ],
})
export class ApplyReceiptPageModule { }
