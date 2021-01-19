import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppComponent } from './app/app.component';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  exports: [
    MatTabsModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { 
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
  
  }

}

