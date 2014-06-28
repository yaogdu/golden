<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<link href="${static_ctx}/static/css/lib/jquery-ui.css" rel="stylesheet" type="text/css" media="all" />
	<link href="${static_ctx}/static/css/lib/jquery-ui-timepicker-addon.min.css" rel="stylesheet" type="text/css" media="all" />
	<%@include file="/WEB-INF/pages/commons/meta.jsp"%>
	<link href="${static_ctx}/static/css/lib/zTreeStyle/zTreeStyle.css" rel="stylesheet" type="text/css" media="all" />
	<link href="${static_ctx}/static/css/pagebar.css" rel="stylesheet" type="text/css" media="all" />
	<script src="${static_ctx}/static/js/lib/jquery-ui.min.js"></script>
	<script src="${static_ctx}/static/js/lib/datetimepicker/jquery-ui-timepicker-addon.min.js"></script>
	<script src="${static_ctx}/static/js/lib/datetimepicker/jquery-ui-timepicker-zh-CN.js"></script>
	<title>制作课件</title>
</head>
<body>
	<div class="container">
		<div class="wrapper">
			<!-- 头部 -->
			<%@include file="/WEB-INF/pages/commons/header.jsp"%>
			<div class="mainWrap">
				<div class="mainBgCl">
					<div class="mainBgCr">
						<div class="mainBoxCon">
							<%@include file="/WEB-INF/pages/teacher/commons/navigation.jsp" %>
							<div class="mainBox">
								<div class="mainCutBox">
									<!-- mainTitle start -->
									<div class="mainHead">
										<ul class="mainTitle">
											<li><a href="${ctx }/teacher/courseware/create/view">制作课件</a></li>
											<li class="current"><a href="">参考课件</a></li>
										</ul>
									</div>
								</div>
								<div class="mainIndex">
									<!-- left sidebar start -->
									<div class="sidebar">
										<ul class="sdbTltle">
											<li class="current"><a href="javascript:void(0);"
												id="theme" class="theme current">主题</a></li>
											<li class="sdbLine"></li>
											<li><a href="javascript:void(0);" class="special"
												id="special">专题</a></li>
										</ul>
										<div class="sdbTreeCon">
											<div class="treeOper">
												<div class="operLf">
													<a href="javascript:void(0);" class="unfold">展开</a>|<a
														href="javascript:void(0);" class="shrink">收缩</a>
												</div>
												<div class="operRt">
													<a href="javascript:void(0);" class="opAll current">全部</a>
												</div>
											</div>
										</div>
										<div style="overflow: auto; height: 724px;">
											<ul id="tree" class="ztree"></ul>
										</div>
									</div>
	
									<div class="mainConWrap">
										<div class="mainCon mainCon01">
											<div class="conNataWrap">
												<div class="conNata">
													<div class="nataSelect">
														<div class="nataHead">
															<h3 class="nataTitle">课件列表</h3>
															<div class="search">
																<input type="text" value="" placeHolder="请输入关键字搜索课件" name="" class="infoText">
																<div class="BtnGray23">
																	<a href="javascript:void(0)" class="btnSave"
																		id="btnSearch"><span>搜索</span></a>
																</div>
															</div>
														</div>
	
	
														<div class="nataList">
															<div class="ListBox">
																<dl id="phase" class="ListLine">
																	<dt>阶段：</dt>
																	<dd class="current">全部</dd>
																	<dd>新授课</dd>
																</dl>
																<dl id="src" class="ListLine">
																	<dt>来源：</dt>
																	<dd class="current">全部</dd>
																	<dd>平台</dd>
																</dl>
																<!-- <dl id="format" class="ListLine">
																	<dt>格式：</dt>
																	<dd class="current">全部</dd>
																	<dd>PPT</dd>
																	<dd>WORD</dd>
																</dl> -->
															</div>
														</div>
													</div>
													<div class="nataDetail">
														<div class="nataFilter">
															<dl class="filter">
																<dt>排序：</dt>
																<dd >
																	<a  id="default" href="javascript:void(0);" class="sortTt">默认</a>
																</dd>
																<!-- <dd>
																	<a  id="submitTime" href="javascript:void(0);" class="sort">时间<em
																		class="arrow"></em></a>
																</dd> -->
																<dd >
																	<a  id="score" href="javascript:void(0);" class="sort">好评<em
																		class="arrow"></em></a>
																</dd>
																<!-- <dd >
																	<a  id="ref" href="javascript:void(0);" class="sort">引用次数<em
																		class="arrow"></em></a>
																</dd> -->
																<!-- <dd >
																	<a id="dnd"  href="javascript:void(0);" class="sort">下载<em class="arrow"></em></a>
																</dd>
																<dd >
																	<a id="fav"  href="javascript:void(0);" class="sort">收藏<em class="arrow"></em></a>
																</dd> -->
															</dl>
														</div>
														<div id="material_list" class="nataSortList">
															
															<div id="resource_list" class="resource-list"></div>
															<div id="pagebar" class="pagebar"></div>
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
				</div>
			</div>
			<!-- 底部 -->
			<%@include file="/WEB-INF/pages/commons/footer.jsp"%>
		</div>
	</div>


	<script type="text/template" id="resource-tpl">
	{@each list as resource}
	<div class="sortListBox">
		<span class="sortIco01"></span>
		<div class="sortList">
			<div class="sortTitle" data-id=?{resource.id} style="float:left;width:70%;height:24px;"><a href="javascript:void(0);">??{resource.resourceName}</a></div>
			<div class="BtnWrap">
				<div class="BtnOrange24">
					<a id="btnNewCourse" class="btnSave" data-id=?{resource.id} href="javascript:void(0)">创建课程</a> &nbsp;&nbsp;
					<a id="btnEdit" data-id=?{resource.id} class="btnSave" href="javascript:void(0)">编辑课件</a>
				</div>
			</div> 
			<div style="clear:both;"></div>
			<div class="sortCon">
				<div class="sortBox">
					<div class="stLine"> 
						<label>引用：</label>
						<div class="stInfo">?{resource.ref} </div>
					</div>
					<div class="stLine">
						<label>阶段：</label>
						<div class="stInfo">??{resource.phase|phaseCode}</div>
					</div>
				</div>
				<div class="sortBox">
					<div class="stLine"> 
						<label>收藏：</label>
						<div class="stInfo">?{resource.fav}</div>
					</div> 
					<div class="stLine">
						<label>来源：</label>
						{@if resource.src==0}
							{@if resource.createdBy == ${user.id}}
							<div class="stInfo">我的</div>
							{@else}
							<div class="stInfo">平台</div>
						{@/if}
						{@else}
							<div class="stInfo">平台</div>
						{@/if}
					</div>
				</div>	
				<div class="sortBox">
					<div class="stLine"> 
						<label>好评：</label>
						<div class="stInfo">
							<div class="starIco">
								??{resource.score|formatscore}
							</div>	
						</div>
					</div>
				 	<div class="stLine">
						<label>提交人：</label>
						<div class="stInfo">?{resource.userName}</div>
					</div>
				</div>
				<div class="sortBox">
					<div class="stLine"></div>
					<div class="stLine">
						<label>提交时间：</label>
						<div class="stInfo">??{resource.submitTime|timeFormat}</div>
					</div>
				</div>	
			</div>
		</div>
	</div>
	{@/each}
	</script>
	 
	<script type="text/template" id="create-course-dialog-tpl">
		<div class="windowWrap">
		<div class="windowBox" style="width:650px;">
			<div class="windowT" style="background:none;">
				<div class="windowL" style="background:none;">
					<div class="windowB" style="background:none;">
						<div class="windowR" style="background:none;">
							<div class="windowMain">
								<div class="windowCon windowCon01"> 
									<div class="windowBoxTp">
										<div class="formCon formCon03">
											<div class="formList">
												<label>课件：</label>
												<div class="info">
												<span class="infoTxt"><b>?{resourceName}</b></span>
												</div>
											</div>
											<div class="formList">
												<label>章节：</label>
												<div class="info">
												<span class="infoTxt"><select id='chapterSelection'></select></span>
												<span class="infoTxt"><select id='sectionSelection'></select></span>
												</div>
											</div>
										</div>
									</div> 
									<div class="windowBoxBt">
										<div class="formCon formCon03">
											<div class="formList">
												<label class="labelTp3">班级：</label>
												<div class="info">
											{@each grades as grade}
												<div class="windowBoxTp current">
													<div class="windowBoxLf">
													<input class="infoCkb" data-id=?{grade.class_id} type="checkbox" id="?{grade.class_id}ckb">
													<span class="infoTxt">?{grade.title}</span>
													</div>
													 
													<div class="windowBoxRt">
													<label class="labelTp3">授课时间：</label>
													
													<div class="info">
														<input class="inputText" id="?{grade.class_id}date"	type="text" value=""/>
														<span class="dateIco"></span>
													 </div>
							 						</div>

													<div class="windowBoxRt">
													<label class="labelTp3">授课节数：</label>

														<div class="info">
														 <select id="?{grade.class_id}sche" class="info"></select>
													 <span class="dateIco"></span>
													</div>
													 </div>
												</div>
											</br>
											{@/each}
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
		</div>
	</div>
	</script>
	<div id="edit-div" style="display:none;width:200px;height:200px;position: absolute;z-index: 2000;border: 1px solid #cccccc;background: #ECA739">
		<p>课件为平台资源</p>
		<a id="copy" href="javascript:void(0)">复制并编辑</a>&nbsp;<a id="cancelCopy" href="javascript:void(0)">暂不编辑</a>
	</div>
	<script type="text/javascript"
		src="${static_ctx}/static/js/lib/jquery.ztree.all-3.5.min.js"></script>
	<script type="text/javascript"
		src="${static_ctx}/static/js/lib/jquery.pagebar.js"></script>
	<script type="text/javascript"
		src="${static_ctx}/static/js/teacher/resource/courseware.js"></script>
	 <%@include file="review/reviewCourseware.jsp"%>
	<script type="text/javascript">
		$(document).ready(function() {
			latte.teacher.courseware.init();
		});
	</script>
</body>
</html>

