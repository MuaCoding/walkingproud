import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';

import { HomeComponentsModule } from '../../components/home.components.module';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    HomeComponentsModule,
  ],
})
export class HomePageModule { }
