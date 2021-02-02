package com.google.sps;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
/** This class consists of functions to retrieve the properties from app.properties. */
public class GetConfigProperties implements ServletContextListener {
  /** This function is used to get the value of a property from a given 
   * properties file and the property name.
   * @param filepath                The name of the file from which we want to get the property value.
   * @param propertyName            The name of the property for which we want to get the value. 
   * @return String                 This returns the String value of the property.
   * @throws IOException            This exception is thrown if the filepath and/or the propertyName do not exist. 
   */
  public static String getPropertyValue(String filepath, String propertyName) throws IOException {
    String rootPath = Thread.currentThread().getContextClassLoader().getResource("").getPath();
    String appConfigPath = rootPath + filepath;

    Properties appProps = new Properties();
    try {
      appProps.load(new FileInputStream(appConfigPath));
    } catch (IOException e) {
      System.out.println("The file path does not exist.");
      throw new IOException();
    }

    String propertyValue = appProps.getProperty(propertyName);
    if (propertyValue != null) {
      return propertyValue;
    }
    else {
      System.out.println("The property name does not exist.");
      throw new IOException();
    }
  }

  /**
   * This function retrieves the value of the API Key from the app.properties file.
   * 
   * @return String                 This return the String value of the API key.
   * @throws IOException            This exception is thrown if the filepath or property name given does not exist. 
   */
  public static String getApiKey() throws IOException {
    return getPropertyValue("app.properties", "api_key");
  }

  @Override
  public void contextInitialized(ServletContextEvent servletContextEvent) {
    try {
      getApiKey();
    } catch (IOException e) {
      System.exit(1);
    }
  }
}
