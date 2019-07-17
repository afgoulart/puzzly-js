import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services';
import * as Cookies from 'js-cookie';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
  public user: any;
  public title: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
        window.location.href = '/';
    } else {
      this.router.navigate(['/sing-in']);
    }
  }

  ngOnInit() {
    this.title = 'Login';

    this.user = Cookies.getJSON('currentUser');
  }
}
