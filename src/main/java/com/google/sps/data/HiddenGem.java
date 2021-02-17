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
import com.google.maps.model.OpeningHours;
import com.google.maps.model.PlacesSearchResult;
import com.google.maps.model.PlaceDetails;

/** Hidden Gems are restaurants or cafes in Australia which have 10-50 reviews and a rating of at least 3.5/5. */
public final class HiddenGem {

  public final String placeId;
  public final String name;
  public final String[] types;
  public final String address;
  public final double lat;
  public final double lng;
  public final String priceLevel;
  public final float rating;
  public final int userRatingsTotal;
  public final URL website;
  public final OpeningHours openingHours;
  public final String photoReference;
  public final String[] htmlAttributions;
  public final boolean permanentlyClosed;
  public final String businessStatus;

  /** Create a new Hidden Gem. 
   *  @param id                the id the of the hidden gem.
   *  @param name              the name of the hidden gem.
   *  @param types             the business types of the hidden gem, e.g. restaurant or cafe.
   *  @param address           the address of the hidden gem.
   *  @param lat               the latitude of the hidden gem's location.
   *  @param lng               the longitude of the hidden gem's location.
   *  @param priceLevel       the price range of the hidden gem. From 0 (free) to 4 (very expensive).
   *  @param rating            the google star rating of the hidden gem. From 1 (poor rating) to 5 (excellent rating).
   *  @param userRatingsTotal  the total number of ratings provided by user's.
   *  @param website           the website of the hidden gem.
   *  @param openingHours      the hours when the hidden gem is open now.
   *  @param photoReference    the photo url of the hidden gem.
   *  @param htmlAttributions  the attributions about the hidden gem which must be displayed to the user.
   *  @param permanentlyClosed the state is true if the hidden gem has permanently closed.
   *  @param businessStatus    the current status of the hidden gem   
  */
  public HiddenGem(String placeId, String name, String[] types, String address, double lat, 
    double lng, String priceLevel, float rating, int userRatingsTotal, URL website, OpeningHours openingHours, 
    String photoReference, String[] htmlAttributions, boolean permanentlyClosed, String businessStatus) {

      this.placeId = placeId;
      this.name = name;
      this.types = types;
      this.address = address;
      this.lat = lat;
      this.lng = lng;
      this.priceLevel = priceLevel;
      this.rating = rating;
      this.userRatingsTotal = userRatingsTotal;
      this.website = website;
      this.openingHours = openingHours;
      this.photoReference = photoReference;
      this.htmlAttributions = htmlAttributions;
      this.permanentlyClosed = permanentlyClosed;
      this.businessStatus = businessStatus;    
  }

  public HiddenGem(PlacesSearchResult place, PlaceDetails details) {
    this.placeId = place.placeId;
    this.name = place.name;
    this.types = place.types;
    this.address = details.formattedAddress;
    this.lat = place.geometry.location.lat;
    this.lng = place.geometry.location.lng;
    this.priceLevel = String.valueOf(details.priceLevel);
    this.rating = place.rating;
    this.userRatingsTotal = place.userRatingsTotal;
    this.website = details.website;
    this.openingHours = place.openingHours;
    this.photoReference = place.photos[0].photoReference;
    this.htmlAttributions = place.photos[0].htmlAttributions;
    this.permanentlyClosed = place.permanentlyClosed;
    this.businessStatus = place.businessStatus;

  }

}


