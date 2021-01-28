package com.google.sps;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;

public class GetConfigProperties {
  public static String getPropertyValue(String filepath, String propertyName) throws FileNotFoundException, IOException {
    String rootPath = Thread.currentThread().getContextClassLoader().getResource("").getPath();
    String appConfigPath = rootPath + filepath;

    Properties appProps = new Properties();
    appProps.load(new FileInputStream(appConfigPath));

    String propertyValue = appProps.getProperty(propertyName);
    if (propertyValue == null) {
      return "";
    }
    else
      return propertyValue;
  }

  public static String getApiKey() throws FileNotFoundException, IOException {
    String rootPath = Thread.currentThread().getContextClassLoader().getResource("").getPath();
    String appConfigPath = rootPath + "app.properties";

    Properties appProps = new Properties();
    appProps.load(new FileInputStream(appConfigPath));

    String apiKey = appProps.getProperty("api_key");
    if (apiKey == null) {
      return "";
    }
    else
      return apiKey;
  }
}
