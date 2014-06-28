package com.home.exception;

import org.apache.shiro.authc.AuthenticationException;

public class LoginException extends AuthenticationException {

  /**
   * 
   */
  private static final long serialVersionUID = 838241859224647722L;
  private String errCode;
  private String errMsg;

  public LoginException(String errCode, String errMsg) {
    this.errCode = errCode;
    this.errMsg = errMsg;
  }

  public String getErrCode() {
    return errCode;
  }
}
