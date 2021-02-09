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

package com.google.sps.data;

/** Location coordinates of a place. */
public final class Location {
  public final double lat;
  public final double lng;

  /**
   * Location of a place.
   * @param lat   The latitude coordinate of the place.
   * @param lng   The longitude coordinate of the place.
   */
  public Location(double lat, double lng) {
    this.lat = lat;
    this.lng = lng;
  }
}
