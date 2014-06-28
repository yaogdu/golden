<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/libs.jsp"%>
<head>
<title>智慧课堂</title>
<link type="text/css" href="${static_ctx}/static/css/teacher/common.css"
	rel="stylesheet" />
<link type="text/css"
	href="${static_ctx}/static/css/teacher/stylesheet.css" rel="stylesheet" />
<link type="text/css" href="${static_ctx}/static/css/teacher/index.css"
	rel="stylesheet" />
<%@include file="/WEB-INF/pages/commons/libs.jsp"%>
<%@include file="/WEB-INF/pages/commons/meta.jsp"%>
<script src="${static_ctx}/static/js/teacher/teacher.js"></script>
<script src="${static_ctx}/static/js/teacher/course/course.js"></script>
<script src="${static_ctx}/static/js/teacher/course/courselist.js"></script>
<%
	request.setAttribute("main_menu", "menu_2");
%>
<style type="text/css">
.aui_content {
	display: block;
}

.treewrap.treewrap01 .treeRoot .treeLi .tree1Node {
	border-top: 1px solid #dfdfdf;
}

.treeSwBox {
	margin-right: 40px;
	z-index: 1000
}

a:link,a:visited {
	text-decoration: none; /*超链接无下划线*/
}
</style>


</head>

<body>

	<div class="container">
		<div class="wrapper">
			<!-- header start-->
			<%@include file="/WEB-INF/pages/commons/header.jsp"%>
			<!-- header end -->
			<!-- main start -->
			<div class="mainWrap">
				<div class="mainBgCl">
					<div class="mainBgCr">
						<div class="mainBoxCon">
							<%@include file="/WEB-INF/pages/teacher/commons/navigation.jsp"%>
							<div class="mainBox">
								<div class="mainIndex">
									<div class="mainTitle mainTitle01">
										<span>${academicyear}${semester}(${stage}${subject})</span>
										<div class="linkBox" style="display: none">
											<a href="javascript:void(0);" class="titLink titLink01"
												style="color: gray;">查看当年学年</a> <em>|</em> <a
												class="titLink titLink01" href="javascript:void(0)"
												style="color: gray;">查看学年历史</a>

										</div>
									</div>
									<div class="mainPart">
										<div class="conFormWrap">
											<div class="formOper clearfix">
												<div class="selectClass">
													<div class="selectBoxWrap">
														<select id="selectgrade">
															<c:forEach items="${grades}" var="g">
																<option value="${g.grade_id}">${g.grade}</option>

															</c:forEach>
														</select> <select id="selectclass">
															<option value="0">全部班级</option>
															<c:forEach items="${grades}" var="g">
																<option value="${g.class_id}">${g.class_number}班</option>

															</c:forEach>
														</select>
													</div>

												</div>

												<div class="selectBtn">
													<div class="selectBtn">
														<div class="BtnBlue23">
															<a id="btnSave" class="btnSave"
																href="${ctx}/teacher/course/coursebyweek"><span><em
																	class="week"></em>按周查看</span></a>
														</div>
													</div>
												</div>
											</div>
											<div class="moduleItem">
												<h3 class="moduleItemTitle">
													<span class="titleLine">课时内容</span> <span>课时计划</span>
												</h3>
												<div class="treewrap treewrap01">
													<ul class="treeRoot" id="courselist">
														<c:if test="${empty chapterSectionList}">
															<li class="treeLi">
																<div class="tree1Node tree1Node02">
																	<div class="tree1Info">
																		<a class="tree1Aarrow" href="javascript:void(0);">&nbsp;</a>
																		<span class="tree1NodeFolder"></span> <span
																			class="tree1NodeName">第1章</span> <input
																			class="inputText" type="text" value="" name="" />
																		<div class="BtnWrap">
																			<div class="BtnBlue23">
																				<a href="javascript:void(0)" class="btnSave"
																					id="btnSave"><span>确定</span></a>
																			</div>
																			<div class="BtnGray23">
																				<a href="javascript:void(0)" class="btnSave"
																					id="btnSave"><span>取消</span></a>
																			</div>
																		</div>
																	</div>
																	<div class="treeOper">
																		<a href="" class="operIco"></a>
																		<ul class="treeSwBox">
																			<li><a href="javascript:void(0);"
																				onclick="latte.teacher.course.courselist.addChapterEditBoxBefore(${course.id},${course.chapterid})">添加同级前章</a>
																				<a href="javascript:void(0);"
																				onclick="latte.teacher.course.courselist.addChapterEditBoxAfter(${course.id},${course.chapterid})">添加同级后章</a></li>
																			<li><a href="javascript:void(0);"
																				onclick="latte.teacher.course.courselist.addSectionEditBox(${course.chapterid})">添加本章小节</a></li>
																			<li><a href="javascript:void(0);"
																				onclick="latte.teacher.course.courselist.delChapter(${course.chapterid})">删除本章</a></li>
																			<li><a href="javascript:void(0);"
																				onclick="latte.teacher.course.courselist.renameChapter(${course.chapterid})">重命名</a></li>
																		</ul>
																	</div>
																	<div class="tree1Box">
																		<ul class="treeUl treeUl02" style="display: none">
																		</ul>
																		<ul class="treeUl treeUl01 treeUl02"
																			style="display: none">
																		</ul>
																	</div>
																</div>
															</li>
														</c:if>
														<c:forEach items="${chapterSectionList}" var="course"
															varStatus="status">


															<li class="treeLi" id="lichapter${course.chapterid}">
																<div class="tree1Node">
																	<div class="tree1Info">
																		<a class="tree1Aarrow" href="javascript:void(0);">&nbsp;</a>
																		<span class="tree1NodeFolder">第${status.count }章</span>
																		<span class="tree1NodeName"
																			id="spanchapter${course.chapterid}">${course.chapername}
																		</span>
																	</div>
																	<div class="treeOper">
																		<a href="" class="operIco"></a>
																		<ul class="treeSwBox">
																			<li><a href="javascript:void(0);"
																				onclick="latte.teacher.course.courselist.addChapterEditBoxBefore(${course.id},${course.chapterid})">添加同级前章</a>
																				<a href="javascript:void(0);"
																				onclick="latte.teacher.course.courselist.addChapterEditBoxAfter(${course.id},${course.chapterid})">添加同级后章</a></li>
																			<li><a href="javascript:void(0);"
																				onclick="latte.teacher.course.courselist.addSectionEditBox(${course.chapterid})">添加本章小节</a></li>
																			<li><a href="javascript:void(0);"
																				onclick="latte.teacher.course.courselist.delChapter(${course.chapterid})">删除本章</a></li>
																			<li><a href="javascript:void(0);"
																				onclick="latte.teacher.course.courselist.renameChapter(${course.chapterid})">重命名</a></li>
																		</ul>
																	</div>
																</div>
																<div class="tree1Box">
																	<ul class="treeUl treeUl02"
																		id="sectionlist${course.chapterid}">
																		<c:forEach items="${course.sections}" var="section"
																			varStatus="sectionStatus">

																			<li class="treeLi" id="lisection${section.id}">
																				<div class="tree1Node">
																					<div class="tree1Info">
																						<span class="tree1NodeIndent"> <b
																							class="tree1NodeLine3"></b>
																						</span> <a class="tree1Aarrow" href="javascript:void(0);">&nbsp;</a>
																						<span class="tree1NodeFolder">第${sectionStatus.count}节</span>
																						<span class="tree1NodeName"
																							id="spansection${section.id}">${section.name}
																						</span>
																					</div>
																					<div class="treeOper">
																						<a class="operIco" href=""></a>
																						<ul class="treeSwBox">
																							<li><a
																								href="${ctx}/teacher/resource/courseware">参考课件</a></li>
																							<li><a href="javascript:void(0);"
																								onclick="latte.teacher.course.courselist.addSectionEditBoxBefore(${course.chapterid},${section.id})">添加同级前节</a></li>
																							<li><a href="javascript:void(0);"
																								onclick="latte.teacher.course.courselist.addSectionEditBoxAfter(${course.chapterid},${section.id})">添加同级后节</a></li>
																							<li><a href="javascript:void(0);"
																								onclick="latte.teacher.course.courselist.delSection(${section.id})">删除</a></li>
																							<li><a href="javascript:void(0);"
																								onclick="latte.teacher.course.courselist.renameSection(${section.id})">重命名</a></li>
																						</ul>
																					</div>
																				</div>
																			</li>
																			<c:forEach items="${section.periods}" var="period"
																				varStatus="pstatus">
																				<c:if test="${pstatus.count > 1 }">
																					<li class="treeLi">
																						<div class="tree1Node tree1Node01"></div>
																					</li>
																				</c:if>
																				<c:forEach items="${period.schedules}"
																					var="schedule" varStatus="sstatus">
																					<li class="treeLi">
																						<div class="tree1Node tree1Node01"></div>
																					</li>
																				</c:forEach>
																			</c:forEach>
																		</c:forEach>
																	</ul>
																	<ul class="treeUl treeUl01 treeUl02">
																		<c:forEach items="${course.sections}" var="section">
																			<c:if test="${ empty section.periods }">
																				<li class="treeLi">
																					<div class="tree1Node">
																						<div class="tree1Node tree1Node01"></div>
																					</div>
																				</li>
																			</c:if>
																			<c:forEach items="${section.periods}" var="period"
																				varStatus="status">

																				<c:if
																					test="${status.count < 1 or empty period.resource_name }">
																					<li class="treeLi">
																						<div class="tree1Node">
																							<div class="tree1Node tree1Node01"></div>
																						</div>
																					</li>
																				</c:if>
																				<c:if test="${!empty period.resource_name}">
																					<li class="treeLi">
																						<div class="tree1Node">
																							<div class="tree1Info">
																								<a class="treeIco" href="javascript:void(0);"></a>
																								<span class="tree1NodeFolder"></span> <a href=""
																									class="tree1NodeName ellipsis">${period.resource_name}</a>
																							</div>
																							<div class="BtnWrap">
																								<div class="BtnOrange24">
																									<a href="javascript:void(0)" class="btnSave"
																										id="btnSave"
																										onclick="latte.teacher.course.courselist.createCourse('${period.resource_id}','${period.resource_name}','${course.chapterid}','${course.chapername}','${section.id}','${section.name}','${period.id}')">创建课程</a>
																								</div>
																								<div class="BtnOrange24">
																									<a href="javascript:void(0)" class="btnSave"
																										onclick="latte.teacher.course.courselist.delCourseware(${period.id})"
																										id="btnSave">删课件</a>
																								</div>
																							</div>
																						</div>
																						<ul class="treeUl">
																							<c:forEach items="${period.schedules}"
																								var="schedule">

																								<li class="treeLi">
																									<div class="tree1Node">
																										<div class="tree1Info">
																											<span class="tree1NodeIndent"> <b
																												class="tree1NodeLine3"></b>
																											</span> <span class="tree1NodeName">${schedule.stage}${schedule.grade}(${schedule.class_number})班
																												${schedule.start_time} <c:if
																													test="${schedule.period == 1 }">第一节课</c:if>
																												<c:if test="${schedule.period == 2 }">第二节课</c:if>
																												<c:if test="${schedule.period == 3 }">第三节课</c:if>
																												<c:if test="${schedule.period == 4 }">第四节课</c:if>
																												<c:if test="${schedule.period == 5 }">第五节课</c:if>
																												<c:if test="${schedule.period == 6 }">第六节课</c:if>
																												<c:if test="${schedule.period == 7 }">第七节课</c:if>
																												<c:if test="${schedule.period == 8 }">第八节课</c:if>
																											</span>
																										</div>
																										<c:if test="${schedule.state == 0 }">
																											<div class="stateBg">
																												<p class="unreleased">未发布</p>
																											</div>
																											<div class="BtnWrap">
																												<div class="BtnOrange24">
																													<a href="javascript:void(0)"
																														class="btnSave"
																														onclick="latte.teacher.course.courselist.issueCourse(${period.id},${schedule.id})"
																														id="btnSave">发布课程</a>
																												</div>
																												<div class="BtnOrange24">
																													<a href="javascript:void(0)"
																														class="btnSave"
																														onclick="latte.teacher.course.courselist.delCourse(${schedule.id})"
																														id="btnSave">删课程</a>
																												</div>
																											</div>
																										</c:if>
																										<c:if test="${schedule.state == 1 }">
																											<div class="stateBg">
																												<p class="released">已发布</p>
																											</div>
																											<div class="BtnWrap">
																												<div class="BtnOrange24">
																													<a target="_blank"
																														href="${ctx}/teacher/course/gotoclass?scheduleId=${schedule.id}&classMode=${schedule.class_mode}&courseWareId=${schedule.resource_id}&file=${schedule.resource_md5}&classId=${schedule.class_id}"
																														class="btnSave" id="btnSave">去上课</a>
																												</div>
																											</div>
																										</c:if>
																										<c:if test="${schedule.state == 2 }">
																											<div class="stateBg">
																												<p class="class">上课中</p>
																											</div>

																										</c:if>
																									</div>
																								</li>
																							</c:forEach>

																						</ul>
																					</li>
																				</c:if>
																			</c:forEach>
																		</c:forEach>
																	</ul>
																</div>
															</li>
														</c:forEach>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="mainBgBt"></div>
				<div class="BackToTop">
					<a href="" title="回顶部"><span></span>回顶部</a>
				</div>
			</div>
			<!-- main end -->
			<%@include file="/WEB-INF/pages/commons/footer.jsp"%>
			<!-- footer start -->
			<!-- footer end -->
		</div>
	</div>
	<!-- 弹窗 -->
	<div class="windowWrap" style="display: none">
		<div class="windowBox" style="width: 492px;">
			<div class="windowT">
				<div class="windowL">
					<div class="windowB">
						<div class="windowR">
							<div class="windowTitle">
								<h3>创建课程</h3>
								<div class="windowTools">
									<a class="close" href="javascript:void(0);"></a>
								</div>
							</div>
							<div class="windowMain">
								<div class="windowCon windowCon01">
									<div class="windowBoxTp">
										<div class="formCon formCon03">
											<div class="formList">
												<label>课件：</label>
												<div class="info">
													<span class="infoTxt"><b>匀变速直线运动的研究</b></span>
												</div>
											</div>
											<div class="formList">
												<label>章节：</label>
												<div class="info">
													<span class="infoTxt">第一章 第五节</span>
												</div>
											</div>
										</div>
									</div>
									<div class="windowBoxBt">
										<div class="formCon formCon03">
											<div class="formList">
												<label class="labelTp3">班级：</label>
												<div class="info">
													<div class="windowBoxTp current">
														<div class="windowBoxLf">
															<input class="infoCkb" type="checkbox" name="radio">
															<span class="infoTxt">高一（2）班</span>
														</div>
														<div class="windowBoxRt">
															<label class="labelTp3">授课时间：</label>
															<div class="info">
																<input class="inputText" type="text" value="2014-01-01" />
																<span class="dateIco"></span>
																<div class="selectBoxWrap">
																	<div class="trigger">
																		<input type="text" class="selectText" value="第四节"
																			disabled="disabled"> <a
																			class="btnTrigger show" href="javascript:void(0)"></a>
																	</div>
																	<div class="selectBox" style="display: none">
																		<ul class="selectList">
																			<li><a title="请选择" href="javascript:void(0)">请选择</a></li>
																			<li><a title="1" href="javascript:void(0)">第一节1</a></li>
																			<li><a title="2" href="javascript:void(0)">第二节2</a></li>
																			<li><a title="3" href="javascript:void(0)">第三节3</a></li>
																		</ul>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div class="windowBoxBt">
														<div class="windowBoxLf">
															<input class="infoCkb" type="checkbox" name="radio">
															<span class="infoTxt">高一（2）班</span>
														</div>
														<div class="windowBoxRt">
															<label class="labelTp3">授课时间：</label>
															<div class="info">
																<input class="inputText" type="text" value="2014-01-01" />
																<span class="dateIco"></span>
																<div class="selectBoxWrap">
																	<div class="trigger">
																		<input type="text" class="selectText" value="第四节"
																			disabled="disabled"> <a
																			class="btnTrigger show" href="javascript:void(0)"></a>
																	</div>
																	<div class="selectBox" style="display: none">
																		<ul class="selectList">
																			<li><a title="请选择" href="javascript:void(0)">请选择</a></li>
																			<li><a title="1" href="javascript:void(0)">第一节1</a></li>
																			<li><a title="2" href="javascript:void(0)">第二节2</a></li>
																			<li><a title="3" href="javascript:void(0)">第三节3</a></li>
																		</ul>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div class="windowBoxBt">
														<div class="windowBoxLf">
															<input class="infoCkb" type="checkbox" name="radio">
															<span class="infoTxt">高一（2）班</span>
														</div>
														<div class="windowBoxRt">
															<label class="labelTp3">授课时间：</label>
															<div class="info">
																<input class="inputText" type="text" value="2014-01-01" />
																<span class="dateIco"></span>
																<div class="selectBoxWrap">
																	<div class="trigger">
																		<input type="text" class="selectText" value="第四节"
																			disabled="disabled"> <a
																			class="btnTrigger show" href="javascript:void(0)"></a>
																	</div>
																	<div class="selectBox" style="display: none">
																		<ul class="selectList">
																			<li><a title="请选择" href="javascript:void(0)">请选择</a></li>
																			<li><a title="1" href="javascript:void(0)">第一节1</a></li>
																			<li><a title="2" href="javascript:void(0)">第二节2</a></li>
																			<li><a title="3" href="javascript:void(0)">第三节3</a></li>
																		</ul>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div class="windowBoxBt">
														<div class="windowBoxLf">
															<input class="infoCkb" type="checkbox" name="radio">
															<span class="infoTxt">高一（2）班</span>
														</div>
														<div class="windowBoxRt">
															<label class="labelTp3">授课时间：</label>
															<div class="info">
																<input class="inputText" type="text" value="2014-01-01" />
																<span class="dateIco"></span>
																<div class="selectBoxWrap">
																	<div class="trigger">
																		<input type="text" class="selectText" value="第四节"
																			disabled="disabled"> <a
																			class="btnTrigger show" href="javascript:void(0)"></a>
																	</div>
																	<div class="selectBox" style="display: none">
																		<ul class="selectList">
																			<li><a title="请选择" href="javascript:void(0)">请选择</a></li>
																			<li><a title="1" href="javascript:void(0)">第一节1</a></li>
																			<li><a title="2" href="javascript:void(0)">第二节2</a></li>
																			<li><a title="3" href="javascript:void(0)">第三节3</a></li>
																		</ul>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="BtnWrap">
									<div class="BtnBlue23">
										<a id="btnSave" class="btnSave" href="javascript:void(0)"><span>保存</span></a>
									</div>
									<div class="BtnGray23">
										<a id="btnSave" class="btnSave" href=""><span>取消</span></a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="windowMask"></div>
	</div>

	<script type="text/javascript">
	$(document).ready(function(){
		$("#selectgrade").change(function(){
			window.location = ctx + "/teacher/course/courselist?gradeid="+$("#selectgrade").val()+"&classid="+$("#selectclass").val();
		});
		$("#selectclass").change(function(){
			window.location = ctx + "/teacher/course/courselist?gradeid="+$("#selectgrade").val()+"&classid="+$("#selectclass").val();
		});
	});
	
	$("#selectgrade option[value='${gradeid}']").attr(
			"selected", true);
	$("#selectclass option[value='${classinfo.id}']").attr(
			"selected", true);
	</script>
</body>
</html>
