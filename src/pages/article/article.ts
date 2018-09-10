import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Result } from '../../models/webapi';

import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'article',
  segment: 'article/:type/:id'
})
@Component({
  selector: 'page-article',
  templateUrl: 'article.html',
})
export class ArticlePage {

  get title() {
    switch (this.type) {
      case "news": return "资讯详情";
      case "event": return "简报详情";
      default: return "文章详情";
    }
  };

  type = this.navParams.get("type");

  id = this.navParams.get("id");

  article: any;
  completed = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewDidLoad() {
    this.getArticle();
  }

  getArticle() {
    let url = "";
    switch (this.type) {
      case "news": url = `/activity/news/${this.id}`; break;
      case "event": url = `/project/brief/${this.id}`; break;
      default: this.completed = true; return false;
    };

    const article$ = this.http.get<Result>(url);

    article$.finally(
      () => {
        this.completed = true;
      }
    ).subscribe(
      (result) => {
        this.article = result.data;
      },
      (error) => { }
    );
  }


}
