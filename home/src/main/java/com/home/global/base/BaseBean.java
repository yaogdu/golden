package com.home.global.base;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

/**
 * All VOs should extends this bean
 * 
 * @author Wang Beichen
 * @date 2014-1-15
 * @version 1.0
 */
public class BaseBean implements Serializable {

  private static final long serialVersionUID = -1983439549833473233L;

  private Object field;

  private Object value;

  private String operatorId;

  public BaseBean() {
  }

  public BaseBean(Object field, Object value) {
    super();
    this.field = field;
    this.value = value;
  }

  public boolean equals(Object obj) {
    return super.equals(obj);
  }

  public Object getField() {
    return field;
  }

  public String getOperatorId() {
    return operatorId;
  }

  public Object getValue() {
    return value;
  }

  public int hashCode() {
    return super.hashCode();
  }

  public void setField(Object field) {
    this.field = field;
  }

  public void setOperatorId(String operatorId) {
    this.operatorId = operatorId;
  }

  public void setValue(Object value) {
    this.value = value;
  }

  public String toString() {
    return super.toString();
  }

  public void writeObject(ObjectOutputStream out) throws IOException {
    out.defaultWriteObject();
    // Debug.logInfo([+this.toString()+]: writeObject);
  }

  private void readObject(ObjectInputStream in) throws IOException, ClassNotFoundException {
    in.defaultReadObject();
    // Debug.logInfo([+this.toString()+]: readObject);
  }

}
