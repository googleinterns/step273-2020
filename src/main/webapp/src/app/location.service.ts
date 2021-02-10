import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { Location } from './models/location';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  // default location initialised to Sydney.
  private location = new BehaviorSubject<Location>({lat: -33.8688, lng: 151.2093});

  // allows components to access location.
  getLocation = this.location.asObservable();

  constructor(private router: Router) { }

  // store location on client side
  // redirect to homepage component.
  setLocation(userLocation: Location) {
    this.location.next(userLocation);
    this.router.navigateByUrl('home');
  }
}
