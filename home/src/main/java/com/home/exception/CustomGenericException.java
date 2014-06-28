package com.home.exception;

/**
 * Author : Lance lance7in_gmail_com Date : 09/12/2013 10:05 Since : 0.1
 */
public class CustomGenericException extends RuntimeException {

  private String errCode;
  private String errMsg;

  public CustomGenericException(String errCode, String errMsg) {
    this.errCode = errCode;
    this.errMsg = errMsg;
  }

  public String getErrCode() {
    return errCode;
  }

  public String getErrMsg() {
    return errMsg;
  }

  public void setErrCode(String errCode) {
    this.errCode = errCode;
  }

  public void setErrMsg(String errMsg) {
    this.errMsg = errMsg;
  }
}