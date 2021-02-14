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
import com.google.maps.model.LatLng;
import com.google.maps.model.PlacesSearchResult;
import com.google.sps.data.Places;

import java.io.IOException;
import java.util.Set;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.sps.data.HiddenGem;

/** Servlet that returns the hidden gems ranked based on rating (descending order). */
@WebServlet("/ranked-hidden-gems")
public class GetRankedHiddenGemsServlet extends HttpServlet {
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

    String lat = request.getParameter("lat");
    String lng = request.getParameter("lng");
    LatLng location = new LatLng(Double.parseDouble(lat), Double.parseDouble(lng));

    Set<HiddenGem> hiddenGems = Places.getHiddenPlaces(Places.getAllHiddenGems(Places.getAllPlaces(location)));
    Gson gson = new Gson();
    String jsonResponse = gson.toJson(Places.getRankedHiddenGems(hiddenGems));

    // Send the JSON back as the response
    response.setContentType("application/json");
    response.getWriter().println(jsonResponse);
  }
}
