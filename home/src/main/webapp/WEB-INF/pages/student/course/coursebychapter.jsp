<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/libs.jsp"%>
<html>
<head>
<%@include file="/WEB-INF/pages/commons/meta.jsp"%>
<link href="${static_ctx}/static/css/coursestyle.css" rel="stylesheet" type="text/css" media="all"  />
<script src="${static_ctx}/static/js/jquery-1.10.2.min.js"></script>
<script src="${static_ctx}/static/js/student/student.js"></script>
<script src="${static_ctx}/static/js/student/coursebychapter.js"></script>
</head>

<body>
	<%@include file="/WEB-INF/pages/commons/header.jsp"%>
	<%-- <div class="top_box">
		<div class="center">
			<span class="name">Tina Zhang</span><span class="tx"><img
				src="${context}/static/img/tx.jpg" /></span><span class="sj"><img
				src="${context}/static/img/sj.jpg" /></span>
		</div>
	</div> --%>
	<div class="container">
		<div class="sm_nav">
			<a href="javascript:void(0);">首页&gt;</a>上课
		</div>
		<div class="mainbody">
			<div class="tit_box">
				<p>2013-2014学年 上学期 初中生物</p>
				<div class="tit_rt">
					<a href="javascript:void(0);">查看当前学年</a><a
						href="javascript:void(0);">查看学年历史</a>
				</div>
			</div>

			<div class="main_con">
				<div class="main_top">
					<div class="main_top_lt">
						<select id="subjectlist">
							<OPTION value="1">语文</OPTION>
							<OPTION value="2">数学</OPTION>
							<OPTION value="3">生物</OPTION>
							<OPTION value="4">历史</OPTION>
							<OPTION value="5">政治</OPTION>
							<OPTION value="6">英语</OPTION>
							<OPTION value="7">物理</OPTION>
							<OPTION value="8">化学</OPTION>
						</select> <span id="gradeclass">初中三年级（2）班</span>
					</div>
					<div class="main_top_rt">
						<span>上课中</span> <a href="javascript:void(0);">按周浏览</a>
					</div>
				</div>
					
				<div class="table_box">
					<table id="coursetable">
						<tr class="tr1">
							<td class="td1">课程内容</td>
							<td>课时计划</td>
						</tr>
						<c:forEach items="${courseinfolist}" var="course" varStatus="status">
							<c:if test="${status.count == 1}">
								<tr class="tr2">
								<td class="td1" colspan="2 ">${course.chaptername}</td>
								</tr>
							</c:if>
							<c:if test="${status.count > 1 and courseinfolist[status.index-1].chaptername !=course.chaptername}">
							<tr class="tr2">
								<td class="td1" colspan="2 ">${course.chaptername}  ${courseinfolist[status.index-1]}</td>
								</tr>
							</c:if>
							<tr>
							<td class="td1">${course.sectionname}</td>
							<td>${course.sectionname}</td>
						</tr>
						</c:forEach>
						<!-- <tr class="tr2">
							<td class="td1" colspan="2 ">第一章 动物的主要类群</td>

						</tr>
						<tr>
							<td class="td1">第一节 腔肠动物和扁形动物</td>
							<td>腔肠动物和扁形动物</td>
						</tr>
						<tr>
							<td class="td1">第二节 线性动物和环形动物</td>
							<td>线性动物和环形动物</td>
						</tr>
						<tr>
							<td class="td1">第三节 软体动物和截肢动物</td>
							<td>软体动物和截肢动物</td>
						</tr>
						<tr>
							<td class="td1">第四节 鱼</td>
							<td>鱼</td>
						</tr>
						<tr>
							<td class="td1">第五节 两栖动物和爬行动物</td>
							<td>两栖动物和爬行动物</td>
						</tr>
						<tr>
							<td class="td1">第六节 鸟</td>
							<td>鸟</td>
						</tr>
						<tr>
							<td class="td1">第七节 哺乳动物</td>
							<td>哺乳动物</td>
						</tr> -->
					</table>
				</div>
			</div>


		</div>
	</div>
	<%@include file="/WEB-INF/pages/commons/footer.jsp"%>
</body>
</html>
