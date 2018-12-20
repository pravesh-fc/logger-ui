import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  displayDuration: any = ['Day', 'Month', 'Year'];
  activeDuration: any = this.displayDuration[0];
  displayValues: any = ['Core Application', 'Email Communication',
                    'Text Communication', 'Fax Communication',
                    'Payment Gateway', 'Phone Support'];
  totalTypes: any = ['application', 'email',
    'text', 'fax',
    'payment', 'phone'];
  allStatus: any = ['operational', 'degraded performance', 'partial outage', 'major outage', 'maintenance'];
  allSystemHealth: any;
  event: any;
  logData: any;
  type: any;
  constructor(private apiService: ApiService) { }
  ngOnInit() {
     this.getAllEvents();
     this.type = this.totalTypes[0];
  }
  selectedTab = (value) => {
    this.type = this.totalTypes[value];
  }
  getAllEvents = () => {
    this.apiService.getAllData().subscribe( (res) => {
      if (res.status === 200) {
        this.allSystemHealth = this.apiService.getApplicationHealth(res.data.logs, this.totalTypes);
        this.event = res.data.event;
        this.event['start_date'] = moment(this.event['start_date']).tz('US/Pacific').format('MMM DD, hh:mm z');
        this.event['end_date'] = moment(this.event['end_date']).tz('US/Pacific').format('MMM DD, hh:mm z');
        this.event['created_at'] = moment(this.event['created_at']).tz('US/Pacific').format('MMM DD, hh:mm z');
        this.logData = res.data.logs;
      }
    });
  }
  getLogsByDuration = (duration) => {
    this.activeDuration = this.displayDuration[duration]
    this.apiService.getAllLogs(duration).subscribe( (res) => {
      if (res.status === 200) {
        this.logData = res.data.logs;
      }
    });
  }
}
