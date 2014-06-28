package com.home.business.impl;

import javax.persistence.Query;

import org.springframework.transaction.annotation.Transactional;

import com.home.business.BaseEntityDao;
import com.home.business.SoftwareDao;
import com.home.domain.Software;

public class SoftwareDaoImpl extends BaseEntityDao<Software> implements SoftwareDao {

  @Override
  public Software exists(Software software) {
    Query query = em.createNativeQuery("select * from t_sw_type where s_package_name=:packageName", Software.class);
    query.setParameter("packageName", software.getPackageName());
    Software sw;
    try {
      sw = (Software) query.getSingleResult();

    } catch (Exception e) {
      sw = null;
    }

    return sw;
  }

  @Override
  public Class<Software> getEntityType() {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  @Transactional
  public Software save(Software software) {
    // TODO Auto-generated method stub
    return super.save(software);
  }

}
