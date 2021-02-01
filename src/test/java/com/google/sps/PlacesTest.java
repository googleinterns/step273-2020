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

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.Arrays;
import java.util.List;
import java.util.Set;

import com.google.maps.model.PlacesSearchResult;
import com.google.sps.data.Places;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public final class PlacesTest {
  @Test
  public void getNonEmptyArrayListOfPlaces() {
    Set<PlacesSearchResult[]> places = Places.getAllPlaces();
    assertFalse(places.isEmpty());
  }

  @Test
  public void getUpToSixListsOfPlacesResults() {
    Set<PlacesSearchResult[]> places = Places.getAllPlaces();
    assertTrue(places.size() <= 6);
  }

  @Test 
  public void getOnlyRestaurantsAndCafes() {
    Set<PlacesSearchResult[]> places = Places.getAllPlaces();
    for (PlacesSearchResult[] listOfPlaces : places) {
      for (int i = 0; i < listOfPlaces.length; i++) {
        List<String> types = Arrays.asList(listOfPlaces[i].types);
        assertTrue(types.contains("restaurant") || types.contains("cafe"));
      }
    }
  }
}
