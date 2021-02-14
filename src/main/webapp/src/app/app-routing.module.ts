import { NgModule } from '@angular/core';
import { RecommendationPageComponent  } from './recommendation/recommendation-page/recommendation-page.component';
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { LocationComponent } from './location/location.component';

export const routes: Routes = [
  { path: '' ,
    component: LocationComponent,
  },
  { path: 'recommendation' ,
    component: RecommendationPageComponent,
  },
  { path: 'home' ,
    component: HomepageComponent,
  },
  { path: '**',
    redirectTo: 'home' }
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
