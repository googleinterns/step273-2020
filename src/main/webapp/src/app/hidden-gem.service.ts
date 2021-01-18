import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HiddenGemService {
  constructor(private httpClient: HttpClient) { }

  getAllHiddenGems() {
    return this.httpClient.get<HiddenGemsResponse>('/hiddengems', {
      responseType: 'json'
    })
      .pipe(
        map((response: HiddenGemsResponse) => {return response.hiddenGems})
      )
  }
}

export interface HiddenGem {
  id: number;
  name: string;
  business_type: string;
  address: string;
  price_level: number;
  rating: number;
  photo: string;
}

interface HiddenGemsResponse {
  hiddenGems: HiddenGem[];
}
