import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs'
import { catchError, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiBaseUrl = environment.apiUrl;
  // so user is saved
  private currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(null);
  }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/users/login`, credentials, {observe: 'response'})
    .pipe(
        tap((response) => {
          if (response.status === 200) {
            this.router.navigate(['/home']);
          } else {
            console.log('Login failed:', response.body);
          }
        }),
        catchError((error) => {
          if (error.status === 404) {
            console.log('User not found');
          } else {
            console.error('Login error:', error); 
          }
          return throwError(error); 
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
              this.router.navigate(['/homepage']);
            })
          );
      })
    );
  }

  logout(): void {
    // Clear user data from storage and reset
    this.router.navigate(['/login']);
  }

  setCurrentUser(user: any): void {
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }
}
