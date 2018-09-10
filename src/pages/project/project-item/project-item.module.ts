import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectItemPage } from './project-item';

import { DirectivesModule } from '../../../directives/directives.module';
import { ComponentsModule } from '../../../components/components.module';
import { ProjectComponentsModule } from './../../../components/project.components.module';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    ProjectItemPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectItemPage),
    DirectivesModule,
    ComponentsModule,
    ProjectComponentsModule,
    PipesModule,
  ],
})
export class ProjectItemPageModule { }
