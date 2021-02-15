// Copyright 2019 Google LLC
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

package com.google.sps;

import static com.google.sps.TestUtils.retrieveBody;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.IOException;
import java.util.Set;
import java.util.Arrays;
import java.util.List;

import com.google.maps.model.LatLng;
import com.google.maps.model.PlacesSearchResult;
import com.google.sps.data.Places;
import com.google.sps.testData.LocalTestServerContext;
import com.google.sps.data.HiddenGem;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public final class PlacesTest {
  private static final LatLng LOCATION = new LatLng(-33.865143, 151.209900);
  private static final double HIDDEN_GEMS_RATINGS_MIN = 3.5;
  private static final int HIDDEN_GEMS_NUMBER_OF_RATINGS_MIN = 10;
  private static final int HIDDEN_GEMS_NUMBER_OF_RATINGS_MAX = 50;
  private static final String BUSINESS_STATUS_OPERATIONAL = "OPERATIONAL";
  private final String AllPlacesApiNearbySearchRequest;

  public PlacesTest() {
    AllPlacesApiNearbySearchRequest = retrieveBody("AllPlacesApiNearbySearchRequestResponse.json");
  }

  @Test
  public void getSixArraysOfPlacesSearchResults() throws Exception {
    try (LocalTestServerContext server  = new LocalTestServerContext(AllPlacesApiNearbySearchRequest)) {
      Set<PlacesSearchResult[]> places = Places.fetchAllPlacesFromApi(server.context, LOCATION);
      assertEquals(6, places.size());
    }
  }

  @Test
  public void getOnlyRestaurantsAndCafes() throws IOException {
    try (LocalTestServerContext server  = new LocalTestServerContext(AllPlacesApiNearbySearchRequest)) {
      Set<PlacesSearchResult[]> places = Places.fetchAllPlacesFromApi(server.context, LOCATION);
      for (PlacesSearchResult[] arrayOfPlaces : places) {
        for (int i = 0; i < arrayOfPlaces.length; i++) {
          List<String> types = Arrays.asList(arrayOfPlaces[i].types);	
          assertTrue(types.contains("restaurant") || types.contains("cafe"));
        }
      }
    }
  }

  @Test 
  public void getOnlyPlacesWithExpectedRatingAsHiddenGems() throws IOException {
    try (LocalTestServerContext server  = new LocalTestServerContext(AllPlacesApiNearbySearchRequest)) {
      Set<PlacesSearchResult> hiddenGems = Places.getAllHiddenPlaces(Places.fetchAllPlacesFromApi(server .context, LOCATION));
      for (PlacesSearchResult hiddenGem : hiddenGems) {
        assertTrue(hiddenGem.rating >= HIDDEN_GEMS_RATINGS_MIN);
      }
    }
  }

  @Test 
  public void getOnlyPlacesWithExpectedNumberOfRatingsAsHiddenGems() throws IOException {
    try (LocalTestServerContext server = new LocalTestServerContext(AllPlacesApiNearbySearchRequest)) {
      Set<PlacesSearchResult> hiddenGems = Places.getAllHiddenPlaces(Places.fetchAllPlacesFromApi(server.context, LOCATION));
      for (PlacesSearchResult hiddenGem : hiddenGems) {
        assertTrue(hiddenGem.userRatingsTotal >= HIDDEN_GEMS_NUMBER_OF_RATINGS_MIN
          && hiddenGem.userRatingsTotal <= HIDDEN_GEMS_NUMBER_OF_RATINGS_MAX);
      }
    }
  }

  @Test 
  public void getOnlyPlacesWithExpectedBusinessStatusAsHiddenGems() throws IOException {
    try (LocalTestServerContext sc = new LocalTestServerContext(AllPlacesApiNearbySearchRequest)) {
      Set<PlacesSearchResult> hiddenGems = Places.getAllHiddenPlaces(Places.fetchAllPlacesFromApi(sc.context, LOCATION));
      for (PlacesSearchResult hiddenGem : hiddenGems) {
        assertEquals(BUSINESS_STATUS_OPERATIONAL, hiddenGem.businessStatus);
      }
    }
  }

  @Test 
  public void getRankedHiddenGemsBasedOnRatings() throws IOException {
    try (LocalTestServerContext server = new LocalTestServerContext(AllPlacesApiNearbySearchRequest)) {
      
      // fetch restaurants/cafes using location.  
      Set<PlacesSearchResult[]> placesApi = Places.fetchAllPlacesFromApi(server.context, LOCATION);

      // filter set down with hidden gem criteria = 10-50 reviews and rating > 3.5
      Set<PlacesSearchResult> hiddenPlaces = Places.getAllHiddenPlaces(placesApi);

      // convert place search result to type hidden gem and fetch additional info.
      Set<HiddenGem> hiddenGems  = Places.fetchHiddenGemsFromApi(server.context, hiddenPlaces);

      // rank list by descending rating.
      List<HiddenGem> rankedHiddenGems = Places.getRankedHiddenGems(hiddenGems); 

      for (int i = 0; i < rankedHiddenGems.size()-1; i++) {
        assertTrue(rankedHiddenGems.get(i).rating >= rankedHiddenGems.get(i + 1).rating);
      }
    }
  }

  // TODO: add in a test that checks the fetchHiddenGemsFromApi function
  // correctly converts a PlaceSearchResult into a Hidden Gem object, after demo.
  // @Test 
  // public void getSetOfHiddenGemType() throws IOException {
}
