package com.home.global.context;

import java.util.Locale;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

/**
 * 
 * @author Wang Beichen
 * @date 2012-1-11
 * @version 1.0
 */
public class ServiceLocator implements ApplicationContextAware {

  private static ApplicationContext applicationContext;

  public static boolean containsBean(String name) {
    return applicationContext.containsBean(name);
  }

  public static String[] getAliases(String name) throws NoSuchBeanDefinitionException {
    return applicationContext.getAliases(name);
  }

  public static ApplicationContext getApplicationContext() {
    return applicationContext;
  }

  public static Object getBean(String name) throws BeansException {
    return applicationContext.getBean(name);
  }

  public static Object getBean(String name, Class<?> requiredType) throws BeansException {
    return applicationContext.getBean(name, requiredType);
  }

  public static String getMessage(String key, Object... objects) {
    return applicationContext.getMessage(key, objects, Locale.getDefault());
  }

  public static Class<?> getType(String name) throws NoSuchBeanDefinitionException {
    return applicationContext.getType(name);
  }

  public static boolean isSingleton(String name) throws NoSuchBeanDefinitionException {
    return applicationContext.isSingleton(name);
  }

  public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
    ServiceLocator.applicationContext = applicationContext;
  }
}