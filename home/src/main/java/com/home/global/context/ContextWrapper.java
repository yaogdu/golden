package com.home.global.context;

import org.springframework.web.context.WebApplicationContext;

import java.util.HashMap;
import java.util.Map;

/**
 * 
 * @author Wang Beichen
 * @date 2014-1-16
 * @version 1.0
 */
public class ContextWrapper {

  private WebApplicationContext wac = null;

  // private IDictService dictService;

  public ContextWrapper(WebApplicationContext wac) {
    this.setWac(wac);
    // dictService = (IDictService) wac.getBean("dictService");
  }

  public Map<String, Object> getMetadata() throws Exception {
    Map<String, Object> metaMap = new HashMap<String, Object>();
    // metaMap.put(Constants.MetaData.SUBJECT_VO, subjectService.findSubjectDict());
    return metaMap;
  }

  public WebApplicationContext getWac() {
    return wac;
  }

  public void setWac(WebApplicationContext wac) {
    this.wac = wac;
  }
}
