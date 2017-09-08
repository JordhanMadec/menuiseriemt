import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlbumInfo} from '../album/album-info.model';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {

  // public albums: AlbumInfo[] = [
  //   new AlbumInfo('Fenêtres', '/assets/img/services/fenetre.png'),
  //   new AlbumInfo('Parquet', '/assets/img/services/parquet.png'),
  //   new AlbumInfo('Aménagement intérieur', '/assets/img/services/amenagement_inte.png'),
  //   new AlbumInfo('Volets roulants', '/assets/img/services/fenetre.png'),
  //   new AlbumInfo('Charpente', '/assets/img/services/charpente.png'),
  //   new AlbumInfo('Pose d\'escaliers', '/assets/img/services/escalier.png'),
  //   new AlbumInfo('Isolation intérieure', '/assets/img/services/isolation_inte.png'),
  //   new AlbumInfo('Isolation extérieure', '/assets/img/services/isolation_exte.png')
  // ];

  public albums: Observable<AlbumInfo[]>;

  private subscription: Subscription;

  constructor(private router: Router, private http: Http) {}

  ngOnInit() {
    this.subscription = this.getAllAlbums().subscribe(
      data => {
        this.albums = Observable.of(data);
        console.log('GetAllAlbums SUCCESS: ', data);
      },
      error => {
        console.log('GetAllAlbums ERROR: ', error);
      });
  }

  goToAlbum(id: string) {
    this.router.navigate(['album', id]);
  }

  private getAllAlbums(): Observable<AlbumInfo[]> {
    return this.http.get('/assets/gallery-db.json')
      .map((res: any) => res.json());

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
