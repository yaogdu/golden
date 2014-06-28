package com.home.global.base;

import java.util.List;

public class SearchParser {

  public static String genMatchString(SearchCondition condition, String searchString) {
    StringBuffer sb = new StringBuffer();
    switch (condition) {
      case bw:
      case bn:
        sb.append(searchString).append("%");
        break;
      case ew:
      case en:
        sb.append("%").append(searchString);
        break;
      case cn:
      case nc:
        sb.append("%").append(searchString).append("%");
        break;
      default:
        sb.append(searchString);
    }
    return sb.toString();
  }

  public static String parse(String cond, String value, List<String> params) {
    SearchCondition condition = SearchCondition.valueOf(cond);
    StringBuffer sb = new StringBuffer();
    switch (condition) {
      case eq:
        sb.append(" = ? ");
        params.add(value);
        break;
      case ne:
        sb.append(" <> ? ");
        params.add(value);
        break;
      case lt:
        sb.append(" < ? ");
        params.add(value);
        break;
      case gt:
        sb.append(" > ? ");
        params.add(value);
        break;
      case le:
        sb.append(" <= ? ");
        params.add(value);
        break;
      case ge:
        sb.append(" >= ? ");
        params.add(value);
        break;
      case bw:
      case ew:
      case cn:
        sb.append(" like  ? ");
        params.add(genMatchString(condition, value));
        break;
      case bn:
      case en:
      case nc:
        sb.append(" not like ? ");
        params.add(genMatchString(condition, value));
        break;
      case in:
        sb.append(" in  ( ? ) ");
        params.add(genMatchString(condition, value));
        break;
      case ni:
        sb.append(" not in ( ? ) ");
        params.add(genMatchString(condition, value));
        break;

      case nu:
        sb.append(" is null");
        break;
      case nn:
        sb.append(" is not null");
        break;
    }
    return sb.toString();
  }
}
