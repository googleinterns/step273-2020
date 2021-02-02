import { NgModule } from '@angular/core';
import { RecommendationComponent  } from './recommendation/recommendation.component';
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { LocationComponent } from './location/location.component';

export const routes: Routes = [
  { path: '' ,
    component: LocationComponent,
  },
  { path: 'recommendation' ,
    component: RecommendationComponent,
  },
  { path: 'home' ,
    component: HomepageComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes )
  ],
  exports: [
    RouterModule
  ],
  declarations: [ ]
})
export class AppRoutingModule { }
