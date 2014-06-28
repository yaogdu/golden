<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="context" value="${pageContext.request.contextPath}" />
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
<title>教学教案搜索</title>
<link rel="stylesheet" type="text/css" href="${context}/static/css/treeview/jquery.treeview.css" />
<link rel="stylesheet" type="text/css" href="${context}/static/css/treeview/screen.css" />
<script src="${context}/static/js/treeview/jquery.js" type="text/javascript"></script>
<script src="${context}/static/js/treeview/jquery.treeview.js" type="text/javascript"></script>
<script type="text/javascript">
    $(document).ready(function() {
       $("#browser").treeview();
       
       $("#topic_id").css("border", "2px solid GREEN");
       $("#topics").show();
       $("#series").hide();
       
       $("#topic_id").click(function() {
       	$("#topic_id").css("border", "2px solid GREEN");
       	$("#series_id").css("border", "");
       	$("#topics").show();
       	$("#series").hide();
       });
       
       $("#series_id").click(function() {
       	$("#series_id").css("border", "2px solid GREEN");
       	$("#topic_id").css("border", "");
       	$("#topics").hide();
       	$("#series").show();
       });
    });
</script>
</head>
<body>
<div style="position:absolute;top:100px;left:100px;width:200px;">
       <label id="topic_id">主题</label> &nbsp &nbsp
       <label id="series_id">专题</label>
       <br />
       <div id="topics" style="position:absolute;left:10px;top:30px;">
           ${topics}
       </div>
       
       <div id="series" style="position:absolute;left:10px;top:30px;">
            <small>全部</small> <br />
            <c:forEach  var="series" items="${serieses}">
                <small>${series.name}</small><br />
            </c:forEach>
            <small>其他</small>
        </div> 
   <div style="position:absolute;top:100px;left:350px;width:650px;">
                 关键字:
       <form action="${context}/teacher/material/search" method="POST" >
          <input type="text" name="keywords" />
          <input type="submit" value="搜索" />
       </form>
       <br />
           阶段: &nbsp &nbsp 
       <label>全部</label> &nbsp
       <label>同步课件</label> &nbsp
       <label>复习课件</label><br /><br />
         来源: &nbsp &nbsp
       <label>全部</label> &nbsp
       <label>平台</label> &nbsp
       <label>校内</label> &nbsp
       <label>我的</label>
   </div>
</body>
</html>