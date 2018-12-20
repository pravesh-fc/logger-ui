import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { apiUrls } from './constants';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getAllData(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + apiUrls.GETALLDATA, {}).pipe();
  }

  getAllLogs(duration): Observable<any> {
    return this.http.get<any>(environment.baseUrl + apiUrls.GETALLLOGS, { params: {duration: duration } }).pipe();
  }
  createLogsData = (logs, chartType, durationType) => {
    if (logs) {
      const chartTypeVal = chartType;
      const logsData = logs;
      const data = [['Task', 'uptime']];
      Object.keys(logsData).forEach(function (key) {
        const objKey = JSON.parse(key);
        if (objKey[0] === chartTypeVal && objKey[2] === 'ok') {
          let failedValue = 0;
          const fails  = logsData[ `["${objKey[0]}", "${objKey[1]}", "fail"]` ];
          let dateFormat = 'h A, MMM D YY';
          if (durationType === 'Month') {
            dateFormat = 'MMM D, YY';
          }
          if (durationType === 'Year') {
            dateFormat = 'MMM YY';
          }
          const date = moment(objKey[1]).format(dateFormat);
          if (fails) {
            failedValue = fails;
          }
          // @ts-ignore
          data.push([date, 100 - (failedValue / (logsData[key] + failedValue))]);
        }
      });
      return data;
    }
  }
  getApplicationHealth = (logsData, chartTypeVal) => {
    const totalTypes = ['application', 'email',
      'text', 'fax',
      'payment', 'phone'];
    const resultArray = ['maintenance', 'maintenance', 'maintenance', 'maintenance', 'maintenance', 'maintenance'];

    Object.keys(logsData).forEach(function (key) {
      const objKey = JSON.parse(key);
      const date = moment(objKey[1]).tz(moment.tz.guess());
      const currentDate = moment().subtract(6, 'hour').utc();
      if (date.diff(currentDate, 'hour') > -1) {
        const index = totalTypes.indexOf(objKey[0]);
        if (objKey[2] === 'ok') {
          let failedValue = 0;
          const fails = logsData[`["${objKey[0]}", "${objKey[1]}", "fail"]`];
          if (fails) {
            failedValue = fails;
          }
          const result = 100 - (failedValue / (logsData[key] + failedValue));
          if (result < 70) { resultArray[index] = 'major outage'; }
          if (result < 80) { resultArray[index] = 'partial outage'; }
          if (result < 95) { resultArray[index] = 'degraded performance'; }
          if (result <= 100) { resultArray[index] = 'operational'; }
        }
      }
    });
    return resultArray;
  }
}
