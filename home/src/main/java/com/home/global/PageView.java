package com.home.global;

/**
 * Jsp Page Path
 * 
 * @author Wang Beichen
 * @date 2014-1-16
 * @version 1.0
 */
public class PageView {

  public static class Admin {
    public static final String REPORT = "admin/report";
    public static final String SCORES = "admin/scores";
    public static final String COMMENT = "admin/comment";
  }

  public static class Redirect {
    public static final String INDEX = "redirect:/";
  }
  public static class Resource {
    public static final String INDEX = "resource/index";
    public static final String CATEGORY = "resource/category";
  }

  public static final String JSON = "jsonView";
  public static final String NO_RESOURCE = "util/405";

  public static final String NO_AUTH = "util/401";

  public static final String ERROR = "util/500";

  public static final String WELCOME = "welcome";
}
