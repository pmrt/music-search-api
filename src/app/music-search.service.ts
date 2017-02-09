import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Results } from './definitions';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// Avoid Typescript error
declare var escape: any;

 const BASE_URL = 'https://api.spotify.com/v1/search?q=';
 const ARTIST_URL = '&type=artist';
 const DETAILS_BASE_URL = 'https://api.spotify.com/v1/artists/';
 const COUNTRY = 'US';
 const TOP_TRACKS_URL = '/top-tracks?country=' + COUNTRY;
 const ALBUMS_URL = '/albums';
 const RELATED_URL = '/related-artists';
 const ARTIST_LIMIT = 20;
 const TOP_TRACKS_LIMIT = 5;

@Injectable()
export class MusicSearchService {

  private artist: Subject<any> = new Subject<any>();
  private singleartist: Subject<any> = new Subject<any>();
  private toptracks: Subject<any> = new  Subject<any>();
  private albums: Subject<any> = new Subject<any>();
  private related: Subject<any> = new Subject<any>();

  constructor(private http: Http) {}

  private extractArtistData( res: Response ) {
    let data = res.json();
    return data.artists.items || {};
  }

  private extractTopTracks( res: Response ) {
    let data = res.json();
    return data.tracks || {};
  }

  private extractAlbums( res: Response ) {
    let data = res.json();
    return data.items || {};
  }

  private extractRelated( res: Response ) {
    let data = res.json();
    return data.artists || {};
  }

  private extractArtist( res: Response ) {
    let data = res.json()
    return data || {};
  }

  request( url, callback ) {
    return this.http.get( url )
                    .map( callback );
  }

  getArtists( title ) {
    const context = this,
          url = BASE_URL+encodeURI(title)+ARTIST_URL+'&limit='+ARTIST_LIMIT;
    this.request( url, this.extractArtistData ).subscribe(
          response => context.artist.next( response )
      );
  }

  getSingleArtist( id ) {
    const context= this,
          url = DETAILS_BASE_URL + id;
    this.request( url, this.extractArtist ).subscribe(
        response => context.singleartist.next( response )
      );
  }

  getTopTracks( id ) {
    const context = this,
          url = DETAILS_BASE_URL + id + TOP_TRACKS_URL+'&limit='+TOP_TRACKS_LIMIT;
    this.request( url, this.extractTopTracks ).subscribe(
          response => context.toptracks.next( response )
      );
  }

  getAlbums( id ) {
    const context = this,
          url = DETAILS_BASE_URL + id + ALBUMS_URL;
    this.request( url, this.extractAlbums ).subscribe(
          response => context.albums.next( response )
      );
  }

  getRelated( id ) {
    const context = this,
          url = DETAILS_BASE_URL + id + RELATED_URL;
    this.request( url, this.extractRelated ).subscribe(
          response => context.related.next( response )
      );
  }

  getArtistResults(): Observable<any> {
    return this.artist.asObservable();
  }

  getSingleArtistResults(): Observable<any> {
    return this.singleartist.asObservable();
  }

  getTopTracksResults(): Observable<any> {
    return this.toptracks.asObservable();
  }

  getAlbumsResults(): Observable<any> {
    return this.albums.asObservable();
  }

  getRelatedResults(): Observable<any> {
    return this.related.asObservable();
  }

}
