import { Component, OnInit } from '@angular/core';
import { MusicSearchService } from '../music-search.service';
import { ActivatedRoute } from '@angular/router';
import { preArtist } from '../definitions';

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
  private albums: Object;
  private related: Object;
  constructor( private ms: MusicSearchService, private route: ActivatedRoute ) {
      this.route.params.subscribe(
          params => {
            this.id = params['id']
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
          results => this.albums = results
        );

      this.ms.getRelatedResults().subscribe(
          results => this.related = results
        );

  }

  ngOnInit() {
      this.search();
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
    _artist["url"] = url;
    this.artist = _artist;
  }

}
