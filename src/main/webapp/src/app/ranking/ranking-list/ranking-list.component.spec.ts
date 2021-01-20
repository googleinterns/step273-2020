import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RankingListComponent } from './ranking-list.component';
import { HiddenGemService } from '../../hidden-gem.service';


describe('HiddenGemService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [HiddenGemService]
  }));

    it('should be created', () => {
    const service: HiddenGemService = TestBed.get(HiddenGemService);
    expect(service).toBeTruthy();
    });

    it('should have getData function', () => {
    const service: HiddenGemService = TestBed.get(HiddenGemService);
    expect(service.getAllHiddenGems).toBeTruthy();
    });

});
