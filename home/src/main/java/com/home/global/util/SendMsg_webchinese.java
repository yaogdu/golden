package com.home.global.util;

import java.io.IOException;
import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.PostMethod;

/**
 * API2.1调用:f.php?phone=xxxxxx&pwd=xxx&to=xxxx&msg=xxxx&type=0 以上接口参数详细说明 VIP API 1.phone:手机号
 * 2.pwd:飞信密码 3.to:发送给谁(手机号或飞信号) 4.msg:飞信内容 5.type:操作 0(空)发送短信 1检查好友 2添加好友 6.u:备用参数:当发送内容为乱码时
 * 在最后加上&u=1
 */
public class SendMsg_webchinese {

  private static String PHONE = "18611575554";

  private static String PWD = "passw0rd";
  private static String TO = "18610566527";
  private static String MSG = "你好：Hello World!";

  public static void main(String[] args) throws HttpException, IOException {
    SendMsg_webchinese.sendMsg(PHONE, PWD, TO, MSG);
  }

  public static void sendMsg(String _phone, String _pwd, String _to, String _msg) throws HttpException, IOException {
    HttpClient client = new HttpClient();
    PostMethod post = new PostMethod("http://fetionapi.appspot.com/api/");
    post.addRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");// 在头文件中设置转码
    NameValuePair[] data =
        {
            new NameValuePair("phone", _phone), new NameValuePair("pwd", _pwd), new NameValuePair("to", _to),
            new NameValuePair("msg", _msg), new NameValuePair("type", "0")};
    post.setRequestBody(data);

    client.executeMethod(post);
    Header[] headers = post.getResponseHeaders();
    int statusCode = post.getStatusCode();
    System.out.println("statusCode:" + statusCode);
    for (Header h : headers) {
      System.out.println(h.toString());
    }
    // String result = new String(post.getResponseBodyAsString().getBytes("utf-8"));
    // System.out.println(result);
    System.out.println("ok!");
    post.releaseConnection();
  }

}
