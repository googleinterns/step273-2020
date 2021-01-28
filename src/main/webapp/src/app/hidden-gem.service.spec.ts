import { HiddenGemService } from "./hidden-gem.service";
import { HiddenGem } from './hidden-gem';
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
          id: 1,
          name: 'Fratelli Fresh',
          business_type: 'restaurant',
          address: 'ICC Sydney, tenancy 2/14 Darling Dr, Sydney NSW 2000',
          price_level: 2,
          rating: 3.6,
          photo: 'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg'
        },
        {
          id: 2,
          name: 'Cafe Sydney',
          business_type: 'cafe',
          address: '31 Alfred St, Sydney NSW 2000',
          price_level: 4,
          rating: 4.5,
          photo: 'https://cdn.pixabay.com/photo/2015/09/02/12/43/meal-918639_960_720.jpg'
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

  it('should update top 3 gems', () => {

    const expectedTopGems: HiddenGem[] =
      [
        {
          id: 1,
          name: 'The best restaurant',
          business_type: 'Restaurant',
          address: 'An address located within Sydney, Sydney NSW 2000',
          price_level: 3,
          rating: 3,
          photo: 'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg'
        },
      ];

    httpClientSpy.get.and.returnValue(of(expectedTopGems));

    hiddenGemService.findHiddenGemRecommendation("")
      .subscribe(hiddenGems => {
        expect(hiddenGems).toEqual(expectedTopGems);
    })
    expect(httpClientSpy.get.calls.count()).toBe(1);
  })

})
