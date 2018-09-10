import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MultiPickerModule } from 'ion-multi-picker';

import { DirectivesModule } from '../directives/directives.module';
import { PipesModule } from '../pipes/pipes.module';

import { EmptyStateComponent } from './common/empty-state/empty-state';
import { GalleryComponent } from './common/gallery/gallery';
import { SlideTabsComponent } from './common/slide-tabs/slide-tabs';
import { MyProgressComponent } from './common/my-progress/my-progress';
import { UserAvatarComponent } from './common/user-avatar/user-avatar';
import { LoadMoreComponent } from './common/load-more/load-more';
import { ScrollMenusComponent } from './common/scroll-menus/scroll-menus';
import { MessageListComponent } from './common/message-list/message-list';
import { ActivityListComponent } from './common/activity-list/activity-list';
import { ProjectListComponent } from './common/project-list/project-list';
import { UserActivityListComponent } from './common/user-activity-list/user-activity-list';
import { UserDonationListComponent } from './common/user-donation-list/user-donation-list';
import { RankingComponent } from './common/ranking/ranking';
import { PartnerComponent } from './common/partner/partner';
import { TeamListComponent } from './common/team-list/team-list';
import { MemberListComponent } from './common/member-list/member-list';
import { DonationListComponent } from './common/donation-list/donation-list';
import { NewsListComponent } from './common/news-list/news-list';
import { EventListComponent } from './common/event-list/event-list';
import { ParticipantInfoComponent } from './common/participant-info/participant-info';
import { InvitedListComponent } from './common/invited-list/invited-list';
import { PayRecordListComponent } from './common/pay-record-list/pay-record-list';

@NgModule({
  declarations: [
    EmptyStateComponent,
    GalleryComponent,
    SlideTabsComponent,
    MyProgressComponent,
    UserAvatarComponent,
    LoadMoreComponent,
    ScrollMenusComponent,
    MessageListComponent,
    ActivityListComponent,
    ProjectListComponent,
    UserActivityListComponent,
    UserDonationListComponent,
    RankingComponent,
    PartnerComponent,
    TeamListComponent,
    MemberListComponent,
    DonationListComponent,
    NewsListComponent,
    EventListComponent,
    ParticipantInfoComponent,
    InvitedListComponent,
    PayRecordListComponent,
  ],
  imports: [
    IonicModule,
    DirectivesModule,
    PipesModule,
    MultiPickerModule,
  ],
  exports: [
    EmptyStateComponent,
    GalleryComponent,
    SlideTabsComponent,
    MyProgressComponent,
    UserAvatarComponent,
    LoadMoreComponent,
    ScrollMenusComponent,
    MessageListComponent,
    ActivityListComponent,
    ProjectListComponent,
    UserActivityListComponent,
    UserDonationListComponent,
    RankingComponent,
    PartnerComponent,
    TeamListComponent,
    MemberListComponent,
    DonationListComponent,
    NewsListComponent,
    EventListComponent,
    ParticipantInfoComponent,
    InvitedListComponent,
    PayRecordListComponent,
  ]
})
export class ComponentsModule { }
