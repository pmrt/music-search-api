import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MusicSearchService } from '../shared/music-search.service';
import { FilterService } from '../shared/filter.service';
import { BreadcrumbService } from '../shared/breadcrumb.service';

import { DefaultPipe } from '../pipes/default.pipe';
import { Results } from '../definitions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private results: Results;
  private toSearch: string;
  private lastSearch: string;
  private processed = [];
  private pipe = DefaultPipe;
  private loading = false;
  constructor( private ms: MusicSearchService, private route: ActivatedRoute, private fs: FilterService, private bs: BreadcrumbService ) {
    this.ms.getArtistResults().subscribe(
        results => {
            this.results = results;
            this.getData();
            this.loading = false;
        }
      );
    this.route.params.subscribe(
        params => {
          this.toSearch = params['name'];
          this.search();
        }
      );
    this.fs.getFilter().subscribe(
        filter => {
          if ( filter == 'default' ) {
            this.pipe = DefaultPipe;
            this.ms.getArtists( this.lastSearch );
            this.toSearch = '';
          } else {
            this.pipe = filter;
          }
        }
      );
    this.bs.setLevel(2, '' );
  }

  ngOnInit() {}

  reset() {
    this.processed = [];
  }

  getData() {
    this.reset();
    let item, img, popularity, name, id, type,
        items = this.results;

    for ( item in items ) {
      name = items[item].name;
      type = items[item].type;
      popularity = items[item].popularity;
      id = items[item].id;
      type = this.firstLetterCap( type );
      img = items[item].images.find( image => image ) || {};

      if ( name && img.hasOwnProperty('url') ) {
        this.processed.push({"name": name,
                             "img": img.url,
                             "type": type,
                             "id": id,
                             "popularity": popularity });
      }
    }
  }

  private search() {
    this.loading = true;
    if ( this.toSearch ) {
      this.ms.getArtists( this.toSearch );
      this.lastSearch = this.toSearch;
      this.toSearch = '';
    } else {
      this.ms.getArtists( 'fran' );
      this.lastSearch = 'fran';
    }
  }

  private firstLetterCap( str ) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


}
