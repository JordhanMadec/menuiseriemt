import { Component } from '@angular/core';
import {PageScrollConfig} from 'ngx-page-scroll';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    PageScrollConfig.defaultScrollOffset = 80;
  }
}
