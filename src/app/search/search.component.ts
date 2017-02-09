import { Component, OnInit } from '@angular/core';
import { MusicSearchService } from '../music-search.service';
import { Results } from '../definitions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private results: Results;
  private toSearch: string;
  private processed = [];
  constructor( private ms: MusicSearchService, private route: ActivatedRoute ) {
    this.ms.getResults().subscribe(
        results => {
            this.results = results;
            this.getData();
        }
      );
    this.route.params.subscribe(
        params => {
          this.toSearch = params['name'];
          this.search();
        }
      );
  }

  ngOnInit() {}

  reset() {
    this.processed = [];
  }

  getData() {
    this.reset();
    let item, img, name, type,
        items = this.results;
    for ( item in items ) {
      name = items[item].name;
      type = items[item].type;
      type = this.firstLetterCap( type );
      img = items[item].images.find( image => image ) || {};
      if ( name && img.hasOwnProperty('url') ) {
        this.processed.push({"name": name, "img": img.url, "type": type });
      }
    }
  }

  private search() {
    if ( this.toSearch ) {
      this.ms.getArtist( this.toSearch );
      this.toSearch = '';
    } else {
      this.ms.getArtist( 'fran' );
    }
  }

  private firstLetterCap( str ) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

}
