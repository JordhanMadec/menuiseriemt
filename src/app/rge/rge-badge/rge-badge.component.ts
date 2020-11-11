import { Component, Input, OnInit } from "@angular/core";

import { RgeService } from "../rge.service";

@Component({
  selector: "app-rge-badge",
  templateUrl: "./rge-badge.component.html",
  styleUrls: ["./rge-badge.component.scss"],
})
export class RgeBadgeComponent implements OnInit {
  @Input() size = 80;

  constructor(private readonly rgeService: RgeService) {}

  ngOnInit() {}

  public openRgeModal() {
    this.rgeService.openModal();
  }
}
