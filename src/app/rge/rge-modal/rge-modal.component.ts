import { Component, OnInit } from "@angular/core";

import { RgeService } from "./../rge.service";

@Component({
  selector: "app-rge-modal",
  templateUrl: "./rge-modal.component.html",
  styleUrls: ["./rge-modal.component.scss"],
})
export class RgeModalComponent implements OnInit {
  constructor(public readonly rgeService: RgeService) {}

  ngOnInit() {}

  public close() {
    this.rgeService.closeModal();
  }
}
