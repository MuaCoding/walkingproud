import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Result } from '../../../models/webapi';

@Component({
  selector: 'home-statistics',
  templateUrl: 'home-statistics.html'
})
export class HomeStatisticsComponent {

  statistics: any = {
    money: 0,
    count: 0,
    shrink: null
  };

  constructor(public http: HttpClient) {
  }

  ngOnInit() {
    this.getStatistics();
  }

  getStatistics() {
    const statistics$ = this.http.get<Result>("/statistical/main");

    statistics$.subscribe(
      (result) => {
        let data = result.data;
        data.shrink = this.shrink(data.money);
        this.statistics = data;
      },
      (error) => { }
    );
  }

  shrink(value: number, limit: number = 1000000, denominator: number = 10000): number {
    return (value >= limit ? value / denominator : null) * 1.00;
  }

}
