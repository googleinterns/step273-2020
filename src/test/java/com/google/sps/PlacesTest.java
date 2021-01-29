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

import java.util.ArrayList;

import com.google.maps.model.PlacesSearchResult;
import com.google.sps.data.Places;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public final class PlacesTest {
  /**
   * TODO: Test: 
   * - Successful: every PlacesSearchResults[] are different 
   * - Unsuccessful: duplicate PlacesSearchResults[] - Unsuccessful:
   */

  @Test
  public void getNonEmptyArrayListOfPlaces() {
    ArrayList<PlacesSearchResult[]> actual = Places.getAllPlaces();
    assertFalse(actual.isEmpty());
  }
}