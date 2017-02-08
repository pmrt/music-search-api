import { Component, OnInit } from '@angular/core';
import { MusicSearchService } from '../music-search.service';
import { Results } from '../definitions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private input: string = '';
  private results: Results;

  constructor(private ms: MusicSearchService ) {
    this.ms.getResults().subscribe(
      results => this.results = results
      );
  }

  ngOnInit() {
  }

  isEmpty( elem ) {
    return elem == '';
  }

  search() {
    if ( !this.isEmpty(this.input) ) {
      this.ms.getArtist( this.input );
    }
  }

}
