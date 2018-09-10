import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

import { isArray } from 'ionic-angular/util/util';

@Injectable()
export class SearchHistoryProvider {

  private key = "search-history";
  private limit = 6;

  list = [];

  constructor(public storage: Storage) {
  }

  load(): Observable<string[]> {
    return new Observable(
      (observer) => {
        this.storage.get(this.key).then(
          (value: string[]) => {
            if (!isArray(value)) {
              value = [];
            }

            this.list = value;

            observer.next(value);
            observer.complete();
          },
          (reason) => {
            observer.error(reason);
          }
        );
      }
    );
  }

  set(value: string): string[] {
    let list = this.list;
    list.unshift(value);

    const set = new Set(list);
    list = Array.from(set);

    if (list.length > this.limit) {
      list.length = this.limit;
    }

    this.storage.set(this.key, list);

    return list;
  }

  remove(value: string): string[] {
    let list = this.list;
    list.splice(list.indexOf(value), 1);

    if (list.length > 0) {
      this.storage.set(this.key, list);
    }
    else {
      this.storage.remove(this.key);
    }

    return list;
  }

  clear(): string[] {
    let list = this.list;
    list = [];

    this.storage.remove(this.key);

    return list;
  }

}
