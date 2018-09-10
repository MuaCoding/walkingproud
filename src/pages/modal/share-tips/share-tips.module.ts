import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShareTipsPage } from './share-tips';

@NgModule({
  declarations: [
    ShareTipsPage,
  ],
  imports: [
    IonicPageModule.forChild(ShareTipsPage),
  ],
})
export class ShareTipsPageModule { }
