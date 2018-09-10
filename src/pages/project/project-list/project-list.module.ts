import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectListPage } from './project-list';

import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    ProjectListPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectListPage),
    ComponentsModule,
  ],
})
export class ProjectListPageModule { }
