<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/libs.jsp"%>


<html>
<head>
<%@include file="/WEB-INF/pages/commons/meta.jsp"%>
<title>Insert title here</title>
<link href="${static_ctx}/static/css/lib/jquery-ui.css" rel="stylesheet"
	type="text/css" media="all" />
<link
	href="${static_ctx}/static/css/lib/jquery-ui-timepicker-addon.min.css"
	rel="stylesheet" type="text/css" media="all" />
<%@include file="/WEB-INF/pages/commons/libs.jsp"%>
<%@include file="/WEB-INF/pages/commons/meta.jsp"%>
<script src="${static_ctx}/static/js/lib/jquery-ui.min.js"></script>
<script
	src="${static_ctx}/static/js/lib/datetimepicker/jquery-ui-timepicker-addon.min.js"></script>
<script
	src="${static_ctx}/static/js/lib/datetimepicker/jquery-ui-timepicker-zh-CN.js"></script>
<script type="text/javascript"
	src="${static_ctx}/static/js/teacher/teacher.js"></script>
	<script type="text/javascript"
	src="${static_ctx}/static/js/teacher/course/course.js"></script>
<script type="text/javascript"
	src="${static_ctx}/static/js/teacher/course/issue_course.js"></script>
</head>
<body>

	 <div class="windowMain">
              <div class="windowCon windowCon01"> 
                <div class="windowBoxTp">
                  <div class="infoLbl">课程发布后，将会被推送给学生，是否确认?</div>
                </div> 
                <div class="windowBoxBt">
                  <div class="formCon">
                    <div class="formList">
                      <label><em>*</em>上课模式：</label>
                      <div class="info">
                        <div class="infoBox">
                          <input class="infoRadio" type="radio" name="radio" checked="checked" value="0">
                          <span class="infoTxt">课堂模式</span>
                          <p class="infoLabel">（老师控制，学生同步浏览）</p>
                        </div>
                        <div class="infoBox">
                          <input class="infoRadio" type="radio" name="radio" value="1">
                          <span class="infoTxt">自学模式</span>
                          <p class="infoLabel">（老师、学生各自控制，互补干扰）</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> 
                <div class="infoHint"><span>请选择上课模式</span></div>           
              </div>
</body>
</html>