import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoiceNoticePage } from './invoice-notice';

import { ComponentsModule } from './../../../components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    InvoiceNoticePage,
  ],
  imports: [
    IonicPageModule.forChild(InvoiceNoticePage),
    ComponentsModule,
    PipesModule,
  ],
})
export class InvoiceNoticePageModule { }
