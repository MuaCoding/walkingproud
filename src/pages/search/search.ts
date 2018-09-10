import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

import { isBlank } from 'ionic-angular/util/util';
import { Result } from '../../models/webapi';

import { UtilityProvider } from '../../providers/utility/utility';
import { SearchHistoryProvider } from '../../providers/search-history/search-history';

import 'rxjs/add/operator/finally';

@IonicPage({
  name: 'search',
  defaultHistory: ['home']
})
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  @ViewChild('content') content: Content;

  @ViewChild('slides')
  set _slides(element: ElementRef) {
    setTimeout(() => {
      this.slides = element;
    });
  }

  slides: ElementRef;

  result: any;
  keyword: string;

  history = [];
  index = 0;
  default = true;
  completed = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public searchHistory: SearchHistoryProvider, public utility: UtilityProvider) {
  }

  ionViewWillEnter() {
    this.getHistory();
  }

  getHistory() {
    this.searchHistory.load().subscribe(
      (value) => {
        this.history = value;
      },
      (error) => { }
    );
  }

  getSearch(keyword) {
    this.result = null;
    this.completed = false;

    const params = new HttpParams().set("keyword", keyword);
    const search$ = this.http.get<Result>("/default/search", { params });

    search$.finally(
      () => {
        setTimeout(() => {
          this.completed = true;
        }, 800);
      }
    ).subscribe(
      (result) => {
        const data = result.data;

        let index = 0;
        for (const prop in data) {
          if (data[prop]) {
            this.index = index;
            this.result = data;
            return;
          }
          index++;
        }
      },
      (error) => { }
    );
  }

  search(value) {
    value = value.trim();
    if (isBlank(value) || value == "") {
      return false;
    }

    this.default = false;
    this.keyword = value;

    this.getSearch(value);

    this.history = this.searchHistory.set(value);
  }

  remove(keyword) {
    this.utility.confirm("温馨提示", "确定删除该历史记录？").onDidDismiss(
      (data, role) => {
        if (role == "ok") {
          this.history = this.searchHistory.remove(keyword);
        }
      }
    );
  }

  clear() {
    this.utility.confirm("温馨提示", "确定删除全部历史记录？").onDidDismiss(
      (data, role) => {
        if (role == "ok") {
          this.history = this.searchHistory.clear();
        }
      }
    );
  }

  resize() {
    this.content.resize();
  }

}
