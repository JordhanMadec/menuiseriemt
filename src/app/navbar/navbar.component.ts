import { Component, OnInit } from '@angular/core';
import {NavItem} from './nav-item.model';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  items: NavItem[] = [
    new NavItem('Nos services', '#services-section'),
    new NavItem('Nos réalisations', '#gallery-section'),
    new NavItem('À propos', '#about-section'),
    new NavItem('Nos partenaires', '#partners-section'),
    new NavItem('Contact', '#contact-section')
  ];

  constructor() { }

  ngOnInit() {
    $('body').scrollspy({ target: '#navbar' });
  }
}
