import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class HiddenGemService {
  constructor(private httpClient: HttpClient) { }

  getAllHiddenGems() : Observable<HiddenGem[]> {
    return this.httpClient.get<HiddenGem[]>('/hiddengems')
  }

  findHiddenGemReccomendation(data: any) : Observable<HiddenGem[]> {
    return this.httpClient.post<HiddenGem[]>('/recommendation', data)
  }
  
  private top3gems = new Subject<HiddenGem[]>();
  top3gems$ = this.top3gems.asObservable();

  updateTop3Gems(gems: any){
    this.top3gems.next(gems)
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
