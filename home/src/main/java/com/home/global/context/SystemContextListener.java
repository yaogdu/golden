package com.home.global.context;

import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Enumeration;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.Logger;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.home.global.Constants;

/**
 * 
 * @author Wang Beichen
 * @date 2014-1-16
 * @version 1.0
 */
public class SystemContextListener implements ServletContextListener {

  private static final Logger logger = Logger.getLogger(SystemContextListener.class);

  private ServletContext sc = null;

  private static WebApplicationContext wac = null;

  public static Object getMetadata() {
    return wac.getServletContext().getAttribute(Constants.METADATA);
  }

  public void contextDestroyed(ServletContextEvent event) {
    // This manually deregisters JDBC driver, which prevents Tomcat 7 from complaining about memory
    // leaks wrto this class
    Enumeration<Driver> drivers = DriverManager.getDrivers();
    while (drivers.hasMoreElements()) {
      Driver driver = drivers.nextElement();
      try {
        DriverManager.deregisterDriver(driver);
        logger.debug("System context destroyed");
      } catch (SQLException e) {
      }

    }

    // ProxoolFacade.shutdown(0);
  }

  public void contextInitialized(ServletContextEvent event) {
    sc = event.getServletContext();
    wac = WebApplicationContextUtils.getWebApplicationContext(sc);
    loadMetadata();
  }

  private void loadMetadata() {
    ContextWrapper cw = new ContextWrapper(wac);
    try {
      sc.setAttribute(Constants.METADATA, cw.getMetadata());
    } catch (Exception e) {
      e.printStackTrace();
      System.exit(1);
    }
  }

}
