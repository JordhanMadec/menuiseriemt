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
  @Input() link: string;

  constructor() { }

  ngOnInit() {
  }

}
