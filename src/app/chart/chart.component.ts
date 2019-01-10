import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import * as moment from 'moment';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() logs: any;
  @Input() chartType: any;
  @Input() durationType: any;
  chartData: any;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }
  ngOnChanges() {
      const data = this.apiService.createLogsData(this.logs, this.chartType, this.durationType);
      this.showChart(data, this.chartType);
  }

  showChart = (data, chartType) => {
    this.chartData =  {
      chartType: 'LineChart',
      dataTable: data,
      legend: {position: 'none'},
      options: {
        title: chartType.toUpperCase(),
        allowHtml: true,
        vAxis: { minValue: 0, maxValue: 100 },
        height: 240,
        width: 710
      }
    };
  }
}
