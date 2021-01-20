import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HiddenGemService {
  constructor(private httpClient: HttpClient) { }

  getAllHiddenGems() : Observable<HiddenGem[]> {
    return this.httpClient.get<HiddenGem[]>('/hiddengems')
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
