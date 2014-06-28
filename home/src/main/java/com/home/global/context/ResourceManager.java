package com.home.global.context;

import java.util.Locale;
import java.util.ResourceBundle;

import com.home.global.Constants;

public class ResourceManager {

  private static String appResource = Constants.APPLICATION_PROPERTIES;

  public static String getAppProperties(String key) {
    ResourceBundle rb = ResourceBundle.getBundle(appResource, Locale.getDefault());
    return rb.getString(key);
  }

  public static String getTemplate(String templateType, Object... obj) {
    return ServiceLocator.getMessage(templateType, obj);
  }
}
