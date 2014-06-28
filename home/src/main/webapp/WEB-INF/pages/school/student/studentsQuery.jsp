<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/school/libs.jsp"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="pragma" content="no-cache" />
		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
		<%@include file="/WEB-INF/pages/commons/school/meta.jsp"%>
		<link href="${static_ctx}/static/css/lib/jquery-ui.css" rel="stylesheet" type="text/css"/>
		<link href="${static_ctx}/static/css/lib/jquery-ui-timepicker-addon.min.css" rel="stylesheet" type="text/css"/>
		
		<link href="${static_ctx}/static/css/pagebar.css" rel="stylesheet" type="text/css"/>
		<script src="${static_ctx}/static/js/lib/jquery-ui.min.js"></script>
		<script src="${static_ctx}/static/js/lib/datetimepicker/jquery-ui-timepicker-addon.min.js"></script>
		<script src="${static_ctx}/static/js/lib/datetimepicker/jquery-ui-timepicker-zh-CN.js"></script>
		<script src="${static_ctx}/static/js/lib/jquery.pagebar.js" type="text/javascript"></script>
		<script src="${static_ctx}/static/js/school/student/studentQuery.js" type="text/javascript"></script>
<title>学生管理</title>
</head>
<body>


		<div class="container">
			<%@include file="/WEB-INF/pages/commons/school/header.jsp" %>
			<div class="mainWrap">
				<div class="mainIndex">
					<%@include file="include/left-menu.jsp" %>
					<div class="mainCon">
					   
						<div class="mainTitle">
								学生管理
							<div class="operBtn">
								<div class="BtnWhite28">
									<a href="javascript:void(0)" class="btnSave" id="export">
										批量导出
									</a>
								</div>
							</div>
						</div>
						<div class="mainPart">
						   <div class="conBox">
						    <input type="hidden" id="context" value="${static_ctx}"/>
							<input type="hidden" id="currentPage" />
							<input type="hidden" id="totalPage" />
							<input type="hidden" id="totalCount" />
							  <form  action="query" method="POST" id="studentQuery">
							     <div class="conFormList">
									<div class="conForm">
									    <label>系统号:</label>
										    <div class="info">
												&nbsp <input type="text" name="system_id" id="system_id"/>
											</div>
									</div>
									<div class="conForm">
										<label>姓名:</label>
										    <div class="info">
											&nbsp <input type="text" name="name" id="name"/>
											</div>
									</div>
									<div class="conForm">
											<div class="info">
												&nbsp <select name="stage" id="stage" >
												    <option>学段</option>
													<c:forEach var="stage" items="${stages}">
														<option>${stage.stageName}</option>
													</c:forEach>
												</select>
												<select name="grade" id="grade" >
												    <option>年级</option>
													<c:forEach var="grade" items="${grades}">
														<option>${grade.gradeName}</option>
													</c:forEach>
												</select>
												<select name="class" id="class" style="width:80px;">
													<option value="0">班级</option>
													<c:forEach var="klass" items="${klasses}">
														<option value="${klass.classNumber}">${klass.classNumber}班</option>
													</c:forEach>
												</select>
												</div>
										</div>
										<div class="conForm">
											<label>入学日期: &nbsp </label>
												<div class="info">
	
												   <div class="selectBoxWrap">
												       <div class="trigger">
												           <input type="text" name="enter_time_start" id="startTime" class="selectText" style="width:100px;"/>
												           <a class="btnTrigger time" href="javascript:void(0);" id="start_click"></a>
												       </div>
												       <div class="selectBox" style="display:none">
												       </div>
												   </div>
												   
												    <div class="selectBoxWrap">
												       <div class="trigger">
												          <input type="text" name="enter_time_end" id="endTime" class="selectText" style="width:100px"/>
												          <a class="btnTrigger time" href="javascript:void(0);" id="end_click"></a>
												       </div>
												       <div class="selectBox" style="display:none">
												       </div>
												    </div>
                    	                        </div>
										</div>
										<div class="conForm">
											<div class="info">
                    	                        <div class="BtnBlue22">
													<a id="btnQuery" class="btnSave">查询</a>
												</div>
											</div>
									    </div>
									</div>
									</form>
								</div>
								    <div class="conShow">
									    <div class="list">
											<table border="0" width="100%" class="listTable">
											    <thead>
												    <th align="center" width="100px">系统号</th>
												    <th align="center">登录名</th>
												    <th align="center">姓名</th>
												    <th align="center" width="120px">班级</th>
												    <th align="center">入学日期</th>
												    <th align="center">状态</th>
												    <th align="center" width="150px">操作</th>
												</thead>
												<tbody id="exportData">
													
												</tbody>
												</table>
											<div id="pagebar"></div>
											</div>
										</div>
						</div>
					</div>
				</div>
				 <div class="BackToTop"><a title="返回顶部" href="#">返回顶部</a></div>
			</div>
					<!-- 底部 -->
					<%@include file="/WEB-INF/pages/commons/school/footer.jsp" %>
		</div>
	</body>
</html>

