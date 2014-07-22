package com.home.business.impl;

import javax.persistence.Query;

import org.springframework.transaction.annotation.Transactional;

import com.home.business.AdIdDao;
import com.home.business.BaseEntityDao;
import com.home.domain.AdID;

public class AdIdDaoImpl extends BaseEntityDao<AdID> implements AdIdDao {

  @Override
  @Transactional
  public void answerItem(AdID adId) {
    Query query =
        em.createNativeQuery("update ad_id_" + adId.getAd()
            + " set ad_a1=:a1,ad_a2=:a2,ad_a3=:a3,ad_comments=:comments,ad_status=:status where u_id=:uid");
    query.setParameter("a1", adId.getA1());
    query.setParameter("a2", adId.getA2());
    query.setParameter("a3", adId.getA3());
    query.setParameter("comments", adId.getComments());
    query.setParameter("status", adId.getStatus());
    query.setParameter("uid", adId.getUid());

    System.out.println("executed result:" + query.executeUpdate());
  }

  @Override
  @Transactional
  public AdID createOne(AdID adId) {
    // TODO Auto-generated method stub
    Query query =
        em.createNativeQuery("insert into ad_id_" + adId.getAd()
            + "(u_id,ad_a1,ad_a2,ad_a3,ad_comments,ad_status) values (?1,?2,?3,?4,?5,?6)", AdID.class);
    int i = 0;
    query.setParameter(++i, adId.getUid());
    query.setParameter(++i, adId.getA1());
    query.setParameter(++i, adId.getA2());
    query.setParameter(++i, adId.getA3());
    query.setParameter(++i, adId.getComments());
    query.setParameter(++i, adId.getStatus());
    query.executeUpdate();
    return null;
  }

  @Override
  public AdID findByUid(long tablename, long uid) {
    Query query = em.createNativeQuery("select * from ad_id_" + tablename + " where u_id=:uid");
    query.setParameter("uid", uid);
    AdID adid;
    try {
      Object[] objs = (Object[]) query.getSingleResult();
      adid = new AdID();
      int i = 0;
      adid.setUid(Long.parseLong(objs[i++].toString()));
      adid.setA1(objs[i++].toString());
      adid.setA2(objs[i++].toString());
      adid.setA3(objs[i++].toString());
      adid.setAd(tablename);
      adid.setComments(objs[i++] == null ? "" : objs[i].toString());
      adid.setStatus(Integer.parseInt(objs[i++].toString()));
      adid.setUid(uid);
      // adid.set

      // adid = com.alibaba.fastjson.JSONObject.parseObject(new JSONObject(objs).toString(),
      // AdID.class);
      // adid.setAd(tablename);
    } catch (Exception e) {
      e.printStackTrace();
      adid = null;
    }
    return adid;
  }

  @Override
  @Transactional
  public boolean generateTable(String tablename) {
    StringBuffer sql =
        new StringBuffer(
            " CREATE TABLE ad_id_"
                + tablename
                + " ( u_id bigint(20) NOT NULL primary key,ad_a1 varchar(100) default NULL,ad_a2 varchar(100) default NULL,ad_a3 varchar(100) default NULL,ad_comments varchar(255) default NULL,ad_status int(11) default NULL ) ENGINE=InnoDB DEFAULT CHARSET=utf8 ");

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
  public Class<AdID> getEntityType() {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  @Transactional
  public void updateItemStatus(String tablename, long uid, int status) {

    Query query = em.createNativeQuery("update ad_id_" + tablename + " set ad_status=:status where u_id =:uid");
    query.setParameter("status", status);
    query.setParameter("uid", uid);
    query.executeUpdate();

  }

}
