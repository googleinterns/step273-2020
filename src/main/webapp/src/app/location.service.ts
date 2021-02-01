import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, throwError} from 'rxjs';
import { Location } from './location';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class LocationService {

  //location = {} as Location;
  //private location = new Subject<Location>();

  //location$ = this.location.asObservable();

  // private showNavBar = new Subject<boolean>();
  // showNavBar$ = this.showNavBar.asObservable();

  private location = new BehaviorSubject<Location>({lat: 0, lng: 0});

  getLocation = this.location.asObservable();

  constructor(private router: Router) { }

  setLocation(userLocation: Location){
    this.location.next(userLocation);
    // this.showNavBar.next(true);
    this.router.navigateByUrl('/home');
  }

}
