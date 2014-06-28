package com.home.global.dict;

public class AppStatus {

  public static class HistoryStatus {
    public static final int INITED = 0;
    public static final int PUSHED = 1;
    public static final int DOWNLOADED = 2;
    public static final int WATCHED = 3;
    public static final int REVIEWED = 4;
    public static final int CLAIMED = 5;
    public static final int REMOVED = 6;
    public static final int ERROR = 7;

  }

  public static class Marriage {
    public static final int SINGLE = 0;
    public static final int MARRIED = 1;
    public static final int DIVORCED = 2;
  }

  public static class UserValid {
    public static final int YES = 0;
    public static final int NO = 1;
  }

  public static class WorkStatus {
    public static final int EMPLOYED = 0;
    public static final int STUDENT = 1;
    public static final int HOUSEWIFE = 2;
    public static final int UNEMPLOYED = 3;
    public static final int SELF_EMPLOYED = 4;
    public static final int RETIRED = 5;
    public static final int OTHER = 6;

  }
}