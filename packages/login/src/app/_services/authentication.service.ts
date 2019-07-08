import { Injectable } from '@angular/core';
import  { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as Cookies from 'js-cookie';

import { User } from '../_models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  config: any

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.config = environment.config
    this.currentUserSubject = new BehaviorSubject<User>(Cookies.getJSON('currentUser'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.config.apiUrl}/users/authenticate`, { username, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          Cookies.set('currentUser', user);
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    Cookies.remove('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/sing-in']);
  }
}
