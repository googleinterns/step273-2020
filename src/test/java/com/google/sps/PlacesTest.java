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

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Set;

import com.google.maps.model.PlacesSearchResult;
import com.google.sps.data.Places;
import com.google.sps.testData.LocalTestServerContext;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public final class PlacesTest {
  @Test
  public void getNonEmptyArrayListOfPlaces() throws FileNotFoundException, IOException {
    try (LocalTestServerContext sc = new LocalTestServerContext("{\"status\" : \"OK\"}")) {
      Set<PlacesSearchResult[]> places = Places.fetchAllPlacesFromApi(sc.context);
      assertFalse(places.isEmpty());
    }
  }

  @Test
  public void getUpToSixListsOfPlacesResults() throws FileNotFoundException, IOException {
    try (LocalTestServerContext sc = new LocalTestServerContext("{\"status\" : \"OK\"}")) {
      Set<PlacesSearchResult[]> places = Places.fetchAllPlacesFromApi(sc.context);
      assertTrue(places.size() <= 6);
    }
  }
}
