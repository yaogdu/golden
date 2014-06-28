package com.home.business;

import java.lang.annotation.Annotation;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.transaction.annotation.Transactional;

import com.home.domain.BaseEntity;

public abstract class BaseDao<T> {

  public static final String INDEX = "index";

  @PersistenceContext
  protected EntityManager em;

  public void delete(BaseEntity content) {
    em.remove(content);
  }

  public <T extends Annotation> T getAnnotation(Class<?> cls, Class<T> type) {
    T result = cls.getAnnotation(type);
    if (result == null && cls != Object.class) {
      return getAnnotation(cls.getSuperclass(), type);
    }
    return result;
  }

  public T getById(long id) {
    T result = null;
    Class<T> type = getEntityType();
    result = em.find(type, id);
    return result;
  }

  public abstract Class<T> getEntityType();

  public List<T> listAll() {
    TypedQuery<T> query = em.createQuery("from " + getEntityType().getName(), getEntityType());
    return query.getResultList();
  }

  @Transactional
  public T save(T entity) {
    em.persist(entity);
    return entity;
  }

  @Transactional
  public void update(T entity) {
    em.persist(entity);
  }

}