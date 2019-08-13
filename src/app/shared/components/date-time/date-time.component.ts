import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
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

  onDateChanged(dateControl: FormControl, event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.date = event.value.toISOString().substring(0, 10);
      if (this.date) {
        const isoDateTime = this.time ? toISO(`${this.date}T${this.time}:00`) : toISO(this.date);
        this.datetimeChange.emit(isoDateTime);
      }
    } else {
      this.date = undefined;
      this.datetimeChange.emit(undefined);
    }
    if (this.required) {
      if (this.date === undefined) {
        dateControl.setErrors({ required: true });
      } else {
        dateControl.setErrors(null);
      }
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
