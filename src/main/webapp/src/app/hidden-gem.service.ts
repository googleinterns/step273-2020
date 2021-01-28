import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { HiddenGem } from './hidden-gem';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HiddenGemService {
  constructor(private httpClient: HttpClient) { }

  getAllHiddenGems() : Observable<HiddenGem[]> {
    return this.httpClient
      .get<HiddenGem[]>('/hiddengems')
      .pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    return throwError('A data error occured, please try again.');
  }

  // TODO: MVP - params with user preference data from form to be used in request.
  // TODO: MVP - convert back to a httpClient.post request
  findHiddenGemRecommendation(data: any) : Observable<HiddenGem[]> {
    const params = new HttpParams().append("preferences", data);
    return this.httpClient
      .get<HiddenGem[]>('/recommendation', {params})
      .pipe(catchError(this.handleError))
  }
  
}
