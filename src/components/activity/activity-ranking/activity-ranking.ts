import { Component, Input, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Slides } from 'ionic-angular';

import { Result } from '../../../models/webapi';

import 'rxjs/add/operator/finally';

@Component({
  selector: 'activity-ranking',
  templateUrl: 'activity-ranking.html'
})
export class ActivityRankingComponent {

  @Input() id: any;

  @ViewChild("slides") slides: Slides;

  ranking: any;
  completed = false;

  constructor(public http: HttpClient) {
  }

  ngOnInit() {
    this.getRanking();
  }

  getRanking() {
    const ranking$ = this.http.get<Result>(`/activity/${this.id}/rank`);

    ranking$.finally(
      () => {
        this.completed = true;
        this.slides.update();
      }
    ).subscribe(
      (result) => {
        this.ranking = result.data;
      },
      (error) => { }
    );
  }

}
