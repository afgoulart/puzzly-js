import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      setTimeout(function() {
        window.location.href = '/';
      }, 1000);
    } else {
      this.router.navigate(['/sing-in']);
    }
  }

  ngOnInit() { }
}
