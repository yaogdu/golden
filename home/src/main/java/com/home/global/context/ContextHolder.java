package com.home.global.context;

/**
 * Multiple data sources selector
 * 
 * @author Wang Beichen
 * @date 2014-1-16
 * @version 1.0
 */
public class ContextHolder {

  private static final ThreadLocal<String> contextHolder = new ThreadLocal<String>();

  public static void clearDataSourceType() {
    contextHolder.remove();
  }

  public static String getDataSourceType() {
    return contextHolder.get();
  }

  public static void setDataSourceType(String dataSourceType) {
    contextHolder.set(dataSourceType);
  }

}