import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RankingListComponent } from './ranking/ranking-list/ranking-list.component';
import { RankingItemComponent } from './ranking/ranking-item/ranking-item.component';

@NgModule({
  declarations: [
    AppComponent,
    RankingListComponent,
    RankingItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
