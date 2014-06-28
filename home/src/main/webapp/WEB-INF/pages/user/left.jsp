<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!-- left sidebar start -->
<div class="sidebar">
  <ul class="sideList">
    <li ${ left_menu == "index" ? "class=\"current\"" : "" }><a class="basicInfo" href="${ctx }/user/index"><span></span>基本信息</a></li>
    <li ${ left_menu == "changepassword" ? "class=\"current\"" : "" }><a class="password" href="${ctx }/user/changepassword"><span></span>修改密码</a></li>
  </ul>
</div>
<!-- left sidebar end -->