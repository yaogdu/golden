package com.home.business.impl;

import javax.persistence.Query;

import org.apache.log4j.Logger;

import com.home.business.BaseEntityDao;
import com.home.business.RegisterDao;
import com.home.domain.User;

public class RegisterDaoImpl extends BaseEntityDao<User> implements RegisterDao {

  private static final Logger logger = Logger.getLogger(RegisterDaoImpl.class);

  @Override
  public User cellExists(String cellNum) {
    logger.info("cellphone number exists check for user register");
    Query query = em.createNativeQuery("select * from t_user where u_cell_number like :cellNum", User.class);
    query.setParameter("cellNum", cellNum);
    User user;
    try {
      user = (User) query.getSingleResult();

    } catch (Exception e) {
      user = null;
    }
    return user;

  }

  @Override
  public Class<User> getEntityType() {
    // TODO Auto-generated method stub
    return null;
  }

}
