import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { DirectivesModule } from '../directives/directives.module';
import { ComponentsModule } from './components.module';

import { TeamDonationComponent } from './team/team-donation/team-donation';

@NgModule({
  declarations: [
    TeamDonationComponent
  ],
  imports: [
    IonicModule,
    DirectivesModule,
    ComponentsModule,
  ],
  exports: [
    TeamDonationComponent,
  ],
})
export class TeamComponentsModule { }
