package com.home.business.impl;

import javax.persistence.Query;

import org.springframework.transaction.annotation.Transactional;

import com.home.business.ApIdDao;
import com.home.business.BaseEntityDao;
import com.home.domain.AdID;
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
  @Transactional
  public AdID createOne(ApID apid) {
    // TODO Auto-generated method stub
    Query query = em.createNativeQuery("insert into ap_id_" + apid.getAp() + "(u_id,ap_comments,ap_status) values (?1,?2,?3)", ApID.class);
    query.setParameter(1, apid.getUid());
    query.setParameter(2, apid.getComments());
    query.setParameter(3, apid.getStatus());
    query.executeUpdate();
    return null;
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
  @Transactional
  public boolean generateTable(String tablename) {
    // TODO Auto-generated method stub
    StringBuffer sql = new StringBuffer(" CREATE TABLE ap_id_" + tablename + " like ap_id ");

    System.out.println(sql.toString());
    Query query = em.createNativeQuery(sql.toString());
    try {

      query.executeUpdate();
      return true;
    } catch (Exception e) {
      return false;
    }

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
