import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CertificatePage } from './certificate';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CertificatePage,
  ],
  imports: [
    IonicPageModule.forChild(CertificatePage),
    ComponentsModule,
  ],
})
export class CertificatePageModule { }
