import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public showFilter: boolean = true;
  constructor(private router: Router) {
    this.router.events.subscribe(
      event => this.routeInterception( event )
    );
  }

  ngOnInit() {}

  routeInterception( event ) {
    this.showFilter = event.url == "/explore" ? true : false;
  }

}
