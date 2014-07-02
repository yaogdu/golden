package com.home.business.impl;

import java.util.List;

import javax.persistence.Query;

import org.springframework.transaction.annotation.Transactional;

import com.home.business.BaseEntityDao;
import com.home.business.UserHistoryDao;
import com.home.domain.UserHistory;

public class UserHistoryDaoImpl extends BaseEntityDao<UserHistory> implements UserHistoryDao {

  @Override
  public Class<UserHistory> getEntityType() {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public List<UserHistory> getStatus(int type, String ids, long uid) {
    StringBuffer sql = new StringBuffer("select * from t_user_history where uh_type=?1 and u_id=?2 and uh_item_id in (" + ids + ")");

    Query query = em.createNativeQuery(sql.toString(), UserHistory.class);
    query.setParameter(1, type);
    query.setParameter(2, uid);

    return (List<UserHistory>) query.getResultList();
  }

  @Override
  @Transactional
  public UserHistory recordPublicHeartBeat(UserHistory userHistory) {
    // TODO Auto-generated method stub
    return super.save(userHistory);
  }

  @Override
  @Transactional
  public void updateHistoryStatus(UserHistory uh) {
    Query query =
        em.createNativeQuery("update t_user_history  set uh_status=:status where uh_type=:uhType and uh_item_id=:itemId and u_id=:uid ",
            UserHistory.class);

    query.setParameter("status", uh.getStatus());
    query.setParameter("uhType", uh.getType());
    query.setParameter("itemId", uh.getUhId());
    query.setParameter("uid", uh.getUid());

    System.out.println("updateHistoryStatus result :" + query.executeUpdate());

  }
}
