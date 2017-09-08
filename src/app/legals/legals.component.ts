import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

declare var $: any;

@Component({
  selector: 'app-legals',
  templateUrl: './legals.component.html',
  styleUrls: ['./legals.component.scss']
})
export class LegalsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  goToHome() {
    window.scrollTo(0, 0);
    this.router.navigate(['']);
  }

}
