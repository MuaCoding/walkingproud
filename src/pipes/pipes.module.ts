import { NgModule } from '@angular/core';

import { MyDatePipe } from './my-date/my-date';
import { SanitizeHtmlPipe } from './sanitize-html/sanitize-html';
import { AgoTimePipe } from './ago-time/ago-time';

@NgModule({
  declarations: [
    MyDatePipe,
    SanitizeHtmlPipe,
    AgoTimePipe,
  ],
  imports: [
  ],
  exports: [
    MyDatePipe,
    SanitizeHtmlPipe,
    AgoTimePipe,
  ]
})
export class PipesModule { }
