import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  // private apiBaseUrl = environment.apiUrl;
  private apiBaseUrl = 'https://sync-up.onrender.com/api';

  // so user is saved
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public currentUser$: Observable<any> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(null);
  }
  loggedIn: boolean = false;

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/users/login`, credentials, {observe: 'response'})
    .pipe(
        tap((response) => {
          if (response.status === 200) {
            this.router.navigate(['/homepage']);
            this.loggedIn = true;
            this.setCurrentUser(response.body);
            console.log(this.currentUserSubject);
            console.log('Login successful');
          } 
          else if(response.status === 404){
            console.log('User not found');
          }
          else {
            console.log('Login failed:', response.body);
          }
        })
      );
  }

  register(credentials: { username: string, password: string, first_name: string, last_name: string, birthday: Date, gender: string }):
   Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/users/sign-up`, credentials)
    .pipe(
      switchMap(() => {
        return this.login({ username: credentials.username, password: credentials.password })
          .pipe(
            tap(() => {
              this.loggedIn = true;
              this.setCurrentUser(credentials);
              this.router.navigate(['/homepage']);
            })
          );
      })
    );
  }

  logout(): Observable<any> {
    console.log('Logout button clicked');
    this.loggedIn = false;
    this.router.navigate(['/login']);
    this.setCurrentUser(null);
    return this.http.get(`${this.apiBaseUrl}/users/logout`).pipe(
      tap(() => {
        console.log('Logout successful');
        this.router.navigate(['/login']);
        this.loggedIn = false;
      }),
      catchError((error) => {
        console.error('Logout error:', error);
        if (error.status === 0) {
          console.error('Network error occurred.');
        } else {
          console.error('Error occurred during logout:', error.message);
        }
        return throwError(error);
      })
    );
  }

  setCurrentUser(user: any): void {
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }
}
