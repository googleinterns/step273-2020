import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { MapComponent } from "./map/map.component";
import { RecommendationComponent } from "./recommendation/recommendation.component";
import { CommonModule } from '@angular/common';

export const routes: Routes = [ 
  { path: '' , 
    component: MapComponent
  },
  { path: 'recommendation' , 
    component: RecommendationComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes )
  ],
  exports: [
    RouterModule,
    routes
  ],
  declarations: [ ]
})
export class AppRoutingModule { }

