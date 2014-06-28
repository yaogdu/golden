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
	src="${static_ctx}/static/js/teacher/course/create_course.js"></script>
</head>
<body>

	<div class="windowBoxTp">
		<div class="formCon formCon03">
			<div class="formList">
				<label>课件：</label>
				<div class="info">
					<span class="infoTxt"><b>${resourceName}</b></span>
				</div>
			</div>
			<div class="formList">
				<label>章节：</label>
				<div class="info">
					<span class="infoTxt">${chapterName} ${sectionName}</span>
				</div>
			</div>
		</div>
	</div>
	<div>
		<c:forEach items="${classes}" var="clz" varStatus="status">
				
			<div class="windowBoxBt">
				<div class="formCon formCon03">
					<div class="formList">
						<c:if test="${status.index == 0}">
							<label class="labelTp3">班级：</label>
						</c:if>
						<div class="info">
							<div class="windowBoxTp current">
								<div class="windowBoxLf">
									<input class="infoCkb" type="checkbox" name="radio"
										value="${clz.class_id}"> <span class="infoTxt">（${clz.class_number}）班</span>
								</div>
								<div class="windowBoxRt">
									<label class="labelTp3">授课时间：</label>
									<div class="info">
										<input type="text" class="inputText" id="date${clz.class_id}" /> <span
											class="dateIco"></span>
										<div class="selectBoxWrap">
											<select id="select${clz.class_id}">
												<option value="1">第一节</option>
												<option value="2">第二节</option>
												<option value="3">第三节</option>
												<option value="4">第四节</option>
												<option value="5">第五节</option>
												<option value="6">第六节</option>
												<option value="7">第七节</option>
												<option value="8">第八节</option>
											</select>
										</div>
									</div>
								</div>
							</div>
		</c:forEach>




	</div>
	<script type="text/javascript">
		$(function() {
			$(".inputText").datetimepicker({
				dateFormat : 'yy/mm/dd',
				timeFormat : ''
			});
		});
	</script>
</body>
</html>