package com.home.business.impl;

import javax.persistence.Query;

import org.springframework.transaction.annotation.Transactional;

import com.home.business.BaseEntityDao;
import com.home.business.UserHardwareDao;
import com.home.domain.UserHardware;

public class UserHardwareDaoImpl extends BaseEntityDao<UserHardware> implements UserHardwareDao {

  public UserHardware findyHardware(String imei) {
    Query query = em.createNativeQuery("select * from t_hw_inventory where u_imei=:imei", UserHardware.class);
    query.setParameter("imei", imei);
    UserHardware hardware = (UserHardware) query.getResultList().get(0);
    return hardware;
  }

  @Override
  public Class<UserHardware> getEntityType() {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  @Transactional
  public UserHardware save(UserHardware userHardware) {
    // TODO Auto-generated method stub
    return super.save(userHardware);
  }

}
