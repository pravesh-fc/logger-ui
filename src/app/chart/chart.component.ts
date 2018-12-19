import {Component, Input, OnChanges, OnInit} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() logs: any;
  @Input() chartType: any;
  chartData: any;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.logs) {
      const chartType = this.chartType;
      const logs = this.logs;
      const data = [['Task', 'uptime']];
      Object.keys(logs).forEach(function (key) {
        const objKey = JSON.parse(key);
        if (objKey[0] === chartType && objKey[2] === 'ok') {
          let failedValue = 0;
          const fails  = logs[ `["${objKey[0]}", "${objKey[1]}", "fail"]` ];
          const date = moment(objKey[1]).format('h A, MMM D YY');
          if (fails) {
            failedValue = fails;
          }
          // @ts-ignore
          data.push([date, 100 - (failedValue / (logs[key] + failedValue))]);
        }
      });
      this.showChart(data, this.chartType);
    }
  }
  showChart(data, chartType) {
    this.chartData =  {
      chartType: 'LineChart',
      dataTable: data,
      legend: {position: 'none'},
      options: {title: chartType.toUpperCase(), allowHtml: true}
    };
  }
}
