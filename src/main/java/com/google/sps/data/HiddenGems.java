// Copyright 2019 Google LLC
//
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

public final class HiddenGems {
  private static final String TYPE_RESTAURANT = "restaurant";
  private static final String TYPE_CAFE = "cafe";
  private static final String PHOTO_PIZZA = "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg";
  private static final String PHOTO_CHICKEN = "https://cdn.pixabay.com/photo/2015/09/02/12/43/meal-918639_960_720.jpg";
  private static final String PHOTO_SUSHI = "https://cdn.pixabay.com/photo/2018/08/03/08/33/food-3581341_960_720.jpg";
  private static final String PHOTO_BREAKFAST = "https://cdn.pixabay.com/photo/2016/11/18/14/39/beans-1834984_960_720.jpg";
  
  public static final HiddenGem[] hiddenGems = {
    new HiddenGem(1, "Thomas St. Kitchen & Bar", TYPE_RESTAURANT, "169-179 Thomas St, Sydney NSW 2000", 1, 4.2,
      PHOTO_CHICKEN),
    new HiddenGem(2, "Fratelli Fresh", TYPE_RESTAURANT, "ICC Sydney, tenancy 2/14 Darling Dr, Sydney NSW 2000", 2,
      3.6, PHOTO_PIZZA),
    new HiddenGem(3, "Kana Sushi Leichhardt", TYPE_RESTAURANT, "53-57 Norton St, Leichhardt NSW 2040", 1, 5.0,
      PHOTO_SUSHI),
    new HiddenGem(4, "Toast Cafe", TYPE_CAFE, "45 Reservoir St, Surry Hills NSW 2010", 2, 4.3, PHOTO_BREAKFAST),
    new HiddenGem(5, "Bellagio Cafe.", TYPE_CAFE, "285 Bronte Rd, Waverley NSW 2024", 2, 4.3, PHOTO_BREAKFAST),
    new HiddenGem(6, "Ladies & Gentlemen Cafe Diner", TYPE_CAFE, "295 Enmore Rd, Marrickville NSW 2204", 3, 4.9,
      PHOTO_PIZZA),
    new HiddenGem(7, "Cafe Sydney", TYPE_CAFE, "31 Alfred St, Sydney NSW 2000", 4, 4.5, PHOTO_CHICKEN),
    new HiddenGem(8, "Tany's Japanese Restauran", TYPE_RESTAURANT, "92 Redfern St, Redfern NSW 2016", 2, 4.4,
      PHOTO_SUSHI),
    new HiddenGem(9, "Mazzaro Restaurant", TYPE_RESTAURANT, "271-279 Elizabeth St, Sydney NSW 2000", 2, 4.4,
      PHOTO_PIZZA),
    new HiddenGem(10, "Friendly Cafe", TYPE_CAFE, "319 Balmain Rd, Lilyfield NSW 2040", 1, 4.9, PHOTO_BREAKFAST),
  };
}
