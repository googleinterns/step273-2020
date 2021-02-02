import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, throwError} from 'rxjs';
import { Location } from './location';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class LocationService {

  private location = new BehaviorSubject<Location>({lat: 0, lng: 0});

  // allows components to access location.
  getLocation = this.location.asObservable();

  constructor(private router: Router) { }

  // store location on client side
  // redirect to homepage component.
  setLocation(userLocation: Location){
    this.location.next(userLocation);
    this.router.navigateByUrl('/home');
  }

}
