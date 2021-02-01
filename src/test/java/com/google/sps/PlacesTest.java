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

import java.util.ArrayList;
import java.util.Arrays;

import com.google.maps.model.PlacesSearchResult;
import com.google.sps.data.Places;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public final class PlacesTest {
  private static final double hiddenGemsRating = 3.5;
  private static final int hiddenGemsNumberOfRatingsMin = 10;
  private static final int hiddenGemsNumberOfRatingsMax = 50;

  @Test
  public void getNonEmptyArrayListOfPlaces() {
    ArrayList<PlacesSearchResult[]> places = Places.getAllPlaces();
    assertFalse(places.isEmpty());
  }

  @Test
  public void getUpToSixListsOfPlacesResults() {
    ArrayList<PlacesSearchResult[]> places = Places.getAllPlaces();
    assertTrue(places.size() <= 6);
  }

  @Test 
  public void getDifferentPlacesSearchResults() {
    ArrayList<PlacesSearchResult[]> places = Places.getAllPlaces();
    for (int i = 0; i < places.size() - 1; i++) {
      assertFalse(Arrays.equals(places.get(i), places.get(i + 1)));
    }
  }

  @Test 
  public void getOnlyPlacesWithExpectedRatingAsHiddenGems() {
    ArrayList<PlacesSearchResult> hiddenGems = Places.getAllHiddenGems();
    for (int i = 0; i < hiddenGems.size(); i++) {
      assertTrue(hiddenGems.get(i).rating >= hiddenGemsRating);
    }
  }

  @Test 
  public void getOnlyPlacesWithExpectedNumberOfRatingsAsHiddenGems() {
    ArrayList<PlacesSearchResult> hiddenGems = Places.getAllHiddenGems();
    for (int i = 0; i < hiddenGems.size(); i++) {
      assertTrue(hiddenGems.get(i).userRatingsTotal >= hiddenGemsNumberOfRatingsMin
          && hiddenGems.get(i).userRatingsTotal <= hiddenGemsNumberOfRatingsMax);
    }
  }
  
  @Test 
  public void getNonEmptyArrayOfHiddenGems() {
    ArrayList<PlacesSearchResult> hiddenGems = Places.getAllHiddenGems();
    assertFalse(hiddenGems.isEmpty());
  }
}
