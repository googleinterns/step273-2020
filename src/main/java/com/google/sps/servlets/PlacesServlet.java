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
import com.google.maps.GeoApiContext;
import com.google.maps.PlacesApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.LatLng;
import com.google.maps.model.PlaceType;
import com.google.maps.model.PlacesSearchResponse;
import com.google.maps.model.RankBy;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that return the hidden gems dummy data. */
@WebServlet("/places")
public class PlacesServlet extends HttpServlet {
  private final int radius = 10000;

  GeoApiContext context = new GeoApiContext.Builder()
    .apiKey("myapikey")
    .build();

  LatLng location = new LatLng(-33.865143, 151.209900);

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    PlacesSearchResponse restaurant_results = new PlacesSearchResponse();
    try {
      restaurant_results = PlacesApi.nearbySearchQuery(context, location)
        .radius(radius)
        .rankby(RankBy.PROMINENCE)
        .type(PlaceType.RESTAURANT)
        .await();
    } catch (ApiException | InterruptedException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }

    PlacesSearchResponse cafes_results = new PlacesSearchResponse();
    try {
      cafes_results = PlacesApi.nearbySearchQuery(context, location)
        .radius(radius)
        .rankby(RankBy.PROMINENCE)
        .type(PlaceType.CAFE)
        .await();
    } catch (ApiException | InterruptedException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }

    Gson gson = new Gson();
    String jsonResponse = gson.toJson(restaurant_results);
    jsonResponse = jsonResponse.concat(gson.toJson(cafes_results));

    // Send the JSON back as the response
    response.setContentType("application/json");
    response.getWriter().println(jsonResponse);
  }
}
