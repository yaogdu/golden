package com.home.business.impl;

import javax.persistence.Query;

import org.springframework.transaction.annotation.Transactional;

import com.home.business.BaseEntityDao;
import com.home.business.MrIdDao;
import com.home.domain.MrID;

public class MrIdDaoImpl extends BaseEntityDao<MrID> implements MrIdDao {

  @Override
  @Transactional
  public void answerItem(MrID mrId) {
    Query query =
        em.createNativeQuery("update mr_id_"
            + mrId.getMr()
            + "  set mr_a1=:a1,mr_a2=:a2,mr_a3=:a3,mr_a4=:a4,mr_a5=:a5,mr_a6=:a6,mr_a7=:a7,mr_a8=:a8,mr_a9=:a9,mr_a10=:a10,mr_status=:status where u_id=:uid");
    query.setParameter("a1", mrId.getA1());
    query.setParameter("a2", mrId.getA2());
    query.setParameter("a3", mrId.getA3());
    query.setParameter("a4", mrId.getA4());
    query.setParameter("a5", mrId.getA5());
    query.setParameter("a6", mrId.getA6());
    query.setParameter("a7", mrId.getA7());
    query.setParameter("a8", mrId.getA8());
    query.setParameter("a9", mrId.getA9());
    query.setParameter("a10", mrId.getA10());
    query.setParameter("status", mrId.getStatus());
    query.setParameter("uid", mrId.getUid());
    query.executeUpdate();
  }

  @Override
  @Transactional
  public MrID createOne(MrID mrId) {
    Query query =
        em.createNativeQuery(
            "insert into mr_id_"
                + mrId.getMr()
                + "(u_id,mr_a1,mr_a10,mr_a2,mr_a3,mr_a4,mr_a5,mr_a6,mr_a7,mr_a8,mr_a9,mr_status) values (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12)",
            MrID.class);
    int i = 0;
    query.setParameter(++i, mrId.getUid());
    query.setParameter(++i, mrId.getA1());
    query.setParameter(++i, mrId.getA10());
    query.setParameter(++i, mrId.getA2());
    query.setParameter(++i, mrId.getA3());
    query.setParameter(++i, mrId.getA4());
    query.setParameter(++i, mrId.getA5());
    query.setParameter(++i, mrId.getA6());
    query.setParameter(++i, mrId.getA7());
    query.setParameter(++i, mrId.getA8());
    query.setParameter(++i, mrId.getA9());
    query.setParameter(++i, mrId.getStatus());
    query.executeUpdate();
    return null;
  }

  @Override
  public MrID findByUid(long tablename, long uid) {
    Query query = em.createNativeQuery("select * from mr_id_" + tablename + " where u_id=:uid", MrID.class);
    query.setParameter("uid", uid);
    MrID mrid;
    try {
      mrid = (MrID) query.getSingleResult();
    } catch (Exception e) {
      mrid = null;
    }
    return mrid;
  }

  @Override
  @Transactional
  public boolean generateTable(String tablename) {

    StringBuffer sql = new StringBuffer(" CREATE TABLE mr_id_" + tablename + " like mr_id ");

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
  public Class<MrID> getEntityType() {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  @Transactional
  public void updateItemStatus(String tablename, long uid, int status) {

    Query query = em.createNativeQuery("update mr_id_" + tablename + " set ad_status=:status where u_id =:uid");
    query.setParameter("status", status);
    query.setParameter("uid", uid);
    query.executeUpdate();
  }

}
