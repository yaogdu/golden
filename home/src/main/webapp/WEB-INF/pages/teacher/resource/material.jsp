<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@include file="/WEB-INF/pages/commons/meta.jsp"%>
	<link href="${static_ctx}/static/css/lib/zTreeStyle/zTreeStyle.css" rel="stylesheet" type="text/css" media="all" />
	<link href="${static_ctx}/static/css/pagebar.css" rel="stylesheet" type="text/css" media="all" />
	<title>教学资料</title>
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
									<div class="mainHead" style="display:none;">
										<ul class="mainTitle">
											<li class="current"><a href="">教学资料搜索</a></li>
											<li><a href="">学习任务推送</a></li>
											<li><a href="">设计新任务</a></li>
										</ul>
									</div>
								</div>
								<div class="mainIndex">
									<!-- left sidebar start -->
									<div class="sidebar">
										<ul class="sdbTltle">
											<li class="current"><a href="javascript:void(0);" id="theme" class="theme current">主题</a></li>
											<li class="sdbLine"></li>
											<li><a href="javascript:void(0);" class="special" id="special">专题</a></li>
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
															<h3 class="nataTitle">教学资料列表</h3>
															<div class="search">
																<input type="text" value="" name="" placeHolder="请输入关键字搜索资料" class="infoText">
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
																<dl id="format" class="ListLine">
																	<dt>格式：</dt>
																	<dd class="current">全部</dd>
																	<dd>PPT</dd>
																	<dd>WORD</dd>
																</dl>
															</div>
														</div>
													</div>
													<div class="nataDetail">
														<div class="nataFilter">
															<dl class="filter">
																<dt>排序：</dt>
																<dd >
																	<a id="default" href="javascript:void(0);" class="sortTt">相关度</a>
																</dd>
																<dd>
																	<a id="submitTime" href="javascript:void(0);" class="sort">时间<em
																		class="arrow"></em></a>
																</dd>
																<dd >
																	<a id="score" href="javascript:void(0);" class="sort">好评度<em
																		class="arrow"></em></a>
																</dd>
																<dd >
																	<a id="dnd"  href="javascript:void(0);" class="sort">下载<em class="arrow"></em></a>
																</dd>
																<dd >
																	<a id="fav"  href="javascript:void(0);" class="sort">收藏<em class="arrow"></em></a>
																</dd>
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
		<em class="ico-?{resource.resourceFormat} res-mag-ico"></em>
		<div class="sortList">
			<div class="sortTitle" data-id=?{resource.id} style="float:left;width:70%;height:24px;"><a href="javascript:void(0);">??{resource.resourceName}</a></div>
			<div class="BtnWrap">
				<div class="BtnOrange24">
					<a id="btnFav" class="btnSave" data-id=?{resource.id} href="javascript:void(0)">收藏</a> &nbsp;&nbsp;
					<a id="btnDnd" data-id=?{resource.id} class="btnSave" href="javascript:void(0)">下载</a>
				</div>
			</div> 
			<div style="clear:both;"></div>
			<div class="sortCon">
				<div class="sortBox">
					<div class="stLine"> 
						<label>大小：</label>
						<div class="stInfo"><b>?{resource.fileSize|fileSizeFormat}</b></div>
					</div>
					<div class="stLine">
						<label>阶段：</label>
						<div class="stInfo">??{resource.phase|phaseCode}</div>
					</div>
				</div>
				<div class="sortBox">
					<div class="stLine"> 
						<label>收藏：</label>
						<div class="stInfo"><b>?{resource.fav} </b></div>
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
				<div class="sortBox" style="width:170px;">
					<div class="stLine"> 
						<label>下载：</label>
						<div class="stInfo"><b>?{resource.dnd}</b></div>
					</div>
					<div class="stLine">
						<label>提交人：</label>
						<div class="stInfo">?{resource.userName}</div>
					</div>
				</div>	
				<div class="sortBox" style="width:172px;">
					<div class="stLine"> 
						<label>好评：</label>
						<div class="stInfo">
							<div class="starIco">
								??{resource.score|formatscore}
							</div>	
						</div>
					</div>
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
	
	<%@include file="review/review.jsp"%>
	<script type="text/javascript" src="${static_ctx}/static/js/lib/jquery.ztree.all-3.5.min.js"></script>
	<script type="text/javascript" src="${static_ctx}/static/js/lib/jquery.pagebar.js"></script>
	<script type="text/javascript" src="${static_ctx}/static/js/teacher/resource/material.js"></script>
	<script type="text/javascript">
		$(document).ready(function() {
			latte.teacher.material.init();
		});
	</script>
</body>
</html>

