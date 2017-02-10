import { Component, OnInit } from '@angular/core';
import { MusicSearchService } from '../music-search.service';
import { ActivatedRoute } from '@angular/router';
import { preArtist } from '../definitions';

declare var $:any;


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {

  private id: string;
  private unproccesedArtist: preArtist;
  private artist: Object;
  private toptracks: any;
  private unproccesedAlbums: any;
  private albums: any;
  private unproccesedRelated: any;
  private related: any;
  constructor( private ms: MusicSearchService, private route: ActivatedRoute ) {
      this.route.params.subscribe(
          params => {
            this.id = params['id'];
            this.search();
          }
        );

      this.ms.getSingleArtistResults().subscribe(
          results => {
                        this.unproccesedArtist = results;
                        this.processArtistInfo( results );
                     }
        );

      this.ms.getTopTracksResults().subscribe(
          results => {
            this.toptracks = results
            if ( this.toptracks.length > 5 ) {
              this.toptracks = this.toptracks.splice(0, 5);
            }
          }
        );

      this.ms.getAlbumsResults().subscribe(
          results => {
            this.unproccesedAlbums = results;
            // if ( this.unproccesedAlbums.length > 5 ) {
            //   this.unproccesedAlbums = this.unproccesedAlbums.splice(0, 5);
            // }
            this.processAlbumInfo( results );
          }
        );

      this.ms.getRelatedResults().subscribe(
          results => {
            this.unproccesedRelated = results
            if ( this.unproccesedRelated.length > 4 ) {
              this.unproccesedRelated = this.unproccesedRelated.splice(0, 4);
            }
            this.processRelatedInfo( this.unproccesedRelated );
          }
        );

  }

  ngOnInit() {

  }

  search() {
      var id = this.id;
      this.ms.getSingleArtist( id );
      this.ms.getTopTracks( id );
      this.ms.getAlbums( id );
      this.ms.getRelated( id );
  }

  processArtistInfo( results ) {
    var _artist = {},
        name = results.name,
        images = results.images,
        url = results.external_urls.spotify;

    _artist["name"] = name;
    _artist["image"] = images.find( image => image ).url;
    _artist["url"] = url ? url : '#';
    this.artist = _artist;
  }

  processRelatedInfo( results ) {
    var item, name, image, id,
        images,
        _related = [],
        artist = {};

    for ( item in results ) {
      name = results[item].name;
      id = results[item].id;
      images = results[item].images;
      image = images.find( image => image );
      artist = {
        "name": name,
        "image": image ? image.url : 'http://www.bestnannies.ca/templates/ProgressiveView/main/images/img_not_avai.jpg',
        "id": id
      }
      _related.push( artist );
    }
    this.related = _related;
  }

  processAlbumInfo( results ) {
    var item, url, name, image, images,
        _albums = [],
        album = {};

    for ( item in results ) {
      name = results[item].name;
      images = results[item].images;
      url = results[item].external_urls.spotify;
      image = images.find( image => image );
      album = {
        "name": name,
        "url": url,
        "image": image ? image.url : 'http://www.bestnannies.ca/templates/ProgressiveView/main/images/img_not_avai.jpg'
      }
      _albums.push( album );
    }
    this.albums = _albums;
  }

  play( $event ) {
    let id = $event.currentTarget.className,
        music = $('#' + id)[0];

    if ( music.paused ) {
      music.play();
    } else {
      music.pause();
    }
  }

}
