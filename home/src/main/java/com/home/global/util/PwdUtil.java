package com.home.global.util;

import org.apache.shiro.crypto.hash.Sha1Hash;
import org.apache.shiro.crypto.hash.SimpleHash;

public class PwdUtil {

  public static String encypt(String source) {
    String pwd = new SimpleHash(Sha1Hash.ALGORITHM_NAME, source).toHex();
    return pwd;
  }
}
