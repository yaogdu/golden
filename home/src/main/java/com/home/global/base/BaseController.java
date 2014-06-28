package com.home.global.base;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.ModelAndView;

import com.home.global.Constants;
import com.home.global.context.SessionWrapper;

/**
 * 
 * @author Wang Beichen
 * @date 2014-1-15
 * @version 1.0
 */
public class BaseController {

  public String getRequestURL(HttpServletRequest request) {
    String uri = request.getRequestURI();
    String queryString = request.getQueryString();
    return uri + (queryString.equals("") ? "" : ("?" + queryString));
  }

  public SessionWrapper getSessionWrapper(HttpServletRequest request) {
    HttpSession session = request.getSession();
    SessionWrapper sw = (SessionWrapper) session.getAttribute(Constants.SESSION_WRAPPER);
    if (sw == null) {
      sw = new SessionWrapper();
    }
    return sw;
  }

  // public HttpSession getHttpSession(String sessionId, long userId) throws BaseException {
  // HttpSession session = null;
  // SessionContext sessionContext = SessionContext.getInstance();
  // session = sessionContext.getSession(sessionId);
  // if(session!=null){
  // if(getSessionWrapper(session).getUserId()!=userId){
  // session=null;
  // }
  // }
  // return session;
  // }

  public SessionWrapper getSessionWrapper(HttpSession session) {
    SessionWrapper sw = (SessionWrapper) session.getAttribute(Constants.SESSION_WRAPPER);
    if (sw == null) {
      sw = new SessionWrapper();
    }
    return sw;
  }

  public ModelAndView getUploadeModelAndView(HttpServletRequest request, String flashmav, String iframemav) {
    return new ModelAndView(request.getParameter("flag") == null ? flashmav : iframemav);
  }

  public String getUserIdFromSession(HttpServletRequest request) {
    SessionWrapper sw = (SessionWrapper) request.getSession().getAttribute(Constants.SESSION_WRAPPER);
    return sw.getUserId();
  }

  public String logString(HttpServletRequest request) {
    return "[UserId:" + getUserIdFromSession(request) + "] [URL: " + getRequestURL(request) + "]";
  }

  public void sendRedirect(HttpServletRequest request, HttpServletResponse response, String url, String... params) throws IOException {
    String targetUrl = request.getContextPath() + url;
    for (String param : params) {
      targetUrl += param + "/";
    }
    response.sendRedirect(targetUrl);
  }
}
