package com.home.business.impl;

import javax.persistence.Query;

import org.springframework.transaction.annotation.Transactional;

import com.home.business.BaseEntityDao;
import com.home.business.UserSoftwareDao;
import com.home.domain.UserSoftware;

public class UserSoftwareDaoImpl extends BaseEntityDao<UserSoftware> implements UserSoftwareDao {

  @Override
  public UserSoftware exists(UserSoftware userSoftware) {
    Query query =
        em.createQuery(
            "select  us  from UserSoftware us left join fetch us.software  where us.imei=:imei and us.software.packageName=:packageName",
            UserSoftware.class);
    query.setParameter("imei", userSoftware.getImei());
    query.setParameter("packageName", userSoftware.getSoftware().getPackageName());
    UserSoftware us;
    try {
      us = (UserSoftware) query.getSingleResult();

    } catch (Exception e) {
      us = null;
    }

    return us;
  }

  @Override
  public Class<UserSoftware> getEntityType() {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  @Transactional
  public UserSoftware save(UserSoftware userSoftware) {
    // TODO Auto-generated method stub
    return super.save(userSoftware);
  }

}
