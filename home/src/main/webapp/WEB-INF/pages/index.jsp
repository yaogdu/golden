<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<%@include file="/WEB-INF/pages/commons/meta.jsp"%>
<%-- <link href="${static_ctx}/static/css/schedule.css" rel="stylesheet"
	type="text/css" media="all" />
<link href="${static_ctx}/static/css/schedule/schedule-coursebyweek.css" --%>
<!-- 	rel="stylesheet" type="text/css" media="all" /> -->
<title>首页</title>
<%
String returnurl = request.getParameter("returnurl");
%>
<script type="text/javascript">
returnurl = '<%=returnurl == null ? "" :  returnurl%>';
</script>
</head>
<body>

<div style="display:none" id="divviewhistory">
起始日期：<input type="text" id="startTime"/>
</div>

<div class="container">
  <div class="wrapper">
	<!-- 头部 -->
	<%@include file="/WEB-INF/pages/commons/header.jsp"%>



    <!-- main start -->
    <div class="mainWrap">
      <div class="mainBgCl">
        <div class="mainBgCr">
          <div class="mainBoxCon">
			<c:if test="${!islogin}">
			<%@include file="/WEB-INF/pages/commons/navigation.jsp" %>
			</c:if>
			<c:if test="${user.getType().name().equalsIgnoreCase(\"teacher\")}">
			<%@include file="/WEB-INF/pages/teacher/commons/navigation.jsp" %>
			</c:if>
			<c:if test="${user.getType().name().equalsIgnoreCase(\"student\")}">
			<%@include file="/WEB-INF/pages/student/commons/navigation.jsp" %>
			</c:if>
            <div class="mainBox"> 
              <div class="mainCutBox">
                
                  
<%--                   <a href="${ctx }/teacher/coursebyweek?firstdate=2014/02/10">班级课程按周浏览</a> --%>
<!--                     <br /> -->
<%--                   <a href="${ctx }/teacher/coursebyweek?firstdate=2014/02/10&teacherid=1">老师课程按周浏览</a> --%>
    <%--/school/login/toLoginPage--%>

    <%--/school/class/toListPage--%>
									<div style="margin-top:120px;font-size:24px;line-height:50px;text-align:center;">
										<p><a href="${ctx }/school/AdminLogin/toLoginPage">学校门户</a>&nbsp;&nbsp;&nbsp;admin/admin</p>
										<p><a href="${ctx }/teacher/resource/courseware">教师门户</a>&nbsp;&nbsp;&nbsp;abc/123456</p>
										<p><a href="${ctx }/student/course/coursebyweek">学生门户</a>&nbsp;&nbsp;&nbsp;student1/123456</p>
									</div>
                  
                <!-- main end -->
              </div>        
            </div>       
          </div>
        </div>
      </div>
      <div class="mainBgBt"></div>
      <div class="BackToTop"><a href="" title="回顶部"><span></span>回顶部</a></div>
    </div>
    <!-- main end -->
	
	<!-- 底部 -->
	<%@include file="/WEB-INF/pages/commons/footer.jsp"%>


  </div>
</div>
</body>
</html>