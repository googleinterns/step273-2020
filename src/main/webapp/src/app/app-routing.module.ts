import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { MapComponent } from "./map/map.component";
import { CommonModule } from '@angular/common';
  

const routes: Routes = [ 
  { path: 'map' , 
    component: MapComponent,
    outlet: 'popup' }
];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  //exports: [RouterModule]
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
