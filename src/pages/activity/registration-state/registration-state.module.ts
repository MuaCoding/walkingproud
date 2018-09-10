import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistrationStatePage } from './registration-state';

import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    RegistrationStatePage,
  ],
  imports: [
    IonicPageModule.forChild(RegistrationStatePage),
    ComponentsModule,
  ],
})
export class RegistrationStatePageModule { }
