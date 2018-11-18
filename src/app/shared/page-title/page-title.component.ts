import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string;
  @Input() tags: string[];
  @Input() tagError = false;
  @Input() tagSuccess = false;
  @Input() hasBackButton = false;

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

}
