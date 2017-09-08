import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Location} from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor(private router: Router, private location: Location) {
    this.subscription = router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        if (tree.fragment) {
          // you can use DomAdapter
          const element = document.querySelector('#' + tree.fragment);
          if (element) element.scrollIntoView(element);
          this.location.replaceState('');
        }
      }
    });
  }

  ngOnInit() {
    $(document).ready(() => {
      $('body').scrollspy({target: '#navbar', offset: 0});
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
