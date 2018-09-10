import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Result } from '../../../models/webapi';

@Component({
  selector: 'activity-statistics',
  templateUrl: 'activity-statistics.html'
})
export class ActivityStatisticsComponent {

  @Input() id: any;

  statistics: any = {
    money: 0,
    team: 0,
    count: 0,
    shrink: null
  };

  constructor(public http: HttpClient) {
  }

  ngOnInit() {
    this.getStatistics();
  }

  getStatistics() {
    const statistics$ = this.http.get<Result>(`/statistical/activity/${this.id}`);

    statistics$.subscribe(
      (result) => {
        let data = result.data;
        data.shrink = this.shrink(data.money);
        this.statistics = data;
      },
      (error) => { }
    );
  }

  shrink(value: number, limit: number = 100000, denominator: number = 10000): number {
    return (value >= limit ? value / denominator : null) * 1.00;
  }

}
