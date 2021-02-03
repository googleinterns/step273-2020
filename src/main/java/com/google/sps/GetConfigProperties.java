package com.google.sps;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import com.google.sps.errors.IncorrectFileNameException;
import com.google.sps.errors.IncorrectPropertyNameException;

@WebListener
/** This class consists of functions to retrieve the properties from app.properties. */
public class GetConfigProperties implements ServletContextListener {
  /**
   * This function is used to get the value of a property from a given properties
   * file and the property name.
   * 
   * @param filepath     The name of the file from which we want to get the property value.
   * @param propertyName The name of the property for which we want to get the value.
   * @return String This returns the String value of the property.
   */
  public static String getPropertyValue(String filepath, String propertyName) {
    String rootPath = Thread.currentThread().getContextClassLoader().getResource("").getPath();
    String appConfigPath = rootPath + filepath;

    Properties appProps = new Properties();
    try {
      appProps.load(new FileInputStream(appConfigPath));
    } catch (IOException e) {
      throw new IncorrectFileNameException("Incorrect config file name: " + filepath, e);
    }

    String propertyValue = appProps.getProperty(propertyName);
    if (propertyValue != null) {
      return propertyValue;
    } else {
      throw new IncorrectPropertyNameException(
          "Could not read the property from the config file. Incorrect property name: " + propertyName);
    }
  }

  private static final String apiKey = getPropertyValue("app.properties", "api_key");

  public static String getApiKey() {
    return apiKey;
  }

  @Override
  public void contextInitialized(ServletContextEvent servletContextEvent) {
    getApiKey();
  }
}
