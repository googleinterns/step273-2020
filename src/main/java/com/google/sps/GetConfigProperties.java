package com.google.sps;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;

public class GetConfigProperties {
  public static String getApiKey() throws FileNotFoundException, IOException {
    String rootPath = Thread.currentThread().getContextClassLoader().getResource("").getPath();
    String appConfigPath = rootPath + "app.properties";

    Properties appProps = new Properties();
    appProps.load(new FileInputStream(appConfigPath));

    return appProps.getProperty("api_key");
  }
}
