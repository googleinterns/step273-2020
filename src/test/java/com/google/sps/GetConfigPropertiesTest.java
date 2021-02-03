
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

package com.google.sps;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import com.google.sps.errors.IncorrectFileNameException;
import com.google.sps.errors.IncorrectPropertyNameException;

import org.junit.Assert;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public final class GetConfigPropertiesTest {
  private final String configFileName = "app.properties";

  @Rule
  public ExpectedException exception = ExpectedException.none();
    
  @Test
  public void GetApiKeyValue() {
    String actual = GetConfigProperties.getPropertyValue(configFileName, "api_key");
    String expected = "mockApiKey";
    Assert.assertEquals(expected, actual);
  }

  @Test
  public void CheckIfPropertiesFileExist() {
    String rootPath = Thread.currentThread().getContextClassLoader().getResource("").getPath();
    Path path = Paths.get(rootPath + configFileName);
    Assert.assertTrue(Files.exists(path));
  }

  @Test 
  public void getErrorIfPropertyNotFound() {
    exception.expect(IncorrectPropertyNameException.class);
    GetConfigProperties.getPropertyValue(configFileName, "non_existing_property");
  }

  @Test
  public void getErrorWithNonExistentFilePath() {
    exception.expect(IncorrectFileNameException.class);
    GetConfigProperties.getPropertyValue("non_existing_file", "mockApiKey");
  }
}
