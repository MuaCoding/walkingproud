import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { DirectivesModule } from '../directives/directives.module';
import { ComponentsModule } from './components.module';

import { ProjectEventComponent } from './project/project-event/project-event';

@NgModule({
  declarations: [
    ProjectEventComponent,
  ],
  imports: [
    IonicModule,
    DirectivesModule,
    ComponentsModule,
  ],
  exports: [
    ProjectEventComponent,
  ],
})
export class ProjectComponentsModule { }
