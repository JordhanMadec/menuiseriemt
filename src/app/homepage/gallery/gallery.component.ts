import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { AlbumInfo } from '../album/album-info.model';
import { Http } from '@angular/http';
import { Observable ,  Subscription ,  of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {

  public albums: Observable<AlbumInfo[]>;

  private subscription: Subscription;

  constructor(private router: Router, private http: Http, private ngZone: NgZone, private alertService: AlertService) {}

  ngOnInit() {
    this.subscription = this.getAllAlbums().subscribe(
      data => {
        this.albums = of(data);
      },
      error => {
        this.alertService.error('Impossible de récupérer les albums');
      });
  }

  goToAlbum(id: string) {
    this.ngZone.run(() => this.router.navigate(['album', id]));
  }

  private getAllAlbums(): Observable<AlbumInfo[]> {
    return this.http.get('/assets/gallery-db.json').pipe(
      map((res: any) => res.json())
    );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
