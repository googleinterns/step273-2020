import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RecommendationFormComponent } from './recommendation-form/recommendation-form.component';
import { RankingListComponent } from './ranking/ranking-list/ranking-list.component';
import { RankingItemComponent } from './ranking/ranking-item/ranking-item.component';


@NgModule({
  declarations: [
    AppComponent,
    RecommendationFormComponent,
    RankingListComponent,
    RankingItemComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
