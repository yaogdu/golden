package com.home.global;

import org.apache.shiro.SecurityUtils;

public class InitParamSetting {

  public void init() {
    System.out.println("init.....................");
    SecurityUtils.getSubject().getSession().setTimeout(-10001);
  }
}
