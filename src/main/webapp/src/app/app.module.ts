import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecommendationFormComponent } from './recommendation-form/recommendation-form.component';
import { RecommendationListComponent } from './recommendation-list/recommendation-list.component';
import { RecommendationItemComponent } from './recommendation-item/recommendation-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ReactiveFormsModule,
    RecommendationFormComponent,
    RecommendationListComponent,
    RecommendationItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
