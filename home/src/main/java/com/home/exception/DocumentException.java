package com.home.exception;

/**
 * Author : Lance lance7in_gmail_com Date : 09/12/2013 10:05 Since : 0.1
 */
public class DocumentException extends RuntimeException {

  public DocumentException(String message) {
    super(message);
  }

  public DocumentException(String message, Throwable cause) {
    super(message, cause);
  }
}
