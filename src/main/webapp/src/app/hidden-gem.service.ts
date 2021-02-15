import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HiddenGem } from './models/hidden-gem';
import { catchError } from 'rxjs/operators';
import { Location } from './models/location';

@Injectable({
  providedIn: 'root'
})

export class HiddenGemService {
  constructor(private httpClient: HttpClient) { }

  getRankedHiddenGems(location: Location): Observable<HiddenGem[]> {
    const lat = location.lat;
    const lng = location.lng;
    const params = new HttpParams()
      .set('lat', lat.toString())
      .set('lng', lng.toString());

    return this.httpClient
      .get<HiddenGem[]>('/ranked-hidden-gems', {params})
      .pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    return throwError('A data error occured, please try again.');
  }
}
