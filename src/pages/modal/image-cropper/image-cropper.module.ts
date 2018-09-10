import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImageCropperPage } from './image-cropper';

import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [
    ImageCropperPage,
  ],
  imports: [
    IonicPageModule.forChild(ImageCropperPage),
    ImageCropperModule,
  ],
})
export class ImageCropperPageModule { }
