package com.home.global.context;

import com.home.global.base.BaseBean;

/**
 * 
 * @author Wang Beichen
 * @date 2014-1-15
 * @version 1.0
 */
public class SessionWrapper extends BaseBean {

  private static final long serialVersionUID = -3362952264000474874L;

  private String userId;

  private String loginEmail;

  private String password;

  private String userName;

  public String getLoginEmail() {
    return loginEmail;
  }

  public String getPassword() {
    return password;
  }

  public String getUserId() {
    return userId;
  }

  public String getUserName() {
    return userName;
  }

  public void setLoginEmail(String loginEmail) {
    this.loginEmail = loginEmail;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

}
