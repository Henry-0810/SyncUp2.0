import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Event } from './home/home.component';

@Injectable({
  providedIn: 'root'
})
export class SyncUpDataService {

  private apiBaseUrl = 'http://localhost:3000/api';
  public getEvents(): Promise <Event[]> {
    const title: string = 'Meet up with friends';
    const description: string = 'Meet up with friends at the park';
    const start: string = '2023-12-04T09:00:00';
    const end: string = '2021-12-04T10:00:00';
    const url: string = `${this.apiBaseUrl}/events?title={title}&description={description}&start={start}&end={end}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Event[])
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
      console.error('Something has gone wrong', error);
      return Promise.reject(error.message || error);
  }
  constructor(private http: HttpClient) {
    
  }
}
