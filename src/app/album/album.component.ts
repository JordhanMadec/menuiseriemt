import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AlbumInfo} from './album-info.model';
import {Http} from '@angular/http';
import 'rxjs/add/observable/of';
import {Subscription} from 'rxjs/Subscription';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';

declare var $: any;

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  ESCAPE = 27,
}

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  album: Observable<AlbumInfo>;
  private mAlbum: AlbumInfo;
  private numbers: number[];

  private path: string;
  private fullsScreenId = 0;

  constructor(private route: ActivatedRoute, private http: Http) {}

  ngOnInit() {
    window.scrollTo(0, 0);

    this.subscription = this.route.params.subscribe(
      (params: any) => {
        const albumId = params['id'];

        this.getAlbum(albumId).subscribe(
          (album: AlbumInfo) => {
            this.getAllPhotos(album.path);
            // Get the number of photos to display
            this.numbers = Array(album.length).fill(0).map((x, i) => i + 1);
            this.album = of(album);
            this.mAlbum = album;
            console.log('GetAlbum SUCCESS: ', album);
          },
          error => {
            console.log('GetAlbum ERROR: ', error);
          });
      }
    );
  }

  private getAlbum(id:  string): Observable<AlbumInfo> {
    return this.http.get('/assets/gallery-db.json').pipe(
      map((res: any) => {
        const albums = res.json();
        for (const album of albums) {
          if (album.id === id) {
            return album;
          }
        }
        return null;
      })
    );
  }

  private getAllPhotos(path:  string): Observable<any> {
    return this.http.get(path).pipe(
      map((res: any) => {
        console.log('ALL PHOTOS: ', res);
      }),
      catchError(error => {
        console.log('ALL PHOTOS ERROR: ', error);
        return of(error);
      })
    );
  }

  showFullScreen(id: number) {
    $('.full-screen-photo-container').fadeIn(500);

    if (this.mAlbum) {
      this.fullsScreenId = id;
      $('#full-screen-photo').attr('src', this.mAlbum.path + '/' + id + '.png');
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log(event);

    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.nextPhoto();
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.previousPhoto();
    }

    if (event.keyCode === KEY_CODE.ESCAPE) {
      this.hideFullScreen();
    }
  }

  hideFullScreen() {
    $('.full-screen-photo-container').fadeOut(500);
  }

  nextPhoto() {
    if (this.mAlbum) {
      this.fullsScreenId = this.numbers[this.fullsScreenId % this.mAlbum.length];
      const src = this.mAlbum.path + '/' + this.fullsScreenId + '.png';

      $('#full-screen-photo').fadeOut(300, function() {
        $('#full-screen-photo').attr('src', src);
      }).fadeIn(300);
    }
  }

  previousPhoto() {
    if (this.mAlbum) {
      this.fullsScreenId = this.numbers[(((this.fullsScreenId - 2) % this.mAlbum.length) + this.mAlbum.length) % this.mAlbum.length];
      const src = this.mAlbum.path + '/' + this.fullsScreenId + '.png';

      $('#full-screen-photo').fadeOut(300, function() {
        $('#full-screen-photo').attr('src', src);
      }).fadeIn(300);
    }
  }

  showCommands() {
    $('#commands').show();
  }

  hideCommands() {
    $('#commands').hide();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
