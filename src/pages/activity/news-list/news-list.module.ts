import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsListPage } from './news-list';

import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    NewsListPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsListPage),
    ComponentsModule,
  ],
})
export class NewsListPageModule { }
