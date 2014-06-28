package com.home.global.util;

import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.PostMethod;

public class SmsSend {

  public static void main(String[] args) throws Exception {

    HttpClient client = new HttpClient();
    PostMethod post = new PostMethod("http://gbk.sms.webchinese.cn");
    post.addRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=gbk");// 在头文件中设置转码
    NameValuePair[] data =
        {
            new NameValuePair("Uid", "advertisement"), new NameValuePair("Key", "7bc39f6830adfc2def7b"),
            new NameValuePair("smsMob", "18611575554"), new NameValuePair("smsText", "你好，Hello World")};
    post.setRequestBody(data);

    client.executeMethod(post);
    Header[] headers = post.getResponseHeaders();
    int statusCode = post.getStatusCode();
    System.out.println("statusCode:" + statusCode);
    for (Header h : headers) {
      System.out.println(h.toString());
    }
    String result = new String(post.getResponseBodyAsString().getBytes("gbk"));
    System.out.println(result);

    post.releaseConnection();

  }

}
