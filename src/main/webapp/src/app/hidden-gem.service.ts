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


  findHiddenGemReccomendation(data: any) : Observable<HiddenGem[]> {
    const params = new HttpParams().append("preferences", data);
    return this.httpClient
      .get<HiddenGem[]>('/recommendation', {params})
      .pipe(catchError(this.handleError))
  }
  
  private top3gems = new Subject<HiddenGem[]>();
  top3gems$ = this.top3gems.asObservable();

  updateTop3Gems(gems: any){
    this.top3gems.next(gems)
  }
}

