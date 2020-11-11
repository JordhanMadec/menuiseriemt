import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RgeService {
  private modalOpen = false;
  public readonly modalOpen$ = new Subject<boolean>();

  constructor() {
    this.modalOpen$.next(this.modalOpen);
  }

  public openModal() {
    this.modalOpen = true;
    this.modalOpen$.next(this.modalOpen);
  }

  public closeModal() {
    this.modalOpen = false;
    this.modalOpen$.next(this.modalOpen);
  }
}
