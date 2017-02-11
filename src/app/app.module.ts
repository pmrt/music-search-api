import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MusicSearchService } from './shared/music-search.service';
import { FilterService } from './shared/filter.service';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { PresearchComponent } from './presearch/presearch.component';
import { FinderComponent } from './finder/finder.component';
import { DetailsComponent } from './details/details.component';

import { PopularityPipe } from './pipes/popularity.pipe';
import { NamePipe } from './pipes/name.pipe';
import { MetaPipe } from './pipes/meta.pipe';
import { DefaultPipe } from './pipes/default.pipe';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FilterComponent } from './filter/filter.component';

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
    DetailsComponent,
    PopularityPipe,
    NamePipe,
    MetaPipe,
    DefaultPipe,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot( appRouters )
  ],
  providers: [
    MusicSearchService,
    FilterService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
