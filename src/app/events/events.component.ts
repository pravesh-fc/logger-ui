import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  event: any;
  logData: any;
  constructor(private apiService: ApiService) { }
  ngOnInit() {
    this.getAllEvents();
  }

  ngOnViewInit() {
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
