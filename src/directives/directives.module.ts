import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { MySrcDirective } from './my-src/my-src';
import { FixedScrollDirective } from './fixed-scroll/fixed-scroll';
import { AutoHeightDirective } from './auto-height/auto-height';
import { ClickStopDirective } from './click-stop/click-stop';
import { MinValidatorDirective } from './min-validator/min-validator';
import { MaxValidatorDirective } from './max-validator/max-validator';
import { ImageSelectDirective } from './image-select/image-select';
import { CountUpDirective } from './count-up/count-up';

@NgModule({
  declarations: [
    MySrcDirective,
    FixedScrollDirective,
    AutoHeightDirective,
    ClickStopDirective,
    MinValidatorDirective,
    MaxValidatorDirective,
    ImageSelectDirective,
    CountUpDirective,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    MySrcDirective,
    FixedScrollDirective,
    AutoHeightDirective,
    ClickStopDirective,
    MinValidatorDirective,
    MaxValidatorDirective,
    ImageSelectDirective,
    CountUpDirective,
  ],
})
export class DirectivesModule { }
