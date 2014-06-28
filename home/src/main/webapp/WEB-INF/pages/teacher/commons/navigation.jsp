<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%--
在每个页面设置当前选中的菜单
request.setAttribute("main_menu", "menu_2");
 --%>
<div class="navWrap">
  <ul class="nav">
      <li id="nav_courseware" ${ main_menu == "menu_1" ? "class=\"current\"" : "" }><a href="${ctx }/teacher/courseware/create/view">制作课件</a></li>
      <li id="nav_course" ${ main_menu == "menu_2" ? "class=\"current\"" : "" }><a href="${ctx }/teacher/course/coursebyweek">上课</a></li>
      <li id="nav_material" ${ main_menu == "menu_3" ? "class=\"current\"" : "" }><a href="${ctx}/teacher/resource/material" >教学资料</a></li>
      <li id="nav_work" ${ main_menu == "menu_4" ? "" : "" }><a href="javascript:void(0);" style="color:grey">布置作业</a></li>
      <li id="nav_analysis" ${ main_menu == "menu_5" ? "" : "" }><a href="javascript:void(0);" style="color:grey">教学分析</a></li>
      <li id="nav_paper" ${ main_menu == "menu_6" ? "" : "" }><a href="javascript:void(0);" style="color:grey">试卷</a></li>
      <li id="nav_resource" ${ main_menu == "menu_7" ? "class=\"current\"" : "" }><a href="${ctx}/teacher/resource/myresource">我的资源</a></li>
  </ul>
</div>  
