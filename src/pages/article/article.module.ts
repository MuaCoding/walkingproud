import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticlePage } from './article';

import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from './../../pipes/pipes.module';

@NgModule({
  declarations: [
    ArticlePage,
  ],
  imports: [
    IonicPageModule.forChild(ArticlePage),
    ComponentsModule,
    PipesModule,
  ],
})
export class ArticlePageModule { }
