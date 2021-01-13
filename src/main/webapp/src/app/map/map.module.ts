
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing.module';
import { MapComponent } from './map.component';

@NgModule({
   imports: [
     BrowserModule
   ],
   declarations: [
     MapComponent
   ],
   bootstrap: [
     MapComponent
   ]
})
export class MapModule { }



// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }