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

import com.google.sps.data.Places;
import com.google.gson.Gson;
import com.google.maps.model.LatLng;
import com.google.maps.model.PlacesSearchResult;

import java.io.IOException;
import java.util.Set;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.sps.data.HiddenGem;

/** Servlet that return the hidden gems dummy data. */
@WebServlet("/recommendation")
public class GetTop3GemsServlet extends HttpServlet {
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    
    //TODO: For now, a hardcoded location is used. Later on, this servlet will probably be deleted as the filtering
    // based on the user's preferences will probably be done in the frontend. 
    LatLng hardcodedLocation = new LatLng(-33.8688, 151.2093);
    Set<HiddenGem> hiddenGems = Places.getHiddenPlaces(Places.getAllHiddenGems(Places.getAllPlaces(hardcodedLocation)));
    Gson gson = new Gson();
    
    // TODO: replace rankedHiddenGems with the recommendations from user's preference 
    // TODO: remove this servlet.
    String jsonResponse = gson.toJson(Places.getRankedHiddenGems(hiddenGems).subList(0, 3));

    // Send the JSON back as the response
    response.setContentType("application/json");
    response.getWriter().println(jsonResponse);
  }
}
