package com.home.business;

import com.home.domain.User;

public interface RegisterDao {

  public User cellExists(String cellNum);
}
