package com.home.global;

/**
 * Global Constants
 * 
 * @author Wang Beichen
 * @date 2014-1-16
 * @version 1.0
 */
public class Constants {

  public static class Cookie {
    public static final String JSESSIONID = "JSESSIONID";
    public static final String LOGIN_EMAIL = "__uzle";
    public static final String PASSWORD = "__uzzi";
    public static final String REMEMBER_ME = "__uzrm";
    public static final String ZUZHI_ID = "__zzid";
    public static final int DEFAULT_DURATION = 60 * 60 * 24 * 30;
  }

  public static enum img {
    bmp, jpg, tiff, gif, png
    // ,jpeg,pcx,tga,exif,fpx,svg,psd,cdr,pcd,dxf,ufo,eps,ai,raw
  }

  public static class MetaData {
    public static final String SUBJECT_VO = "SubjectVO";
    public static final String SUBJECT = "Subject";
    public static final String SUBJECT_CATEGORY = "SubjectCategory";
    public static final String COURSE_TYPE = "CourseType";
    public static final String QUESTION_TYPE = "QuestionType";

    // view list
    public static final String COURSE_LIST = "CourseList";
    public static final String ANSWER_LIST = "AnswerList";
    public static final String EXAM_USER_LIST = "ExamUserList";
  }

  public static class PagerSize {
    public static final int DEFAULT = 10;
    public static final int SUBJECT = 10;
    public static final int COURSE = 20;
    public static final int EXAM = 10;
    public static final int QUESTION = 10;
    public static final int COMMENT = 10;
  }

  public static class TimePattern {
    public final static String DEFAULT = "yyyy-MM-dd HH:mm";
    public final static String DATETIME = "yyyy-MM-dd HH:mm:ss";
    public final static String DATE = "yyyy-MM-dd";
    public final static String TIME = "HH:mm:ss";
    public final static String TIMEMASK = "HH:mm";
  }

  public static final String APPLICATION_PROPERTIES = "application";

  public static final String TEMPLATE_PROPERTIES = "template";

  public static final int INVITATION_COUNT = 10;

  public static final String SESSION_WRAPPER = "SessionWrapper";

  public static final String SESSION_LISTENER = "SessionListener";

  public static final String CAPTCHA = "captcha";

  public static final int CAPTCHA_WIDTH = 120;

  public static final int CAPTCHA_HEIGHT = 32;

  public static final int CAPTCHA_CODE_COUNT = 4;

  public static final String EMAIL_SENDER_ADDRESS = "ADMIN";

  public final static String properties_Suffix = ".properties";

  public final static String URL_SUFFIX = ".do";

  public final static String ENCODING = "UTF-8";

  public static final int UPLOAD_SIZE_PICTURE = 1024 * 1024 * 4;

  public static final int UPLOAD_SIZE_DOCUMENT = 1024 * 1024 * 10;

  public static final String METADATA = "Metadata";
}
