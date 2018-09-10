import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvitedListPage } from './invited-list';

import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    InvitedListPage,
  ],
  imports: [
    IonicPageModule.forChild(InvitedListPage),
    ComponentsModule,
  ],
})
export class InvitedListPageModule { }
