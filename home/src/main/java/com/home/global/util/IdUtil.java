package com.home.global.util;

import java.util.UUID;

public class IdUtil {

  /**
   * duyaoguang generate uuid
   * 
   * @return uuid
   */
  public static String getUUID() {
    return UUID.randomUUID().toString();
  }
}
