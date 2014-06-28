package com.home.controller;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONException;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.home.domain.User;
import com.home.global.dict.ReturnCode;
import com.home.global.util.LoginToken;
import com.home.global.util.PwdUtil;
import com.home.service.UserService;

@Controller
@RequestMapping("/login")
public class LoginController {

  private final Logger logger = Logger.getLogger(LoginController.class);

  @Autowired
  UserService userService;

  @RequestMapping(value = "/login", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public String login(HttpServletRequest request, @RequestBody User user) throws JSONException, JsonProcessingException {

    SecurityUtils.getSubject().getSession().setTimeout(-10001);

    LoginToken token = new LoginToken(user.getLoginId(), PwdUtil.encypt(user.getLoginPwd()), user.getSessionId(), user.getImei());
    token.setRememberMe(true);
    Subject cUser = SecurityUtils.getSubject();
    JSONObject result = new JSONObject();
    if (!cUser.isAuthenticated()) {
      User loginUser;
      try {
        cUser.login(token);
      } catch (UnknownAccountException e) {
        result.put("returncode", ReturnCode.code102);
        result.put("success", false);
        result.put("msg", "用户名或者密码错误");
        token.clear();
        return result.toString();

      } catch (IncorrectCredentialsException ice) {
        result.put("success", false);
        result.put("returncode", ReturnCode.code103);
        result.put("msg", "密码错误");
        token.clear();
        return result.toString();
      }
      // return info to client if login success but imei don't match it's original one

      ObjectMapper om = new ObjectMapper();

      loginUser = userService.login(user.getLoginId());
      if (!loginUser.getImei().equals(user.getImei())) {
        result.put("success", true);
        result.put("msg", "imei号不正确");
        result.put("returncode", ReturnCode.code104);
        long now = System.currentTimeMillis();
        result.put("user", om.writeValueAsString(loginUser));
        request.getSession().setAttribute(loginUser.getId() + "updateimei", now);
        result.put("sessionId", cUser.getSession().getId());
        return result.toString();
      }

      // loginUser = userService.login(user.getLoginId());
      try {
        result.put("user", om.writeValueAsString(loginUser));
      } catch (JsonProcessingException e) {
        // TODO Auto-generated catch block
        e.printStackTrace();
      }
      result.put("success", true);
      result.put("returncode", ReturnCode.code110);
      result.put("msg", "登录成功");
      result.put("sessionId", cUser.getSession().getId());
    } else {
      result.put("success", false);
      result.put("returncode", ReturnCode.code111);
      result.put("msg", "不能重复登录");
      result.put("sessionId", cUser.getSession().getId());
    }
    return result.toString();
  }

  @RequestMapping(value = "/updateIMEI", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public String updateIMEI(HttpServletRequest request, @RequestBody User user) throws JSONException {
    logger.info("user " + user.getCellNumber() + " update IMEI");

    Subject cUser = SecurityUtils.getSubject();
    JSONObject result = new JSONObject();
    if (cUser.isAuthenticated()) {
      if (null != String.valueOf(request.getSession().getAttribute(user.getId() + "updateimei"))) {
        long userlogintoken = Long.parseLong(String.valueOf(request.getSession().getAttribute(user.getId() + "updateimei")));
        long now = System.currentTimeMillis();

        if (now - userlogintoken - 10300 < 0) {
          boolean success = userService.updateIMEI(user);
          if (success) {
            result.put("returncode", ReturnCode.code200);
            result.put("success", true);
            result.put("msg", "更换成功");
          } else {
            result.put("returncode", ReturnCode.code400);
            result.put("success", false);
            result.put("msg", "更换失败");
          }
        } else {
          result.put("returncode", ReturnCode.code402);
          result.put("success", false);
          result.put("msg", "操作超时");
        }
      } else {
        result.put("returncode", ReturnCode.code101);
        result.put("success", false);
        result.put("msg", "请您先登录");
      }
    }
    result.put("returncode", ReturnCode.code101);
    result.put("success", false);
    result.put("msg", "请您先登录");
    return result.toString();
  }
}
