import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { toISO, toLocalDate, toLocalTime } from '../../utils/date.util';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss']
})
export class DateTimeComponent implements OnChanges {

  @Input() datetime: string;
  @Input() minDate: string;
  @Input() maxDate: string;
  @Input() hint: string;
  @Input() required: boolean;
  @Input() placeholder: string;
  @Output() datetimeChange = new EventEmitter<string>();

  date: string;
  time: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.datetime) {
      if (this.datetime) {
        this.date = toLocalDate(this.datetime);
        this.time = toLocalTime(this.datetime);
      } else {
        this.date = undefined;
        this.time = undefined;
      }
    }
  }

  onDateChanged(newDate: string) {
    if (newDate) {
      this.date = newDate;
      if (this.date) {
        const isoDateTime = this.time ? toISO(`${this.date}T${this.time}:00`) : toISO(this.date);
        this.datetimeChange.emit(isoDateTime);
      }
    } else {
      this.date = undefined;
      this.datetimeChange.emit(undefined);
    }
  }

  onTimeChanged(time: string) {
    this.time = time;
    if (this.date && this.time) {
      const isoDateTime = toISO(`${this.date}T${this.time}:00`);
      this.datetimeChange.emit(isoDateTime);
    } else {
      this.datetimeChange.emit(undefined);
    }
  }

}
