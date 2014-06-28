<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@include file="/WEB-INF/pages/commons/meta.jsp"%>
	<link href="${static_ctx}/static/css/teacher/resourceManagement.css" rel="stylesheet" type="text/css" media="all"/>
	<script src="${static_ctx}/static/js/teacher/resourceManagement.js" type="text/javascript"></script>
	<title>分类管理</title>
</head>
<body>
	<!-- 头部 -->
	<%@include file="/WEB-INF/pages/commons/header.jsp" %>
	<div class="content">
		<input type="hidden" id="context" value="${static_ctx}"/>
		<div class="main-content">
			<div class="cmContent">
				<%-- <%@include file="/WEB-INF/pages/includes/leftnav.jsp" %>--%>
				<div class="content-detail">
					<div class="category-detail-panel">
						<div class="category-detail-title">
							<label class="title-long">分类名称</label>
							<label class="title-short">添加子分类</label>
							<label class="title-short">上移</label>
							<label class="title-short">下移</label>
							<label class="title-short">删除</label>
							<label class="title-long">移动到该分类下方</label>
						</div>
						<div class="category-detail-info" id="parent_1">
							<div><input type="text" class="category-input" maxlength="30" id="parent_input_1"/></div>
							<div class="category-parent-blank"></div>
							<div class="add-category"><a href="javascript:void(0);" id="parent_addChild_1"><img src="${static_ctx}/static/img/teacher/resourceManagement/add.png"></a></div>
							<div class="up-category"><a href="javascript:void(0);" id="parent_up_1"><img src="${static_ctx}/static/img/teacher/resourceManagement/up.png"></a></div>
							<div class="down-category"><a href="javascript:void(0);" id="parent_down_1"><img src="${static_ctx}/static/img/teacher/resourceManagement/down.png"></a></div>
							<div class="delete-category"><a href="javascript:void(0);" id="parent_delete_1"><img src="${static_ctx}/static/img/teacher/resourceManagement/delete.png"></a></div>
							<div class="change-category-blank">
							</div>
						</div>
						<div class="category-detail-opertation">
							<span class="btn-bar" id="newCategory">新建分类</span>
							<span class="btn-bar" id="saveCategories">保存</span>
						</div>
					</div>
				</div>
				<div class="clear"></div>
			</div>
		</div>
	</div>
	<!-- 底部 -->
	<%@include file="/WEB-INF/pages/commons/footer.jsp" %>
	
	<script type="text/javascript" src="${static_ctx}/static/js/lib/jquery.pagebar.js"></script>
</body>
</html>

