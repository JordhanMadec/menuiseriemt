import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icons.component.html',
  styleUrls: ['./svg-icons.component.scss']
})
export class SvgIconsComponent {
  @Input() name: String;

  constructor() {}

  get absUrl() {
    return window.location.href;
  }
}
