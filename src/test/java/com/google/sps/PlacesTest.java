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
  private static final double hiddenGemsRating = 3.5;
  private static final int hiddenGemsNumberOfRatingsMin = 10;
  private static final int hiddenGemsNumberOfRatingsMax = 50;
  private final String AllPlacesApiNearbySearchRequest;

  public PlacesTest() {
    AllPlacesApiNearbySearchRequest = retrieveBody("AllPlacesApiNearbySearchRequestResponse.json");
  }

  @Test
  public void getSixArraysOfPlacesSearchResults() throws Exception {
    try (LocalTestServerContext sc = new LocalTestServerContext(AllPlacesApiNearbySearchRequest)) {
      Set<PlacesSearchResult[]> places = Places.fetchAllPlacesFromApi(sc.context, LOCATION);
      assertEquals(6, places.size());
    }
  }

  @Test
  public void getOnlyRestaurantsAndCafes() throws IOException {
    try (LocalTestServerContext sc = new LocalTestServerContext(AllPlacesApiNearbySearchRequest)) {
      Set<PlacesSearchResult[]> places = Places.fetchAllPlacesFromApi(sc.context, LOCATION);
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
    try (LocalTestServerContext sc = new LocalTestServerContext(AllPlacesApiNearbySearchRequest)) {
      Set<PlacesSearchResult> hiddenGems = Places.getAllHiddenGems(Places.fetchAllPlacesFromApi(sc.context, LOCATION));
      for (PlacesSearchResult hiddenGem : hiddenGems) {
        assertTrue(hiddenGem.rating >= hiddenGemsRating);
      }
    }
  }

  @Test 
  public void getOnlyPlacesWithExpectedNumberOfRatingsAsHiddenGems() throws IOException {
    try (LocalTestServerContext sc = new LocalTestServerContext(AllPlacesApiNearbySearchRequest)) {
      Set<PlacesSearchResult> hiddenGems = Places.getAllHiddenGems(Places.fetchAllPlacesFromApi(sc.context, LOCATION));
      for (PlacesSearchResult hiddenGem : hiddenGems) {
        assertTrue(hiddenGem.userRatingsTotal >= hiddenGemsNumberOfRatingsMin
          && hiddenGem.userRatingsTotal <= hiddenGemsNumberOfRatingsMax);
      }
    }
  }

  @Test 
  public void getRankedHiddenGemsBasedOnRatings() throws IOException {
    try (LocalTestServerContext sc = new LocalTestServerContext(AllPlacesApiNearbySearchRequest)) {
      Set<HiddenGem> hiddenGems = Places.convertToHiddenGem(sc.context, Places.getAllHiddenGems(Places.fetchAllPlacesFromApi(sc.context, LOCATION)));
      List<HiddenGem> rankedHiddenGems = Places.getRankedHiddenGems(hiddenGems);
      for (int i = 0; i < rankedHiddenGems.size()-1; i++) {
        assertTrue(rankedHiddenGems.get(i).rating >= rankedHiddenGems.get(i + 1).rating);
      }
    }
  }
}