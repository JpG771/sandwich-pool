import { Pipe, PipeTransform } from '@angular/core';
import { formatDateTime } from '../../utils/date.util';

@Pipe({
  name: 'datetime'
})
export class DateTimePipe implements PipeTransform {

  transform(value: any, ...args: Array<any>): any {
    if (typeof value === 'string' && value !== '') {
      return formatDateTime(value);
    }

    return '';
  }

}
