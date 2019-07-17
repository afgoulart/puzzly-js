import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Cookies from 'js-cookie';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  constructor(private route: Router) {
  }

  ngOnInit() {
    Cookies.remove('currentUser');
    this.route.navigate(['sing-in']);
  }

}
