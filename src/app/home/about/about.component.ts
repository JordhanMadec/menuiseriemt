import { Component, OnInit } from "@angular/core";

import { RgeService } from "./../../rge/rge.service";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"],
})
export class AboutComponent implements OnInit {
  constructor(private readonly rgeService: RgeService) {}

  ngOnInit() {}

  public openRgeModal() {
    this.rgeService.openModal();
  }
}
