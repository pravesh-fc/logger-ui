import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  displayValues: any = ['Core Application', 'Email Communication',
                    'Text Communication', 'Fax Communication',
                    'Payment Gateway', 'Phone Support'];
  totalTypes: any = ['application', 'email',
    'text', 'fax',
    'payment', 'phone'];
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
        this.event = res.data.event;
        this.logData = res.data.logs;
      }
    });
  }
  getAllLogs = (duration) => {
    this.apiService.getAllLogs(duration).subscribe( (res) => {
      if (res.status === 200) {
        this.logData = res.data.logs;
      }
    });
  }

}
