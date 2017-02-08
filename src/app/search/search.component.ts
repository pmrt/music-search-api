import { Component, OnInit } from '@angular/core';
import { MusicSearchService } from '../music-search.service';
import { Results } from '../definitions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private results: Results;
  private processed = [];
  constructor( private ms: MusicSearchService) {
    this.ms.getResults().subscribe(
        results => {
            this.results = results;
            this.getData();
        }
      );
  }

  ngOnInit() {}

  reset() {
    this.processed = [];
  }

  getData() {
    this.reset();
    let item, img, name,
        items = this.results;
    for ( item in items ) {
      name = items[item].name;
      img = items[item].images.find( image => image ) || {};
      if ( name && img.hasOwnProperty('url') ) {
        this.processed.push({"name": name, "img": img.url });
      }
    }
  }

}
