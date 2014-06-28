<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<div id="resource_list_dialog" style="display:none;" >
	<div class="mainConWrap resourceDialog">
		<div class="mainCon mainCon01">
			<div class="conNataWrap">
				<div class="conNata">
					<div class="nataSelect">
						<div class="nataHead">
							<h3 class="tab current">全部素材</h3>
							<h3 class="tab">相关素材</h3>
							<div class="search">
								<input type="text" value="" name="" class="infoText">
								<div class="BtnGray23">
									<a href="javascript:void(0)" class="btnSave"
										id="btnSearch"><span>搜索</span></a>
								</div>
							</div>
						</div>
						<div class="nataList">
							<div class="ListBox">
								<!-- <dl id="phase" class="ListLine">
									<dt>阶段：</dt>
									<dd class="current">全部</dd>
									<dd>新授课</dd>
								</dl> -->
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
								<dd>
									<a id="ref" href="javascript:void(0);" class="sort">引用数量<em class="arrow"></em></a>
								</dd>
								<dd >
									<a id="fav"  href="javascript:void(0);" class="sort">收藏<em class="arrow"></em></a>
								</dd>
								<dd >
									<a id="score" href="javascript:void(0);" class="sort">好评度<em class="arrow"></em></a>
								</dd>
								
							</dl>
						</div>
						<div class="nataSortList">
							<div id="resource_list" class="resource-list" style="height:420px;overflow:auto;"></div>
							<div id="resource_pagebar" class="pagebar"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<script type="text/template" id="resource-list-tpl">
	{@each list as resource}
		<div class="sortListBox">
		<em class="ico-?{resource.resourceFormat} res-mag-ico"></em>
		<div class="sortList">
			<h3 class="sortTitle"><a href="javascript:void(0);">??{resource.resourceName}</a></h3>
			<div class="sortCon">
				<div class="sortBox">
				<div class="stLine"> 
					<label>大小：</label>
					<div class="stInfo"><b>?{resource.fileSize|fileSizeFormat}</b></div>
				</div>
				 <div class="stLine">
					<label>来源：</label>
					<div class="stInfo">?{resource.src|srcCode}</div>
				</div>
				</div>
				<div class="sortBox">
				<div class="stLine"> 
					<label>收藏：</label>
					<div class="stInfo"><b>?{resource.fav}</b></div>
				</div>
				<div class="stLine">
					<label>提交人：</label>
					<div class="stInfo">?{resource.userName}</div>
				</div>
				</div>	
				<div class="sortBox">
				<div class="stLine"> 
					<label>下载：</label>
					<div class="stInfo"><b>?{resource.dnd}</b></div>
				</div>
				<div class="stLine">

<label>好评：</label>
					<div class="stInfo">
					<div class="starIco">
						??{resource.score|formatscore}
					</div>	
					</div>
					
				</div>
				</div>	
				<div class="sortBox">
				<div class="stLine"> 
					<label>提交时间：</label>
					<div class="stInfo">??{resource.submitTime|timeFormat}</div>
				</div>
				</div>
			</div>
		</div>
		<div class="BtnWrap">
			<div class="BtnOrange24">
				<a data-id=?{resource.id} id="btnFav" class="btnSave" href="javascript:void(0)">收藏</a> &nbsp;&nbsp;
				<a data-id=?{resource.id} id="btnRef" class="btnSave" href="javascript:void(0)">引用</a>
			</div>
		</div> 
	</div>
	{@/each}
</script>

<%@include file="/WEB-INF/pages/commons/preview.jsp" %>

<link href="${static_ctx}/static/css/pagebar.css" rel="stylesheet" type="text/css" media="all" />
<script type="text/javascript" src="${static_ctx}/static/js/lib/jquery.pagebar.js"></script>
<script type='text/javascript' src='${static_ctx}/static/js/common/resource-list.js'></script>

