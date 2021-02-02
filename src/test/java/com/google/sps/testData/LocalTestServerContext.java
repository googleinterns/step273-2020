/*
 * Copyright 2017 Google Inc. All rights reserved.
 *
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

package com.google.sps.testData;

import java.io.IOException;

import com.google.maps.GeoApiContext;

import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;

 /** Local test mock server (GeoApi Context) for unit tests. */
public class LocalTestServerContext implements AutoCloseable {
  private final MockWebServer server;
  public final GeoApiContext context;

  public LocalTestServerContext(String responseBody) throws IOException {
    this.server = new MockWebServer();
    MockResponse response = new MockResponse();
    response.setHeader("Content-Type", "application/json");
    response.setBody(responseBody);
    server.enqueue(response);
    server.start();

    this.context = new GeoApiContext.Builder()
      .apiKey("AIzaFakeKey")
      .build();
  }

@Override
  public void close() {
    try {
      server.shutdown();
    } catch (IOException e) {
      System.err.println("Failed to close server: " + e);
    }
  }
}