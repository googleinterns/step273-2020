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

import java.net.URL;
import com.google.maps.model.PriceLevel;
import com.google.maps.model.OpeningHours;

/** Hidden Gems are restaurants or cafes in Australia which have 10-50 reviews and a rating of at least 3.5/5. */
public final class HiddenGem {

  private final String placeId;
  public final String name;
  public final String[] types;
  public final String address;
  public final double lat;
  public final double lng;
  public final String price_level;
  public final float rating;
  public final int userRatingsTotal;
  public final URL website;
  public final OpeningHours openingHours;
  public final String photoReference;
  public final String[] htmlAttributions;
  public final boolean permanentlyClosed;
  public final String businessStatus;

  /** Create a new Hidden Gem. 
   *  @param id             the id the of the hidden gem.
   *  @param name           the name of the hidden gem.
   *  @param types  the business type of the hidden gem, either restaurant or cafe.
   *  @param address        the address of the hidden gem.
   *  @param lat  
   *  @param lng        
   *  @param price_level    the price range of the hidden gem. From 0 (free) to 4 (very expensive).
   *  @param rating         the google star rating of the hidden gem. From 1 (poor rating) to 5 (excellent rating).
   *  @param userRatingsTotal
   *  @param website
   *  @param openingHours
   *  @param photoReference the photo url of the hidden gem.
   *  @param htmlAttributions
   *  @param permanentlyClosed
   *  @param businessStatus     
  */
  public HiddenGem(String placeId, String name, String[] types, String address, double lat, 
    double lng, String price_level, float rating, int userRatingsTotal, URL website, OpeningHours openingHours, 
    String photoReference, String[] htmlAttributions, boolean permanentlyClosed, String businessStatus) {

      this.placeId = placeId;
      this.name = name;
      this.types = types;
      this.address = address;
      this.lat = lat;
      this.lng = lng;
      this.price_level = price_level;
      this.rating = rating;
      this.userRatingsTotal = userRatingsTotal;
      this.website = website;
      this.openingHours = openingHours;
      this.photoReference = photoReference;
      this.htmlAttributions = htmlAttributions;
      this.permanentlyClosed = permanentlyClosed;
      this.businessStatus = businessStatus;    
  }
}
