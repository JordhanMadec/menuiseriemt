import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumInfo } from '../../album/album-info.model';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {

  public albums: Observable<AlbumInfo[]>;

  private subscription: Subscription;

  constructor(private router: Router, private http: Http, private ngZone: NgZone) {}

  ngOnInit() {
    this.subscription = this.getAllAlbums().subscribe(
      data => {
        this.albums = of(data);
        console.log('GetAllAlbums SUCCESS: ', data);
      },
      error => {
        console.log('GetAllAlbums ERROR: ', error);
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
