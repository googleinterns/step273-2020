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
import java.util.Arrays;
import java.util.List;
import java.util.Set;

import com.google.maps.model.LatLng;
import com.google.maps.model.PlacesSearchResult;
import com.google.sps.data.Places;
import com.google.sps.testData.LocalTestServerContext;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public final class PlacesTest {
  private static final LatLng LOCATION = new LatLng(-33.865143, 151.209900);
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
}
