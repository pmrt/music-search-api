import { Component, OnInit } from '@angular/core';
import { MusicSearchService } from '../shared/music-search.service';
import { Results } from '../definitions';
import { Router, ActivatedRoute } from '@angular/router';

// Avoid typescript errors
declare var $:any;


@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.css']
})
export class FinderComponent implements OnInit {
  private input: string = '';
  private results: Results;

  constructor(private ms: MusicSearchService, private router: Router ) {
    this.ms.getArtistResults().subscribe(
      results => this.results = results
      );
  }

  ngOnInit() {
  }

  isEmpty( elem ) {
    return elem == '';
  }

  popSearch() {
    $('#pop').fadeIn( 400 );
    $('#input').fadeIn( 400 );
  }

  hideSearch() {
    $('#pop').fadeOut( 400 );
    $('#input').fadeOut( 400 );
  }

  finder() {
    this.popSearch();
    $('#input').focus();
  }

  search() {
    if ( !this.isEmpty(this.input) ) {
      this.router.navigate(['/artist', this.input]);
      //this.ms.getArtists( this.input );
    }
    this.hideSearch();
  }

}
