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

package com.google.sps.servlets;


import com.google.gson.Gson;
import com.google.sps.data.Places;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.maps.GeoApiContext;	
import com.google.maps.PlacesApi;	
import com.google.maps.errors.ApiException;	
import com.google.maps.model.LatLng;	
import com.google.maps.model.PlaceType;	
import com.google.maps.model.PlaceDetails;	
import com.google.maps.model.RankBy;	
import com.google.sps.GetConfigProperties;
import com.google.maps.PlacesApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.PlacesSearchResult;
import com.google.maps.model.PriceLevel;
import com.google.maps.PlaceDetailsRequest;
import com.google.maps.PlaceDetailsRequest.FieldMask;
import com.google.maps.model.PlacesSearchResult;
import java.util.Set;

/**
 * This is a temporary servlet to check the responses from Places API.
 * When we won't need the dummy hidden gems data anymore, all code here will be 
 * moved to the GetHiddenGems servlet. 
*/
@WebServlet("/details")
public class PlacesDetailServlet extends HttpServlet {

  GeoApiContext context = new GeoApiContext.Builder()
  .apiKey(GetConfigProperties.getApiKey())
  .build();

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Gson gson = new Gson();
    //String jsonResponse = gson.toJson(Places.getAllHiddenGems(Places.getAllPlaces()));
    //String jsonResponse = gson.toJason("hello")

    // PlaceDetails restaurantDetails = new PlaceDetails();
    String jsonResponse = gson.toJson("boo");
    
    Set<PlacesSearchResult> getAllHiddenGems = Places.getAllHiddenGems(Places.getAllPlaces());
    //System.out.println(getAllHiddenGems);

    for(PlacesSearchResult hiddenGem : getAllHiddenGems){
      try {
        //restaurantDetails = PlacesApi.placeDetails(context, "ChIJWRCjiT-uEmsRuW0JjCuisyw").await();
        PlaceDetails placeDetails = PlacesApi.placeDetails(context, hiddenGem.placeId)
        .fields(
            PlaceDetailsRequest.FieldMask.FORMATTED_ADDRESS,
            PlaceDetailsRequest.FieldMask.PRICE_LEVEL,
            PlaceDetailsRequest.FieldMask.WEBSITE)
        .await();
        jsonResponse = jsonResponse.concat(gson.toJson(placeDetails));
      } catch (ApiException | InterruptedException e) {
        // TODO Auto-generated catch block
        e.printStackTrace();
    }
    }
    //restaurantDetails = PlacesApi.placeDetails(context, "ChIJWRCjiT-uEmsRuW0JjCuisyw").await();

  
    // PlacesApi.nearbySearchQuery(context, location)
    //       .rankby(RankBy.DISTANCE)
    //       .type(PlaceType.RESTAURANT)
    //       .pageToken(restaurantNextPageToken)
    //       .await();


    // Send the JSON back as the response
    response.setContentType("application/json");
    response.getWriter().println(jsonResponse);
  }
}