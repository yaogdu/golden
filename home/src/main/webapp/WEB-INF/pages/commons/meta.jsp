<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="title" content="" /> 
<meta name="keywords" content="" />
<meta name="description" content="" />
<link href="${static_ctx}/static/css/common.css" rel="stylesheet" type="text/css" media="all"/>
<link href="${static_ctx}/static/css/stylesheet.css" rel="stylesheet" type="text/css" media="all"/>
<link href="${static_ctx}/static/css/index.css" rel="stylesheet" type="text/css" media="all"/>
<link href="${static_ctx}/static/css/lib/dialog.css" rel="stylesheet" type="text/css" media="all"/>

<script type="text/javascript" src="${static_ctx}/static/js/jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="${static_ctx}/static/js/lib/jquery.form.js"></script>
<script type='text/javascript' src='${static_ctx}/static/js/lib/juicer.js'></script>
<script type='text/javascript' src='${static_ctx}/static/js/lib/artDialog.js?v=${version}'></script>
<script type='text/javascript' src='${static_ctx}/static/js/lib/plugins/iframeTools.js'></script>

<script type='text/javascript' src='${static_ctx}/static/js/common/global.js'></script>

<script type='text/javascript' >
	var static_ctx = '<%=request.getContextPath() %>';
	var ctx = '<%=request.getContextPath() %>';
	var resbaseurl = '${resbaseurl}';
	var islogin = ${ islogin == null ? false : islogin };
	var user_id = ${ islogin ? user.id : "null" };
	var returnurl = null;
</script>