// Copyright 2019 Google LLC
//
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.data;

import java.io.IOException;
import java.util.ArrayList;
import java.util.concurrent.TimeUnit;

import com.google.maps.GeoApiContext;
import com.google.maps.PlacesApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.LatLng;
import com.google.maps.model.PlaceType;
import com.google.maps.model.PlacesSearchResponse;
import com.google.maps.model.PlacesSearchResult;
import com.google.maps.model.RankBy;
import com.google.sps.GetConfigProperties;

/**
 * This is a temporary class. Everything will be be moved to the HiddenGems.java file
 * when there will be no more need for the hidden gems dummy data.
 */
public final class Places {
  static GeoApiContext context = new GeoApiContext.Builder()
    .apiKey(GetConfigProperties.getApiKey())
    .build();

  // TODO: Replace hardcoded location with user's location.
  static LatLng location = new LatLng(-33.865143, 151.209900);

  /**
   * This function return all places (restaurants and cafes) near the given location. 
   * @return ArrayList<PlacesSearchResult[]>    This return an array list of a list of Places Search Results. 
   */
  public static ArrayList<PlacesSearchResult[]> getAllPlaces() {
    PlacesSearchResponse restaurant_results = new PlacesSearchResponse();
    PlacesSearchResponse cafes_results = new PlacesSearchResponse();
    String restaurantNextPageToken = "";
    String cafeNextPageToken = "";
    ArrayList<PlacesSearchResult[]> all_results = new ArrayList<PlacesSearchResult[]>();

    for (int i = 0; i < 3; i++) {
      try {
        restaurant_results = PlacesApi.nearbySearchQuery(context, location)
          .rankby(RankBy.DISTANCE)
          .type(PlaceType.RESTAURANT)
          .pageToken(restaurantNextPageToken)
          .await();

        cafes_results = PlacesApi.nearbySearchQuery(context, location)
          .rankby(RankBy.DISTANCE)
          .type(PlaceType.CAFE)
          .pageToken(cafeNextPageToken)
          .await();

        // Wait 2 seconds to get the nextPageToken, otherwise there is an INVALID_REQUEST status. 
        TimeUnit.SECONDS.sleep(2);
        restaurantNextPageToken = restaurant_results.nextPageToken;
        cafeNextPageToken = cafes_results.nextPageToken;
      } catch (ApiException | InterruptedException | IOException e) {
        e.printStackTrace();
      }
      all_results.add(restaurant_results.results);
      all_results.add(cafes_results.results);
    }
    return all_results;
  }
}