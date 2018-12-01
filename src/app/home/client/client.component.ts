import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  constructor(private router: Router, private ngZone: NgZone) { }

  ngOnInit() {
  }

  goToLogin() {
    this.ngZone.run(() => this.router.navigate(['login']));
  }

}