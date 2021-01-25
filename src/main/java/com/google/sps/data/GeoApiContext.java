/*
 * Copyright 2014 Google Inc. All rights reserved.
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

package com.google.sps.data;
import java.io.Closeable;

/**
 * The entry point for making requests against the Google Geo APIs.
 *
 * <p>Construct this object by using the enclosed {@link GeoApiContext.Builder}.
 *
 * GeoApiContext works best when you create a single GeoApiContext instance, or one per API key, and
 * reuse it for all your Google Geo API queries. This is because each GeoApiContext manages its own
 * thread pool, back-end client, and other resources.
 *
 * <p>When you are finished with a GeoApiContext object, you must call {@link #shutdown()} on it to
 * release its resources.
 */

public class GeoApiContext implements Closeable {
  private static final String VERSION = "@VERSION@"; // Populated by the build script
  private static final String USER_AGENT = "GoogleGeoApiClientJava/" + VERSION;
  private static final int DEFAULT_BACKOFF_TIMEOUT_MILLIS = 60 * 1000; // 60s

  private final RequestHandler requestHandler;
  private final String apiKey;
  private final String baseUrlOverride;
  private final String channel;
  private final String clientId;
  private final long errorTimeout;
  private final ExceptionsAllowedToRetry exceptionsAllowedToRetry;
  private final Integer maxRetries;
  private final UrlSigner urlSigner;
  private String experienceIdHeaderValue;
  private final RequestMetricsReporter requestMetricsReporter;

  /* package */
  GeoApiContext(
      RequestHandler requestHandler,
      String apiKey,
      String baseUrlOverride,
      String channel,
      String clientId,
      long errorTimeout,
      ExceptionsAllowedToRetry exceptionsAllowedToRetry,
      Integer maxRetries,
      UrlSigner urlSigner,
      RequestMetricsReporter requestMetricsReporter,
      String... experienceIdHeaderValue) {
    this.requestHandler = requestHandler;
    this.apiKey = apiKey;
    this.baseUrlOverride = baseUrlOverride;
    this.channel = channel;
    this.clientId = clientId;
    this.errorTimeout = errorTimeout;
    this.exceptionsAllowedToRetry = exceptionsAllowedToRetry;
    this.maxRetries = maxRetries;
    this.urlSigner = urlSigner;
    this.requestMetricsReporter = requestMetricsReporter;
    setExperienceId(experienceIdHeaderValue);
  }

  /**
   * standard Java API to reclaim resources
   *
   * @throws IOException
   */
  @Override
  public void close() throws IOException {
    shutdown();
  }

  /**
   * The service provider interface that enables requests to be handled via switchable back ends.
   * There are supplied implementations of this interface for both OkHttp and Google App Engine's
   * URL Fetch API.
   *
   * @see OkHttpRequestHandler
   * @see GaeRequestHandler
   */
  public interface RequestHandler {

    <T, R extends ApiResponse<T>> PendingResult<T> handle(
        String hostName,
        String url,
        String userAgent,
        String experienceIdHeaderValue,
        Class<R> clazz,
        FieldNamingPolicy fieldNamingPolicy,
        long errorTimeout,
        Integer maxRetries,
        ExceptionsAllowedToRetry exceptionsAllowedToRetry,
        RequestMetrics metrics);

    <T, R extends ApiResponse<T>> PendingResult<T> handlePost(
        String hostName,
        String url,
        String payload,
        String userAgent,
        String experienceIdHeaderValue,
        Class<R> clazz,
        FieldNamingPolicy fieldNamingPolicy,
        long errorTimeout,
        Integer maxRetries,
        ExceptionsAllowedToRetry exceptionsAllowedToRetry,
        RequestMetrics metrics);

    void shutdown();

    /** Builder pattern for {@code GeoApiContext.RequestHandler}. */
    interface Builder {

      Builder connectTimeout(long timeout, TimeUnit unit);

      Builder readTimeout(long timeout, TimeUnit unit);

      Builder writeTimeout(long timeout, TimeUnit unit);

      Builder queriesPerSecond(int maxQps);

      Builder proxy(Proxy proxy);

      Builder proxyAuthentication(String proxyUserName, String proxyUserPassword);

      RequestHandler build();
    }
  }
}

