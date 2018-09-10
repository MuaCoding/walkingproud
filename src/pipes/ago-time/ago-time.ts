import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'agoTime',
})
export class AgoTimePipe implements PipeTransform {

  transform(value: string) {
    if (value) {
      const datePipe = new DatePipe("en-US");

      const now = new Date();
      const date = new Date(datePipe.transform(value, 'medium'));

      const timespan = now.getTime() - date.getTime();

      const second = Math.round(timespan / 1000);
      if (second < 60) {
        return `${second}秒前`
      }
      else {
        const minute = Math.round(second / 60);
        if (minute < 60) {
          return `${minute}分钟前`
        }
        else {
          const hour = Math.round(minute / 60);
          if (hour < 24) {
            return `${hour}小时前`
          }
          else {
            const day = Math.round(hour / 24);
            if (day < 30) {
              return `${day}天前`
            }
            else {
              if (date.getFullYear() == now.getFullYear()) {
                return datePipe.transform(value, "MM-dd");
              }
              else {
                return datePipe.transform(value, "yyyy-MM-dd");
              }
            }
          }
        }
      }
    }

    return value;
  }

}
