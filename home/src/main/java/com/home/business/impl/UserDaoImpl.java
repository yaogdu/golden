package com.home.business.impl;

import java.util.List;

import javax.persistence.Query;

import org.apache.log4j.Logger;
import org.springframework.transaction.annotation.Transactional;

import com.home.business.BaseEntityDao;
import com.home.business.UserDao;
import com.home.domain.User;

public class UserDaoImpl extends BaseEntityDao<User> implements UserDao {

  private static final Logger logger = Logger.getLogger(UserDaoImpl.class);

  @Override
  public User findById(long uid) {
    // TODO Auto-generated method stub
    return super.getById(uid);
  }

  @Override
  @SuppressWarnings("unchecked")
  public List<User> findTestData(int count) {
    Query query = em.createNativeQuery("select * from t_user order by u_id desc limit 0,?", User.class);
    query.setParameter(1, count);
    return query.getResultList();
  }

  @Override
  public Class<User> getEntityType() {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public boolean ImeiExists(String imei) {
    logger.info("imei exists check for app first time startup");
    Query query = em.createNativeQuery("select count(*) usercount from t_user where u_imei=:imei", User.class);
    query.setParameter("imei", imei);
    int number = 0;
    try {
      number = Integer.parseInt(query.getSingleResult().toString());

    } catch (Exception e) {
      number = 0;
    }
    return number > 0 ? true : false;
  }

  @Override
  public User ImeiMappedToUser(String imei) {
    logger.info("imeiMappedToUser from userdaoimpl");
    Query query = em.createNativeQuery("select * from t_user where  u_imei=:imei and u_cell_number is null ", User.class);
    query.setParameter("imei", imei);
    User user;
    try {
      user = (User) query.getResultList().get(0);

    } catch (Exception e) {
      user = null;
    }
    return user;
  }

  @Override
  public User login(String loginId) {
    Query query = em.createNativeQuery("select * from t_user where u_login_id=:loginId", User.class);
    query.setParameter("loginId", loginId);
    User user;
    try {
      user = (User) query.getSingleResult();
    } catch (Exception e) {
      user = null;
    }

    return user;

  }

  @Override
  @Transactional
  public User save(User entity) {
    // TODO Auto-generated method stub
    return super.save(entity);
  }

  @Override
  @Transactional
  public boolean updateIMEI(User user) {
    Query query = em.createNativeQuery("update t_user set u_imei=:imei where u_id=:id", User.class);
    query.setParameter("imei", user.getImei());
    query.setParameter("id", user.getId());
    return query.executeUpdate() > 0;
  }

}
