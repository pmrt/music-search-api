import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MusicSearchService } from './music-search.service';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { PresearchComponent } from './presearch/presearch.component';
import { FinderComponent } from './finder/finder.component';
import { DetailsComponent } from './details/details.component';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const appRouters: Routes = [
          { path: '', redirectTo: '/explore', pathMatch: 'full'},
          { path: 'explore', component: SearchComponent},
          { path: 'artist/:name', component: SearchComponent },
          { path: 'artist/:id/details', component: DetailsComponent}
      ]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    PresearchComponent,
    FinderComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot( appRouters )
  ],
  providers: [MusicSearchService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
