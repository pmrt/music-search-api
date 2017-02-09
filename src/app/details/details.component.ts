import { Component, OnInit } from '@angular/core';
import { MusicSearchService } from '../music-search.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {

  private id: string;
  private artist: Object;
  private toptracks: Object;
  private albums: Object;
  private related: Object;
  constructor( private ms: MusicSearchService, private route: ActivatedRoute ) {
      this.route.params.subscribe(
          params => {
            this.id = params['id']
          }
        );

      this.ms.getSingleArtistResults().subscribe(
          results => this.artist = results
        );

      this.ms.getTopTracksResults().subscribe(
          results => this.toptracks = results
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

}
