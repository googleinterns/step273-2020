package com.google.sps;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;

/** This class consists of functions to retrieve the properties from app.properties. */
public class GetConfigProperties {
  /** This function is used to get the value of a property from a given 
   * properties file and the property name.
   * @param filepath                The name of the file from which we want to get the property value.
   * @param propertyName            The name of the property for which we want to get the value. 
   * @return String                 This returns the String value of the property.
   * @throws FileNotFoundException  This exception is thrown if the filepath given does not exist. 
   * @throws IOException            This exception is thrown if the filepath and/or the propertyName do not exist. 
   */
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

  /**
   * This function retrieves the value of the API Key from the app.properties file. 
   * @return String                 This return the String value of the API key.
   * @throws FileNotFoundException  This exception is thrown if the filepath given does not exist. 
   * @throws IOException            This exception is thrown if the filepath and/or the propertyName do not exist. 
   */
  public static String getApiKey() throws FileNotFoundException, IOException {
    return getPropertyValue("app.properties", "api_key");
  }
}
