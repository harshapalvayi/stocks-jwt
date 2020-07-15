import { Injectable } from '@angular/core';
import * as moment from 'moment';
import {Dates} from '@models/dates';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getMonthDates(): Dates {
    const startDate = moment().startOf('month').format('YYYY-MM-DD');
    const endDate = moment().endOf('month').format('YYYY-MM-DD');
    return { startDate,  endDate };
  }

  getWeeklyDates(): Dates {
    const startDate = moment(new Date()).format('YYYY-MM-DD');
    const endDate = moment().subtract(7, 'd').format('YYYY-MM-DD');
    return { startDate,  endDate };
  }

  getFormattedDate(date) {
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    let day = (1 + date.getDate()).toString();
    day = day.length > 1 ? day : '0' + day;
    return `${year}/${month}/${day}`;
  }

}
