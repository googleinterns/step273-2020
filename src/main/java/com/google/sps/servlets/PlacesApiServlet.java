/*
 * Copyright 2014 Google Inc. All rights reserved.
 *
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

package com.google.sps.servlets;

import com.google.sps.data.LatLng;

/**
 * Performs a nearby search for places. The Google Places API enables you to get data from the same
 * database used by Google Maps and Google+ Local.
 *
 * See also https://developers.google.com/places/web-service/ for more information.
 */

public class PlacesApiServlet {
  /**
   * Performs a search for nearby Places.
   *
   * @param context The context on which to make Geo API requests.
   * @param location The latitude/longitude around which to retrieve place information.
   * @return Returns a NearbySearchRequest that can be configured and executed.
   */
  public static NearbySearchRequest nearbySearchQuery(GeoApiContext context, LatLng location) {
    NearbySearchRequest request = new NearbySearchRequest(context);
    request.location(location);
    return request;
  }
 }