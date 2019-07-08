import { Component } from '@angular/core';
import * as Cookies from 'js-cookie';
import { TouchSequence } from 'selenium-webdriver';

import { AuthenticationService } from './_services';
import { User } from './_models';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: User
  title = 'login';

  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
  }
}
