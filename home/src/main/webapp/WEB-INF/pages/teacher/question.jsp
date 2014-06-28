<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<link href="${static_ctx}/static/css/lib/dialog.css" rel="stylesheet" type="text/css" media="all"/>
	<link href="${static_ctx}/static/css/teacher/question.css" rel="stylesheet" type="text/css" media="all"/>
	<link href="${static_ctx}/static/css/pagebar.css" rel="stylesheet" type="text/css" media="all" />
	<title>插入题目</title>
</head>
<body>
	<%-- <input type="hidden" id="unit_id" value="${unitId}" />
	<input type="hidden" id="grade" value="${grade}" />
	<input type="hidden" id="subject" value="${subject}" /> --%>
	 
	   <input type="hidden" id="topicId" value="${param.topic}" />
	 
		
	
	<div class="question-search">
		<div class="formTab">
          	<ul class="TabTit">
            	<li id="all_question" ><a href="javascript:void(0);">全部题目</a></li>
            	<li id="rel_question" class="current"><a href="javascript:void(0);">相关题目</a></li>
          	</ul>
         </div>
		<div id="search_panel" class="search-panel" >
			<dl id="src" class="row">
				<dt>来源：</dt>
				<dd class="current" val="-1">全部</dd>
				<dd>公共题库</dd>
				<dd>我的题库</dd>
			</dl>
			<dl id="type" class="row">
				<dt>题型：</dt>
				<dd class="current" val="-1">全部</dd>
				
				 <dd val="填空题">填空题</dd>
				 <dd val="实验题">实验题</dd>
				 <dd val="作图题">作图题</dd>
				 <dd val="计算题">计算题</dd>
				  <dd val="简答题">简答题</dd>
				 <dd val="综合题">综合题</dd> 
				  <dd val="单项选择">单选择</dd>
				  <dd val="单项选择">双选题</dd>
				   <dd val="多选题">多选题</dd> 
				    <dd val="多选题">多选题</dd> 
							           <!--      
							            <dd val="选择题">选择题</dd>
							            <dd val="单项选择">单项选择</dd>
							                <dd val="单项选择">双选题</dd>
							                <dd val="不定项选择题">不定项选择题</dd>
							                <dd val="多选题">多选题</dd>         
							                <dd val="简答题">简答题</dd>
							                <dd val="判断题">判断题</dd>
							                <dd val="实验题">实验题</dd>
							                <dd val="作图题">作图题</dd>
							                <dd val="计算题">计算题</dd>
							                <dd val="其他">其他</dd>
							                <dd val="填空题">填空题</dd>
							                <dd val="词汇运用">词汇运用</dd>
							                <dd val="句型转换">句型转换</dd>
							                <dd val="填空型听力">填空型听力</dd>
							                <dd val="填空型完形填空">填空型完形填空</dd>
							                <dd val="信息匹配题">信息匹配题</dd>
							                <dd val="填空型阅读理解">填空型阅读理解</dd>
							                <dd val="改错题">改错题</dd>
							                <dd val="翻译题">翻译题</dd>
							                <dd val="书面表达">书面表达</dd>
							                <dd val="辨析改错题">辨析改错题</dd>
							                <dd val="连线题">连线题</dd>
							                <dd val="材料题">材料题</dd>
							                <dd val="写作题">写作题</dd>
							                <dd val="判断题说明题">判断题说明题</dd>
							                <dd val="论述题">论述题</dd>
							                <dd val="辨析题">辨析题</dd>
							                <dd val="解答题">解答题</dd>
							                <dd val="实验探究题">实验探究题</dd>
							                <dd val="问答题">问答题</dd>
							                <dd val="信息综合题">信息综合题</dd>
							                <dd val="选择搭配题">选择搭配题</dd>
							                <dd val="选择填空题">选择填空题</dd>                   
							                <dd val="优选题">优选题</dd>                   
							                <dd val="现代文阅读">现代文阅读</dd>
							                <dd val="文言文阅读题">文言文阅读题</dd>
							                <dd val="文言文阅读">文言文阅读</dd>
							                <dd val="组合选择题">组合选择题</dd>
							                <dd val="组合填空题">组合填空题</dd>
							                <dd val="综合题">综合题</dd>
							                <dd val="组合简答题">组合简答题</dd>
							                <dd val="短对话选择型听力">短对话选择型听力</dd>
							                <dd val="选择型完形填空">选择型完形填空</dd>
							                <dd val="选择型阅读理解">选择型阅读理解</dd>
							                <dd val="探究题">探究题</dd>
							                <dd val="现代文阅读题">现代文阅读题</dd>
							                <dd val="分析说明题">分析说明题</dd>                  
							                <dd val="长对话选择型听力">长对话选择型听力</dd>  -->
			</dl>
			<dl id="topic" class="row" style="height:40px;">
				<dt>主题：</dt>
				<dd class="current" val="-1">全部</dd>
				<!-- <dd val="1">质点</dd>
				<dd val="2">牛顿第一定律</dd> -->
			</dl>
			<dl id="search_key" class="row" style="display:none;">
				<dd><input id="paper_name" class="key" type="text" name="" value="" /></dd>
				<dd><span id="btn_search" class="search clear-float" ><a class="btnSave">查询</a></span></dd>
			</dl>
		</div>
		<div class="sort-panel">
			<span id="default" class="sort-option" sort="id">默认排序<em class="sort-array down" ></em></span>
			<span id="score" class="sort-option" sort="difficulty">难度<em class="sort-array down" >↓</em></span>
			<span id="ref" class="sort-option" sort="count_ref">引用次数<em class="sort-array down" >↓</em></span>
			<span id="submitTime" class="sort-option" sort="paper_year">年份<em class="sort-array down" >↓</em></span>
		</div>
		<div id="resource_list" class="resource-list"></div>
		<div id="pagebar" class="pagebar"></div>
	</div>

	<script type="text/javascript" src="${static_ctx}/static/js/lib/jquery.js"></script>
	<script type='text/javascript' src='${static_ctx}/static/js/lib/juicer.js'></script>
	<script type='text/javascript' src='${static_ctx}/static/js/lib/artDialog.js'></script>
	<script type="text/javascript" src="${static_ctx}/static/js/lib/jquery.pagebar.js"></script>
	<script type='text/javascript' src='${static_ctx}/static/js/common/global.js'></script>
	<%@include file="question-tpl.jsp" %>
	<script type="text/javascript" src="${static_ctx}/static/js/teacher/question.js"></script>
	
	<script type="text/javascript">
		var static_ctx = '<%=request.getContextPath() %>';
		var ctx = '<%=request.getContextPath() %>';
		var whiteboard_host = '${param.url}';
		$(document).ready(function() {
			latte.teacher.question.init();
		});
	</script>
</body>
</html>

