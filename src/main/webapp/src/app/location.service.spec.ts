import { TestBed } from '@angular/core/testing';

import { LocationService } from './location.service';
import { Location } from './location';
import { Component } from 'react';
import { Router } from '@angular/router';

describe('LocationService', () => {
  let service: LocationService;
  // let router = {
  //   navigate: jasmine.createSpy('navigateByUrl')
  // };
  let routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocationService,
        { provide: Router, useValue: routerSpy },
        //Router
      ],
    });
    service = TestBed.inject(LocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the default location to Sydney', () => {

    const sydneyLocation: Location = {
      lat: -33.8688,
      lng: 151.2093,
    };

    expect(service.getLocation.subscribe((result) => {
      expect(result.lat).toEqual(sydneyLocation.lat);
      expect(result.lng).toEqual(sydneyLocation.lng);
    }))
  });

  it('should update the user location', () => {

    const userLocation: Location = {
      lat: 12.3456,
      lng: -65.4321,
    };

    service.setLocation(userLocation);

    expect(service.getLocation.subscribe((result) => {
      expect(result).toEqual(userLocation);
    }));

    const [actualPath] = routerSpy.navigateByUrl.calls.first().args;
    expect(actualPath).toEqual('home');

  });
});
