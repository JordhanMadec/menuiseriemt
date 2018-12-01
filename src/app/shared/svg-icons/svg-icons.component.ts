import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icons.component.html',
  styleUrls: ['./svg-icons.component.scss']
})
export class SvgIconsComponent {
  @Input() name: String;
  @Input() size: Number = 30;

  constructor() {}

  get absUrl() {
    return window.location.href;
  }
}
