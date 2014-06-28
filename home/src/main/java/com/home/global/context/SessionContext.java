package com.home.global.context;

import java.util.HashMap;

import javax.servlet.http.HttpSession;

/**
 * 
 * @author Wang Beichen
 * @date 2012-1-12
 * @version 1.0
 */
public class SessionContext {

  private static SessionContext instance;

  public static SessionContext getInstance() {
    if (instance == null) {
      instance = new SessionContext();
    }
    return instance;
  }

  private HashMap<String, HttpSession> sessionMap;

  private SessionContext() {
    sessionMap = new HashMap<String, HttpSession>();
  }

  public synchronized void addSession(HttpSession session) {
    if (session != null) {
      sessionMap.put(session.getId(), session);
    }
  }

  public synchronized HttpSession getSession(String sessionId) {
    if (sessionId == null) {
      return null;
    }
    return sessionMap.get(sessionId);
  }

  public synchronized void removeSession(HttpSession session) {
    if (session != null) {
      sessionMap.remove(session.getId());
    }
  }
}
