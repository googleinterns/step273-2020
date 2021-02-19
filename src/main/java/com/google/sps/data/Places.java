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
import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
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
import com.google.maps.model.PlaceDetails;
import com.google.maps.PlaceDetailsRequest;
import com.google.maps.model.RankBy;
import com.google.sps.GetConfigProperties;

/** Places which are retrieved from the Places API and which are used to filter hidden gems. */
public final class Places {
  private static final double HIDDEN_GEMS_RATINGS_MIN = 3.5;
  private static final int HIDDEN_GEMS_NUMBER_OF_RATINGS_MIN = 10;
  private static final int HIDDEN_GEMS_NUMBER_OF_RATINGS_MAX = 50;
  private static final int NUM_RESULTS_PAGES = 3;
  private static final String BUSINESS_STATUS_OPERATIONAL = "OPERATIONAL";
  private static final String TYPE_RESTAURANT = "restaurant";
  private static final String TYPE_CAFE = "cafe";

  /**
   * This function getAllPlaces retrieved from a Places Search API using the API
   * and the user's location.
   * @return Set<PlacesSearchResult[]> This returns a set of arrays of Places Search Results.
   */
  public static Set<PlacesSearchResult[]> getAllPlaces(LatLng location) {
    GeoApiContext context = new GeoApiContext.Builder()
      .apiKey(GetConfigProperties.getApiKey())
      .build();

    return fetchAllPlacesFromApi(context, location);
  }

  /**
   * This function return all places (restaurants and cafes) near the given
   * location.
   * @param context                    The GeoApiContext to be used for the Nearby Search Query.
   * @param location                   The location to be used for the Nearby Search Query.
   * @return Set<PlacesSearchResult[]> This return a set of arrays of Places
   *                                   Search Results.
   */
  public static Set<PlacesSearchResult[]> fetchAllPlacesFromApi(GeoApiContext context, LatLng location) {
    PlacesSearchResponse restaurant_results = new PlacesSearchResponse();
    PlacesSearchResponse cafes_results = new PlacesSearchResponse();
    String restaurantNextPageToken = "";
    String cafeNextPageToken = "";

    // A set is used to avoid duplicates. 
    Set<PlacesSearchResult[]> all_results = new HashSet<>();

    // Places API allows up to 3 pages of results (each page having a max of 20 results)
    for (int i = 0; i < NUM_RESULTS_PAGES; i++) {

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

   /**
   * This function returns a set of hidden gems and their information given a set of places.
   * @param all_places                  The places search results to be filtered as hidden gems.
   * @return Set<PlacesSearchResult>    This returns a set of Places Search Results, which are the
   *                                    hidden gems and their information.
   */
  public static Set<PlacesSearchResult> getAllHiddenPlaces(Set<PlacesSearchResult[]> all_places) {
    Set<PlacesSearchResult> hiddenGems = new HashSet<>();
    hiddenGems = flatten(all_places)
      .filter(place -> 
        place.rating >= HIDDEN_GEMS_RATINGS_MIN 
        && place.userRatingsTotal >= HIDDEN_GEMS_NUMBER_OF_RATINGS_MIN
        && place.userRatingsTotal <= HIDDEN_GEMS_NUMBER_OF_RATINGS_MAX
        && place.businessStatus.equals(BUSINESS_STATUS_OPERATIONAL)
        && (
          (place.types[0].equals(TYPE_CAFE) || place.types[0].equals(TYPE_RESTAURANT))
          || (place.types[1].equals(TYPE_CAFE) || place.types[1].equals(TYPE_RESTAURANT))
        )
      )
      .collect(Collectors.toSet());
    
    return hiddenGems;
  }

   /**
   * This function flattens a given set of arrays of places search results.
   * @param <T>                           This is a generic method.
   * @param all_places                    This is a set of arrays of PlacesSearchResult to be flatten.
   * @return Stream<PlacesSearchResult>   This return a flatten stream of PlacesSearchResult.
   */
  public static <T> Stream<PlacesSearchResult> flatten(Set<PlacesSearchResult[]> all_places) {
    Stream<PlacesSearchResult> stream = Stream.of();
    for (PlacesSearchResult[] arrayOfPlaces: all_places) {
      stream = Stream.concat(stream, Arrays.stream(arrayOfPlaces));
    }
    return stream;
  }

  /**
   * This function getHiddenGems converts the Set<PlaceSearchResult> of hidden places
   * to the type Set<HiddenGem> of hidden gems. It finds additional relevant
   * information on the hidden gems using the Place's API.
   * @param places           The Set of PlaceSearchResults of hidden gems to be converted.
   * @return Set<HiddenGem>  This returns a set of Hidden Gems.
   */
  public static Set<HiddenGem> convertToHiddenGems(Set<PlacesSearchResult> places) {
    GeoApiContext context = new GeoApiContext.Builder()
      .apiKey(GetConfigProperties.getApiKey())
      .build();

    return fetchHiddenGemsFromApi(context, places);
  }

  /**
   * This converts a set of places into a set of hidden gems. 
   * Iterate over the set of places and find the additional details, then create
   * the hidden gem object by populating all the relevant data in the constructor.
   * @param context           The GeoApiContext to be used for the Place Details Request
   * @param places            The set of PlaceSearch results to be converted.
   * @return Set<HiddenGem>   This returns a set of Hidden Gems with all information populated
   *                          from the place search and place details results. 
   */
  public static Set<HiddenGem> fetchHiddenGemsFromApi(GeoApiContext context, Set<PlacesSearchResult> places) {

    Set<HiddenGem> hiddenGems = new HashSet<>();

    for(PlacesSearchResult place : places){
      try {
        PlaceDetails placeDetails = PlacesApi.placeDetails(context, place.placeId)
        .fields(
            PlaceDetailsRequest.FieldMask.FORMATTED_ADDRESS,
            PlaceDetailsRequest.FieldMask.PRICE_LEVEL,
            PlaceDetailsRequest.FieldMask.WEBSITE)
        .await();

        hiddenGems.add(new HiddenGem(place, placeDetails));

      } catch (ApiException | InterruptedException | IOException e) {
        e.printStackTrace(); 
      }  
    }  
    return hiddenGems;
  }

  /**
   * This function returns the hidden gems ranked by rating (descending order)
   * @param hiddenGems             This takes as parameter the set of hiddenGems to be sorted. 
   * @return List<HiddenGem>       This returns an List of the hidden gems ranked by rating.
   */
  public static List<HiddenGem> getRankedHiddenGems(Set<HiddenGem> hiddenGems) {
    // List of ranked hidden gems (switch to List to keep the ordering)
    List<HiddenGem> sortedHiddenGems = removeDuplicates(hiddenGems);
    Collections.sort(sortedHiddenGems, new Comparator<HiddenGem>() {
      @Override
      public int compare(HiddenGem hiddenGem_1, HiddenGem hiddenGem_2) {
        return Float.compare(hiddenGem_2.rating, hiddenGem_1.rating);
      }
    });
    return sortedHiddenGems;
  }

  /**
   * This function returns the list of hidden gems without the duplicates.
   * @param hiddenGems                 This takes as parameter the set of hidden gems to be filtered.
   * @return List<HiddenGem>  This return a list of hidden gems without the duplicates.
   */
  public static List<HiddenGem> removeDuplicates(Set<HiddenGem> hiddenGems) {
    Map<String, HiddenGem> distinctHiddenGemsMap = 
    hiddenGems.stream().collect(Collectors.toMap(hiddenGem -> hiddenGem.placeId, hiddenGem -> hiddenGem, (oldValue, newValue) -> newValue));

    List<HiddenGem> distinctHiddenGems = new ArrayList<HiddenGem>(distinctHiddenGemsMap.values());
    return distinctHiddenGems;
  }
}
