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

const appRouters: Routes = [
          { path: '', redirectTo: '/explore', pathMatch: 'full'},
          { path: 'explore', component: SearchComponent},
          { path: 'artist/:name', component: SearchComponent }
      ]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    PresearchComponent,
    FinderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot( appRouters )
  ],
  providers: [MusicSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
