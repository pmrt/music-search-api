import { Component, OnInit } from '@angular/core';
import { FilterService } from '../shared/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  private popularity = false;
  private name = false;
  constructor(private fs: FilterService) {}

  ngOnInit() {
  }

  togglePopularity() {
    if (this.popularity) {
      this.popularity=false;
      this.fs.setFilter( 'default' );
    } else {
      this.fs.setFilter( 'popularity' );
      this.popularity=true;
      this.name=false
    }
  }

  toggleName() {
    if (this.name) {
      this.name=false;
      this.fs.setFilter( 'default' );
    } else {
      this.fs.setFilter( 'name');
      this.popularity=false;
      this.name=true;
    }
  }

}
