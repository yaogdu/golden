package com.home.business.impl;

import javax.persistence.Query;

import org.springframework.transaction.annotation.Transactional;

import com.home.business.ApIdDao;
import com.home.business.BaseEntityDao;
import com.home.domain.ApID;

public class ApIdDaoImpl extends BaseEntityDao<ApID> implements ApIdDao {

  @Override
  public void answerItem(ApID apId) {
    Query query = em.createNativeQuery("update ap_id_" + apId.getAp() + "  set ap_status=:status,ap_comments=:comments where u_id=:uid");
    query.setParameter("comments", apId.getComments());
    query.setParameter("status", apId.getStatus());
    query.setParameter("uid", apId.getUid());
    query.executeUpdate();

  }

  @Override
  public ApID findByUid(long tablename, long uid) {
    Query query = em.createNativeQuery("select * from ap_id_" + tablename + " where u_id=:uid", ApID.class);
    query.setParameter("uid", uid);
    ApID apid;
    try {
      apid = (ApID) query.getSingleResult();
    } catch (Exception e) {
      apid = null;
    }
    return apid;
  }

  @Override
  public Class<ApID> getEntityType() {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  @Transactional
  public void updateItemStatus(String tablename, long uid, int status) {

    Query query = em.createNativeQuery("update ap_id_" + tablename + " set ap_status=:status where u_id =:uid");
    query.setParameter("status", status);
    query.setParameter("uid", uid);
    query.executeUpdate();

  }

}
