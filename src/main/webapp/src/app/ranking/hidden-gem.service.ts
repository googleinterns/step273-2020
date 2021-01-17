import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HiddenGemService {
  private hiddenGemsUrl = '/get-hidden-gems'

  constructor(private http: HttpClient) { }

  // Get Hidden Gems from the server
  getHiddenGems(): Observable<HiddenGem[]> {
  return this.http.get<HiddenGem[]>(this.hiddenGemsUrl);
  }
}
