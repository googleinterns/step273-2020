import { HiddenGemService } from "./hidden-gem.service";
import { HiddenGem } from './models/hidden-gem';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { fakeAsync } from '@angular/core/testing';

const LOCATION = { lat: -33.8688, lng: 151.2093 };

describe('HiddenGemService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let hiddenGemService: HiddenGemService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    hiddenGemService = new HiddenGemService(httpClientSpy as any);
  });

  it('should return expected hidden gems (HttpClient called once)', () => {
    const expectedHiddenGems: HiddenGem[] =
      [
        {
          lat: -33.8655823,
          lng: 151.2078192,
          name: 'Fratelli Fresh',
          placeId: '1',
          rating: 3.6,
          types: ['restaurant'],
          openingHours: {openNow: true},
          photoReference: 'photoReference',
          htmlAttributions: ["htmlAttributions"],
          address: 'ICC Sydney, tenancy 2/14 Darling Dr, Sydney NSW 2000',
          permanentlyClosed: false,
          userRatingsTotal: 30,
          businessStatus: '',
          priceLevel: '2',
          matchScore: 0,
          website: ''
        },
        {
          lat: -33.8655823,
          lng: 151.2078192,
          name: 'Cafe Sydney',
          placeId: '2',
          rating: 4.5,
          types: ['cafe'],
          openingHours: {openNow: true},
          photoReference: 'photoReference',
          htmlAttributions: ["htmlAttributions"],
          address: '31 Alfred St, Sydney NSW 2000',
          permanentlyClosed: false,
          userRatingsTotal: 30,
          businessStatus: '',
          priceLevel: '2',
          matchScore: 0,
          website: ''
        }
      ];

    httpClientSpy.get.and.returnValue(of(expectedHiddenGems));

    hiddenGemService.getRankedHiddenGems(LOCATION).subscribe(
      hiddenGems => expect(hiddenGems).toEqual(expectedHiddenGems, 'expected hidden gems'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return an error when the server returns a 404', fakeAsync((done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(of(errorResponse));

    hiddenGemService.getRankedHiddenGems(LOCATION).subscribe(
      {
        error: error => {
          expect(error).toEqual({ error: 'A data error occured, please try again.' });
          done();
      }}
    );
  }));

  it('should return an empty list if there are no hidden gems (HttpClient called once)', () => {
    httpClientSpy.get.and.returnValue(of([]));
    hiddenGemService.getRankedHiddenGems(LOCATION).subscribe(
      hiddenGems => expect(hiddenGems).toEqual([], 'expected hidden gems'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  })
})
