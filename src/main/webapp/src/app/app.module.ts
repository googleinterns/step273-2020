import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RecommendationFormComponent } from './recommendation-form/recommendation-form.component';
import { RecommendationListComponent } from './recommendation-list/recommendation-list.component';
import { RecommendationItemComponent } from './recommendation-item/recommendation-item.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { RankingListComponent } from './ranking/ranking-list/ranking-list.component';
import { RankingItemComponent } from './ranking/ranking-item/ranking-item.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    RecommendationFormComponent,
    RecommendationItemComponent,
    RecommendationListComponent,
    MapComponent,
    NavBarComponent,
    RecommendationComponent,
    RankingListComponent,
    RankingItemComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor() {  }
}
