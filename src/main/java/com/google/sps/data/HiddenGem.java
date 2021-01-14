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

/** An item on a comment section. */
public final class HiddenGem {

  private final int id;
  private final String name;
  private final String business_type;
  private final String address;
  private final int price_level;
  private final double rating;
  private final String photo;

  /** Create a new Hidden Gem. 
   *  @param id             the id the of the hidden gem.
   *  @param name           the name of the hidden gem.
   *  @param business_type  the business type of the hidden gem, either restaurant or cafe.
   *  @param address        the address of the hidden gem.
   *  @param price_level    the price range of the hidden gem. From 0 (free) to 4 (very expensive).
   *  @param rating         the google star rating of the hidden gem. From 1 (poor rating) to 5 (excellent rating).
   *  @param photo          the photo url of the hidden gem.
  */
  public HiddenGem(int id, String name, String business_type, String address, int price_level, double rating, String photo) {
    this.id = id;
    this.name = name;
    this.business_type = business_type;
    this.address = address;
    this.price_level = price_level;
    this.rating = rating;
    this.photo = photo;
  }
}
