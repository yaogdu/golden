<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/school/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@include file="/WEB-INF/pages/commons/school/meta.jsp"%>
	
	<script src="${static_ctx}/static/js/school/class/graduate.js" type="text/javascript"></script>
	<title>毕业管理</title>
</head>
<body>
	<div class="container">
		<%@include file="/WEB-INF/pages/commons/school/header.jsp" %>
		<div class="mainWrap">
        	<div class="mainIndex">
        		<%@include file="include/left-menu.jsp" %>
        		<div class="mainCon">
        			<div class="mainTitle">
			           	<p>毕业管理</p>
		           		<div class="operBtn">
		             		<div class="BtnWhite28">
		               			<a href="javascript:void(0)" class="btnSave" onclick="graduate()">确认毕业</a>
		             		</div>
		             		<div class="BtnWhite28">
		             			<a href="javascript:window.history.back(-1);" class="btnSave"><span class="returnIco"></span>返回</a>
		             		</div>
		           		</div>
					</div>
        			<div class="mainPart">
        				<div class="conBox">
        					<input type="hidden" id="context" value="${static_ctx}"/>
            				
        					<div class="conShow">
              					<div class="list">
              						<table class="listTable">
					                    <thead>
					                      	<tr>
						                        <th>入学年级</th>
						                        <th>学段</th>
						                        <th>年级</th>
						                        <th>班级数量</th>
					                      	</tr>
					                    </thead>
					                    <tbody id="bodyData">
					                    	<c:forEach var="item" items="${classList }">
												<tr>
													<td>${item.academicYear }</td>
													<td>${item.stage }</td>
													<td>${item.grade }</td>
													<td>${item.classCount }</td>
												</tr>
											</c:forEach>
					                    </tbody>
				                    </table>
        						</div>
        					</div>
        				</div>
        			</div>
        		</div>
        	</div>
        </div>
        <%@include file="/WEB-INF/pages/commons/school/footer.jsp"%>
	</div>
</body>
</html>

