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
      .get<HiddenGem[]>('/ranking', {params})
      .pipe(catchError(this.handleError))
  }

  // TODO: MVP - params with user preference data from form to be used in request.
  // TODO: MVP - convert back to a httpClient.post request
  findHiddenGemRecommendation(data: any) : Observable<HiddenGem[]> {
    const params = new HttpParams().append("preferences", data);
    return this.httpClient
      .get<HiddenGem[]>('/recommendation', {params})
      .pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    return throwError('A data error occured, please try again.');
  }
}
