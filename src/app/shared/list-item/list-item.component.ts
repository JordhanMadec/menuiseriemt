import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input() icon: string;
  @Input() title: string;
  @Input() subtitle: string;
  @Input() tags: string[];
  @Input() link: string;
  @Input() error = false;
  @Input() success = false;

  constructor() { }

  ngOnInit() {
  }

}
