import { HiddenGemService } from "./hidden-gem.service";
import { HiddenGem } from './models/hidden-gem';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { fakeAsync } from '@angular/core/testing';

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
          geometry: {
            location: {lat: -33.8655823, lng: 151.2078192},
            viewport:{
              northeast: {lat: -33.8655823, lng: 151.2078192},
              southwest: {lat: -33.8655823, lng: 151.2078192}
            }
          },
          name: 'Fratelli Fresh',
          icon: '',
          placeId: '1',
          rating: 3.6,
          types: ['restaurant'],
          openingHours: {openNow: true},
          photos: [{
            photoReference: "photoReference",
            height: 0,
            width: 0,
            htmlAttributions: ["htmlAttributions"]
          }],
          vicinity: 'ICC Sydney, tenancy 2/14 Darling Dr, Sydney NSW 2000',
          permanentlyClosed: false,
          userRatingsTotal: 30,
          businessStatus: ''
        },
        {
          geometry: {
            location: {lat: -33.8655823, lng: 151.2078192},
            viewport:{
              northeast: {lat: -33.8655823, lng: 151.2078192},
              southwest: {lat: -33.8655823, lng: 151.2078192}
            }
          },
          name: 'Cafe Sydney',
          icon: '',
          placeId: '2',
          rating: 4.5,
          types: ['cafe'],
          openingHours: {openNow: true},
          photos: [{
            photoReference: "photoReference",
            height: 0,
            width: 0,
            htmlAttributions: ["htmlAttributions"]
          }],
          vicinity: '31 Alfred St, Sydney NSW 2000',
          permanentlyClosed: false,
          userRatingsTotal: 30,
          businessStatus: ''
        }
      ];

    httpClientSpy.get.and.returnValue(of(expectedHiddenGems));

    hiddenGemService.getAllHiddenGems().subscribe(
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

    hiddenGemService.getAllHiddenGems().subscribe(
      {
        error: error => {
          expect(error).toEqual({ error: 'A data error occured, please try again.' });
          done();
      }}
    );
  }));

  it('should return an empty list if there are no hidden gems (HttpClient called once)', () => {
    httpClientSpy.get.and.returnValue(of([]));
    hiddenGemService.getAllHiddenGems().subscribe(
      hiddenGems => expect(hiddenGems).toEqual([], 'expected hidden gems'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  })

  it('should return hidden gem recommendations', () => {

    const expectedTopGems: HiddenGem[] =
      [
        {
          geometry: {
            location: {lat: -33.8655823, lng: 151.2078192},
            viewport:{
              northeast: {lat: -33.8655823, lng: 151.2078192},
              southwest: {lat: -33.8655823, lng: 151.2078192}
            }
          },
          name: 'The best restaurant',
          icon: '',
          placeId: '3',
          rating: 4.5,
          types: ['restaurant'],
          openingHours: {openNow: true},
          photos: [{
            photoReference: "photoReference",
            height: 0,
            width: 0,
            htmlAttributions: ["htmlAttributions"]
          }],
          vicinity: 'An address located within Sydney, Sydney NSW 2000',
          permanentlyClosed: false,
          userRatingsTotal: 30,
          businessStatus: ''
        },
      ];

    httpClientSpy.get.and.returnValue(of(expectedTopGems));

    hiddenGemService.findHiddenGemRecommendation("")
      .subscribe(hiddenGems => {
        expect(hiddenGems).toEqual(expectedTopGems);
    })
    expect(httpClientSpy.get.calls.count()).toBe(1);
  })

  it('should return an error when the recommendation server returns a 404', fakeAsync((done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(of(errorResponse));

    hiddenGemService.findHiddenGemRecommendation("").subscribe(
      {
        error: error => {
          expect(error).toEqual({ error: 'A data error occured, please try again.' });
          done();
      }}
    );
  }));

})
