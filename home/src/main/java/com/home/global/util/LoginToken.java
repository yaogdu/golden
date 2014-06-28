package com.home.global.util;

import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UsernamePasswordToken;

public class LoginToken extends UsernamePasswordToken implements AuthenticationToken {

  /**
   * 
   */
  private static final long serialVersionUID = 638125069613255274L;

  private String username;

  private String pwd;

  private String sessionId;

  private String imei;

  public LoginToken(String username, String password, String sessionId, String imei) {
    super();
    this.username = username;
    this.pwd = password;
    this.sessionId = sessionId;
    this.imei = imei;
  }

  @Override
  public Object getCredentials() {
    // TODO Auto-generated method stub
    return getPwd();
  }

  public String getImei() {
    return imei;
  }

  @Override
  public Object getPrincipal() {
    // TODO Auto-generated method stub
    return getUsername();
  }

  public String getPwd() {
    return pwd;
  }

  public String getSessionId() {
    return sessionId;
  }

  public String getUsername() {
    return username;
  }

  public void setImei(String imei) {
    this.imei = imei;
  }

  public void setPassword(String password) {
    this.pwd = password;
  }

  public void setPwd(String pwd) {
    this.pwd = pwd;
  }

  public void setSessionId(String sessionId) {
    this.sessionId = sessionId;
  }

  public void setUsername(String username) {
    this.username = username;
  }

}
