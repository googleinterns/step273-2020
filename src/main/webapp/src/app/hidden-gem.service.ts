import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
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
}
