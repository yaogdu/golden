package com.home.global.base;

import java.io.PrintStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

/**
 * 
 * @author Wang Beichen
 * @date 2014-1-16
 * @version 1.0
 */
public class BaseException extends Exception {

  private static final long serialVersionUID = -8041329847358883831L;
  protected Throwable rootCause = null; // chained exception
  protected String resourceKey = null; // resource file key for display
  private List<BaseException> exceptions = new ArrayList<BaseException>();
  protected String resourceValue0 = null;

  public BaseException() {
    super();
  }

  public BaseException(String msg) {
    super(msg);
  }

  public BaseException(String msg, Throwable cause) {
    super(msg, cause);
  }

  public BaseException(Throwable ex) {
    this(ex.getMessage());
    if (!(ex instanceof BaseException))
      this.rootCause = ex;
    else {
      this.rootCause = ((BaseException) ex).getRootCause();
      this.resourceKey = ((BaseException) ex).getResourceKey();
    }
  }

  public BaseException(Throwable ex, boolean flat) {
    this(ex);
  }

  public void addException(BaseException ex) {
    this.exceptions.add(ex);
  }

  public List<BaseException> getExcepionsList() {
    return this.exceptions;
  }

  public String getMessage() {
    if (rootCause == null) {
      return super.getMessage();
    }
    return this.rootCause.getMessage();
  }

  public String getResourceKey() {
    return resourceKey;
  }

  public String getResourceValue0() {
    return resourceValue0;
  }

  public Throwable getRootCause() {
    return this.rootCause;
  }

  public void printStackTrace() {
    if (rootCause == null)
      super.printStackTrace();
    else
      this.rootCause.printStackTrace();
  }

  public void printStackTrace(PrintStream outStream) {
    if (rootCause == null)
      super.printStackTrace(outStream);
    else
      this.rootCause.printStackTrace(outStream);
  }

  public void printStackTrace(PrintWriter writer) {
    if (rootCause == null)
      super.printStackTrace(writer);
    else
      this.rootCause.printStackTrace(writer);
  }

  public void setRootCause(Throwable aException) {
    this.rootCause = aException;
  }
}
