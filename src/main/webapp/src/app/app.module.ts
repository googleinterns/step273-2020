import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RecommendationFormComponent } from './recommendation-form/recommendation-form.component';
import { RecommendationListComponent } from './recommendation-list/recommendation-list.component';
import { RecommendationItemComponent } from './recommendation-item/recommendation-item.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { RankingListComponent } from './ranking/ranking-list/ranking-list.component';
import { RankingItemComponent } from './ranking/ranking-item/ranking-item.component';

@NgModule({
  declarations: [
    AppComponent,
    RecommendationFormComponent,
    RecommendationItemComponent,
    RecommendationListComponent,
    RecommendationComponent,
    RankingListComponent,
    RankingItemComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
