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
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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
 * This is a temporary class. Everything will be be moved to the HiddenGems.java
 * file when there will be no more need for the hidden gems dummy data.
 */
public final class Places {
  private static final double hiddenGemsRating = 3.5;
  private static final int hiddenGemsNumberOfRatingsMin = 10;
  private static final int hiddenGemsNumberOfRatingsMax = 50;

  // TODO: Replace hardcoded location with user's location for MVP.
  static LatLng location = new LatLng(-33.865143, 151.209900);
  static Set<PlacesSearchResult> hiddenGems = new HashSet<>();

  public static Set<PlacesSearchResult[]> getAllPlaces() {
    GeoApiContext context = new GeoApiContext.Builder()
    .apiKey(GetConfigProperties.getApiKey())
    .build();
    
    return fetchAllPlacesFromApi(context);
  }

  /**
   * This function return all places (restaurants and cafes) near the given location.
   * @return Set<PlacesSearchResult[]> This return a set of a list of Places Search Results.
   */
  public static Set<PlacesSearchResult[]> fetchAllPlacesFromApi(GeoApiContext context) {
    PlacesSearchResponse restaurant_results = new PlacesSearchResponse();
    PlacesSearchResponse cafes_results = new PlacesSearchResponse();
    String restaurantNextPageToken = "";
    String cafeNextPageToken = "";

    // A set is used to avoid duplicates. 
    Set<PlacesSearchResult[]> all_results = new HashSet<>();

    // Places API allows up to 3 pages of results (each page having a max of 20 results)
    for (int i = 0; i < 3; i++) {

      // If the tokens are null, there are no more pages of results.
      if (restaurantNextPageToken == null && cafeNextPageToken == null)
        break;

      try {
        if (restaurantNextPageToken != null) {
          restaurant_results = PlacesApi.nearbySearchQuery(context, location)
            .rankby(RankBy.DISTANCE)
            .type(PlaceType.RESTAURANT)
            .pageToken(restaurantNextPageToken)
            .await();
        }

        if (cafeNextPageToken != null) {
          cafes_results = PlacesApi.nearbySearchQuery(context, location)
            .rankby(RankBy.DISTANCE)
            .type(PlaceType.CAFE)
            .pageToken(cafeNextPageToken)
            .await();
        }

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

  public static Set<PlacesSearchResult> getAllHiddenGems(Set<PlacesSearchResult[]> all_places) {
    hiddenGems = flatten(all_places)
      .filter(x -> 
        x.rating >= hiddenGemsRating && x.userRatingsTotal >= hiddenGemsNumberOfRatingsMin
        && x.userRatingsTotal <= hiddenGemsNumberOfRatingsMax)
      .collect(Collectors.toSet());
    
    return hiddenGems;
  }

  public static <T> Stream<PlacesSearchResult> flatten(Set<PlacesSearchResult[]> all_places) {
 
    Stream<PlacesSearchResult> stream = Stream.of();
    for (PlacesSearchResult[] arrayOfPlaces: all_places) {
        stream = Stream.concat(stream, Arrays.stream(arrayOfPlaces));
    }
    return stream;
    }
}
