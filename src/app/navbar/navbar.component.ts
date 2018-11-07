import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(public router: Router, private authService: AuthService) { }

  ngOnInit() {
    $('body').scrollspy({ target: '#navbar' });
  }

  logout() {
    this.authService.logout();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  goToHome() {
    if (this.isAuthenticated()) {
      this.router.navigate(['esapce-client']);
    } else {
      this.router.navigate(['']);
    }
  }
}
