import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Results } from './definitions';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// Avoid Typescript error
declare var escape: any;

const BASE_URL = 'https://api.spotify.com/v1/search?q=',
      ARTIST_SEARCH = '&type=artist',
      LIMIT = 10;

@Injectable()
export class MusicSearchService {

  private results: Results = { artists: ''};
  private subject: Subject<Results> = new Subject<Results>();

  constructor(private http: Http) {}

  artistRequest( url ) {
    return this.http.get( url )
                    .map( this.extractData );
  }

  getArtist( title ) {
    const context = this,
          url = BASE_URL+escape(title)+ARTIST_SEARCH+'&limit='+LIMIT;
    this.artistRequest( url ).subscribe(
          response => context.subject.next( response )
      );
  }

  getResults(): Observable<Results> {
    return this.subject.asObservable();
  }

  private extractData( res: Response ) {
    let data = res.json();
    return data.artists.items || {};
  }

}
