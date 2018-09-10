import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsercenterPage } from './usercenter';

import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    UsercenterPage,
  ],
  imports: [
    IonicPageModule.forChild(UsercenterPage),
    ComponentsModule,
  ],
})
export class UsercenterPageModule { }
