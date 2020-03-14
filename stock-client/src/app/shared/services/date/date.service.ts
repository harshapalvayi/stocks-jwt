import { Injectable } from '@angular/core';
import * as moment from 'moment';
import {Dates} from '@models/dates';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getDates(): Dates {
    const startDate = moment().startOf('month').format('YYYY-MM-DD');
    const endDate = moment().endOf('month').format('YYYY-MM-DD');
    return { startDate,  endDate };
  }
}
