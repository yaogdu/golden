package com.home.global.dict;

import java.util.HashMap;
import java.util.Map;

public class AppFormat {

  // PPT
  // private static final String[] PPT = {"PPT", "PPTX"};

  // WORD
  // private static final String[] WORD = {"DOC", "DOCX"};

  // PDF
  // private static final String[] PDF = {"PDF"};

  // 图片
  private static final String[] PIC = {"PNG", "JPEG", "JPG", "BMP", "GIF"};

  // 视频
  private static final String[] VIDEO = {
      "AVI", "DAT", "ASF", "RM", "RMVB", "RAM", "MPG", "MPEG", "3GP", "MOV", "MP4", "M4V", "DVIX", "DV", "MKV", "FLV", "VOB", "QT", "CPK"};// ,"SWF","FLA""FLI","FLC","MOD","WMV",

  // 音频
  private static final String[] AUDIO = {"MP3", "WAV"};// ,"WMA"

  // 文本
  // private static final String[] TXT = {"TXT"};

  private static Map<String, String> formatMap = new HashMap<String, String>();

  private static Map<String, Integer> format = new HashMap<String, Integer>();

  public static Map<String, String> pptMap = new HashMap<String, String>();

  public static Map<String, String> wordMap = new HashMap<String, String>();

  public static Map<String, String> pdfMap = new HashMap<String, String>();

  public static Map<String, String> picMap = new HashMap<String, String>();

  public static Map<String, String> videoMap = new HashMap<String, String>();

  public static Map<String, String> audioMap = new HashMap<String, String>();

  public static Map<String, String> txtMap = new HashMap<String, String>();

  static {
    setFormatMap();
    // for (int i = 0; i < PPT.length; i++) {
    // pptMap.put(PPT[i], "PPT");
    // }
    // for (int i = 0; i < WORD.length; i++) {
    // wordMap.put(WORD[i], "WORD");
    // }
    // for (int i = 0; i < PDF.length; i++) {
    // pdfMap.put(PDF[i], "PDF");
    // }
    for (int i = 0; i < PIC.length; i++) {
      picMap.put(PIC[i], "PICTURE");
    }
    for (int i = 0; i < VIDEO.length; i++) {
      videoMap.put(VIDEO[i], "VIDEO");
    }
    for (int i = 0; i < AUDIO.length; i++) {
      audioMap.put(AUDIO[i], "AUDIO");
    }
    // for (int i = 0; i < TXT.length; i++) {
    // txtMap.put(TXT[i], "TXT");
    // }
  }

  public static String getParentFormat(String format) {
    return formatMap.get(format.toUpperCase());
  }

  public static int getResourceType(String suffix) {
    format.put("PNG", 0);
    format.put("JPEG", 0);
    format.put("JPG", 0);
    format.put("BMP", 0);
    format.put("GIF", 0);

    /* format.put("WMV", "VIDEO"); */
    format.put("AVI", 1);
    format.put("RM", 1);
    format.put("RMVB", 1);
    // format.put("DAT", 1);
    // format.put("ASF", 1);
    format.put("RAM", 1);
    format.put("MPG", 1);
    format.put("MPEG", 1);
    format.put("3GP", 1);
    format.put("MOV", 1);
    format.put("MP4", 1);
    format.put("M4V", 1);
    format.put("DVIX", 1);
    format.put("DV", 1);
    format.put("MKV", 1);
    format.put("FLV", 1);
    format.put("VOB", 1);
    format.put("QT", 1);
    format.put("CPK", 1);
    /*
     * format.put("FLI", "VIDEO"); format.put("FLC", "VIDEO"); format.put("MOD", "VIDEO");
     * format.put("SWF", "VIDEO"); format.put("FLA", "VIDEO");
     */

    format.put("MP3", 2);
    format.put("WAV", 2);
    return format.get(suffix);
  }

  public static boolean isIndexable(String format) {
    // if(pptMap.containsKey(format.toUpperCase()) ||
    // wordMap.containsKey(format.toUpperCase()) ||
    // pdfMap.containsKey(format.toUpperCase()) ||
    // txtMap.containsKey(format.toUpperCase())) {
    // return true;
    // } else {
    // return false;
    // }

    if ("PPT".equalsIgnoreCase(getParentFormat(format.toUpperCase())) || "PDF".equalsIgnoreCase(getParentFormat(format.toUpperCase()))
        || "WORD".equalsIgnoreCase(getParentFormat(format.toUpperCase())) || "TXT".equalsIgnoreCase(getParentFormat(format.toUpperCase()))) {
      return true;
    } else {
      return false;
    }

  }

  public static boolean isLegalFormat(String format) {
    if (formatMap.containsKey(format.toUpperCase())) {
      return true;
    } else {
      return false;
    }
  }

  public static void main(String[] args) {
    System.out.println(getParentFormat("tt"));
  }

  public static void setFormatMap() {
    // formatMap.put("PPT", "PPT");
    // formatMap.put("PPTX", "PPT");
    // formatMap.put("PPS", "PPT");
    // formatMap.put("PPSX", "PPT");

    // formatMap.put("DOC", "WORD");
    // formatMap.put("DOCX", "WORD");
    //
    // formatMap.put("PDF", "PDF");

    formatMap.put("PNG", "PIC");
    formatMap.put("JPEG", "PIC");
    formatMap.put("JPG", "PIC");
    formatMap.put("BMP", "PIC");
    formatMap.put("GIF", "PIC");

    /* formatMap.put("WMV", "VIDEO"); */
    formatMap.put("AVI", "VIDEO");
    formatMap.put("RM", "VIDEO");
    formatMap.put("RMVB", "VIDEO");
    formatMap.put("DAT", "VIDEO");
    formatMap.put("ASF", "VIDEO");
    formatMap.put("RAM", "VIDEO");
    formatMap.put("MPG", "VIDEO");
    formatMap.put("MPEG", "VIDEO");
    formatMap.put("3GP", "VIDEO");
    formatMap.put("MOV", "VIDEO");
    formatMap.put("MP4", "VIDEO");
    formatMap.put("M4V", "VIDEO");
    formatMap.put("DVIX", "VIDEO");
    formatMap.put("DV", "VIDEO");
    formatMap.put("MKV", "VIDEO");
    formatMap.put("FLV", "VIDEO");
    formatMap.put("VOB", "VIDEO");
    formatMap.put("QT", "VIDEO");
    formatMap.put("CPK", "VIDEO");
    /*
     * formatMap.put("FLI", "VIDEO"); formatMap.put("FLC", "VIDEO"); formatMap.put("MOD", "VIDEO");
     * formatMap.put("SWF", "VIDEO"); formatMap.put("FLA", "VIDEO");
     */

    formatMap.put("MP3", "AUDIO");
    formatMap.put("WAV", "AUDIO");
    /* formatMap.put("WMA", "AUDIO"); */

    // formatMap.put("TXT", "TXT");
  }

}
