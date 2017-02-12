import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../shared/breadcrumb.service';

@Component({
  selector: 'app-presearch',
  templateUrl: './presearch.component.html',
  styleUrls: ['./presearch.component.css']
})
export class PresearchComponent implements OnInit {

  private levels;
  constructor( private bs: BreadcrumbService) {
    this.bs.getLevels().subscribe(
        levels => this.levels = levels
      );
    this.bs.setLevel( 1, 'Artists' );
  }

  ngOnInit() {
  }

}
