import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(public router: Router) { }

  ngOnInit() {
    $('body').scrollspy({ target: '#navbar' });
  }
}
