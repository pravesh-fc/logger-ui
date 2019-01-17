import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'logger-ui';
  arrayOfDays  = [];
  ngOnInit() {
    this.calDays();
  }
  calDays() {
    for ( let i = 6; i >= 0 ; i--) {
      this.arrayOfDays[i] = moment().subtract(i, 'days').format('MMMM Do, YYYY');
    }
  }
}
