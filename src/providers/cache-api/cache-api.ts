import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { List } from '../../models/webapi';

@Injectable()
export class CacheApiProvider {

  caches: {
    url: string;
    params?: string;
    result: List | Observable<List>;
  }[] = [];

  constructor(private http: HttpClient) {
  }

  isList(result: List | Observable<List>): result is List {
    return (<List>result).code !== undefined;
  }

  findCaches(url: string, params?: HttpParams): List | Observable<List> {
    const find = this.caches.find(
      (cache) => {
        return (cache.url == url) && (cache.params == (params ? params.toString() : undefined));
      }
    );

    if (find) {
      return find.result;
    }
    else {
      return null;
    }
  }

  findAPI(url: string, params?: HttpParams): Observable<List> {
    return this.http.get<List>(url, { params });
  }

  setCache(url: string, result: List | Observable<List>, params?: HttpParams) {
    const data = { url, params: (params ? params.toString() : undefined), result };

    const index = this.caches.findIndex(
      (cache) => {
        return (cache.url == url) && (cache.params == (params ? params.toString() : undefined));
      }
    );

    if (index == -1) {
      this.caches.push(data);
    }
    else {
      this.caches[index] = data;
    }
  }

  removeCache(url: string, params?: HttpParams) {
    const index = this.caches.findIndex(
      (cache) => {
        return (cache.url == url) && (cache.params == (params ? params.toString() : undefined));
      }
    );

    if (index >= 0) {
      this.caches.splice(index, 1);
    }
  }

  get<T=any>(url: string, params?: HttpParams): Observable<List<T>> {
    return new Observable<List<T>>(
      (observer) => {
        const cache = this.findCaches(url, params);
        let obser: Observable<List<T>>;

        if (cache) {
          if (this.isList(cache)) {
            observer.next(cache);
            observer.complete();
          }
          else {
            obser = cache;
          }
        }
        else {
          const temp = this.findAPI(url, params);
          this.setCache(url, temp, params);
          obser = temp;
        }

        if (obser) {
          obser.subscribe(
            (result) => {
              this.setCache(url, result, params);
              observer.next(result);
              observer.complete();
            },
            (reason) => {
              observer.error(reason);
            }
          )
        }
      }
    );
  }
}
