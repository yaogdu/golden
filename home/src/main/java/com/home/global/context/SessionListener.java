package com.home.global.context;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionBindingListener;

@Component
public class SessionListener implements HttpSessionBindingListener {

  private static final Logger logger = Logger.getLogger(SessionListener.class);

  private SessionContext sessionContext = SessionContext.getInstance();

  public void valueBound(HttpSessionBindingEvent event) {
    sessionContext.addSession(event.getSession());
  }

  public void valueUnbound(HttpSessionBindingEvent event) {
    HttpSession session = event.getSession();
    sessionContext.removeSession(session);
  }
}
