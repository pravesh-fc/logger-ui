import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { apiUrls } from './constants';
import { HttpClient } from '@angular/common/http';

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
}
