import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactUsPage } from './contact-us';

import { ComponentsModule } from '../../../components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    ContactUsPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactUsPage),
    ComponentsModule,
    PipesModule,
  ],
})
export class ContactUsPageModule { }
