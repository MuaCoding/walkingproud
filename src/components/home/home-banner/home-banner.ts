import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { isPresent } from 'ionic-angular/util/util';
import { List } from '../../../models/webapi';

@Component({
  selector: 'home-banner',
  templateUrl: 'home-banner.html'
})
export class HomeBannerComponent {

  banner: any[];
  banners: any[];

  constructor(public http: HttpClient) {
  }

  ngOnInit() {
    this.getBanner();
  }

  getBanner() {
    const params = new HttpParams().set("platform", "0")
    const banner$ = this.http.get<List>("/banner", { params });

    banner$.subscribe(
      (result) => {
        this.banner = result.data.map(value => value.picture);
        this.banners = result.data;
      },
      (error) => { }
    );
  }

  toLink(index) {
    const banner = this.banners[index];
    const link = banner.link;
    if (isPresent(link)) {
      try {
        const url = new URL(link, location.origin);
        location.href = url.toString();
      }
      catch (ex) { }
    }
  }

}
