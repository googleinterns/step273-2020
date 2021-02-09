import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { Location } from './location';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  // default location initialised to Sydney.
  private location = new BehaviorSubject<Location>({lat: -33.8688, lng: 151.2093});

  // allows components to access location.
  getLocation = this.location.asObservable();

  constructor(private router: Router, private httpClient: HttpClient) { }

  // store location on client side
  // redirect to homepage component.
  setLocation(userLocation: Location) {
    this.location.next(userLocation);
    this.router.navigateByUrl('home');
  }

  sendLocationToBackend(userLocation: Location) : Observable<Location> {
    return this.httpClient
      .post<Location>('/location', userLocation)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError('A data error occured, please try again.');
  }
}
