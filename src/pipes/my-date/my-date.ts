import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'myDate',
})
export class MyDatePipe implements PipeTransform {

  transform(value: string, ...args) {
    if (value) {
      const datePipe = new DatePipe("en-US");

      const full = args[0];
      const abbr = args[1] || full;

      const now = new Date();
      const date = new Date(datePipe.transform(value, 'medium'));

      if (date.getFullYear() == now.getFullYear()) {
        return datePipe.transform(value, abbr);
      }

      return datePipe.transform(value, full);
    }

    return value;
  }

}
