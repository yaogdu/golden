<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%--
在每个页面设置当前选中的菜单
request.setAttribute("main_menu", "menu_2");
 --%>
<div class="navWrap">

<ul class="nav">
    <li id="nav_prepare" ${ main_menu == "menu_1" ? "" : "" }><a href="javascript:void(0);" style="color:grey">预习</a></li>
    <li id="nav_course" ${ main_menu == "menu_2" ? "class=\"current\"" : "" }><a href="${ctx }/student/course/coursebyweek">上课</a></li>
    <li id="nav_homework" ${ main_menu == "menu_3" ? "" : "" }><a href="javascript:void(0);"  style="color:grey">做作业</a></li>
    <li id="nav_review" ${ main_menu == "menu_4" ? "" : "" }><a href="javascript:void(0);" style="color:grey">复习</a></li>
    <li id="nav_paper" ${ main_menu == "menu_5" ? "" : "" }><a href="javascript:void(0);" style="color:grey">考试</a></li>
    <li id="nav_resource" ${ main_menu == "menu_6" ? "" : "" }><a href="javascript:void(0);" style="color:grey">学习资源</a></li>
    <li id="nav_analysis" ${ main_menu == "menu_7" ? "" : "" }><a href="javascript:void(0);" style="color:grey">学习分析</a></li>
</ul>
</div>
