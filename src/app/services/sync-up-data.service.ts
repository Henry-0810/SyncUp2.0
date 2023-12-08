import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Event, Friend } from '../home/home.component';

@Injectable({
  providedIn: 'root'
})
export class SyncUpDataService {

  private apiBaseUrl = environment.apiUrl;
  // private apiBaseUrl = 'https://sync-up.onrender.com/api';
  public getEvents(): Promise <Event[]> {
    const url: string = `${this.apiBaseUrl}/events?`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Event[])
      .catch(this.handleError);
  }

  public getFriends(): Promise <Friend[]> {
    const url: string = `${this.apiBaseUrl}/friends?`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Friend[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
      console.error('Something has gone wrong', error);
      return Promise.reject(error.message || error);
  }
  constructor(private http: HttpClient) { }
}
