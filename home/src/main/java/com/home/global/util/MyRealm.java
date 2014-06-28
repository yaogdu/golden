package com.home.global.util;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authz.AuthorizationException;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import com.home.domain.User;
import com.home.service.UserService;

public class MyRealm extends AuthorizingRealm {

  @Autowired
  private UserService userService;

  public UserService getUserService() {
    return userService;
  }

  public void setUserService(UserService userService) {
    this.userService = userService;
  }

  /**
   * 认证信息
   */
  protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authcToken) throws AuthenticationException {
    LoginToken token = (LoginToken) authcToken;
    String userName = token.getUsername();
    if (userName != null && !"".equals(userName)) {

      User user = userService.login(token.getUsername());
      if (user != null) {
        if (user.getLoginPwd().equals(token.getPwd())) {
          return new SimpleAuthenticationInfo(user.getLoginId(), user.getLoginPwd(), getName());

        } else {
          throw new IncorrectCredentialsException();
        }

      } else {
        throw new UnknownAccountException();
      }
    } else {
      throw new UnknownAccountException();
    }

  }

  /**
   * 授权信息
   */
  protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
    if (principals == null) {
      throw new AuthorizationException("PrincipalCollection method argument cannot be null.");
    }
    return null;
  }

}