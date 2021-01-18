import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecommendationFormComponent  } from './recommendation-form/recommendation-form.component'

const routes: Routes = [
  { path: 'recommendation-form', component: RecommendationFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
