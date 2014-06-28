<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@include file="/WEB-INF/pages/commons/meta.jsp"%>
	<title>分类管理</title>
	<script src="${static_ctx}/static/js/teacher/resourceManagementPopUp.js" type="text/javascript"></script>
</head>
<body>
	<div class="windowWrap">
		<div class="windowBox" style="width:492px;">
    		<div class="windowT">
      			<div class="windowL">
        			<div class="windowB">
          				<div class="windowR">
<!--           					<div class="windowTitle"> -->
          						<input type="hidden" id="context" value="${static_ctx}"/>
<!--  			              		<h3>分类管理</h3>  -->
<!-- 			              		<div class="windowTools"><a class="close" href="javascript:void(0);"></a></div> -->
<!-- 			            	</div> -->
			            	 <div class="windowMain">
			            	 	<div class="windowCon">
			            	 		<div class="list list01">
                  						<table class="listTable">
						                    <thead>
						                      	<tr>
							                        <th>分类名称</th>
							                        <th width="60">上移</th>
							                        <th width="60">下移</th>
							                        <th width="60">删除</th>
						                      	</tr>
						                    </thead>
	                    					<tbody id="tb">
	                    						<tr id="flagtr" style="display: none;"></tr>
											    <tr id="parent_1">
												    <td><input type="text" class="infoText" maxlength="30" id="parent_input_1"/></td>
												    <td><a class="first" href="javascript:void(0);" id="parent_up_1"></a></td>
													<td><a class="down" href="javascript:void(0);" id="parent_down_1"></a></td>
													<td><a class="del" href="javascript:void(0);" id="parent_delete_1"></a></td>
											    </tr>
											    <tr>
							                        <td rowspan="4">
							                          	<div class="BtnGray23">
							                          		<a id="newCategory" class="btnSave" href="javascript:void(0)"><span>新建分类</span></a>
							                          	</div>
							                        </td>
							                        <td></td>
							                        <td></td>
							                        <td></td>
							                	</tr>
	                    					</tbody>
	                    				</table>
	                    			</div>
			            	 	</div>
			            	 	<div class="BtnWrap">
				                	<div class="BtnBlue23">
				                 		<a href="javascript:void(0)" class="btnSave" id="saveCategories"><span>保存</span></a>
				                	</div>
				                	<div class="BtnGray23">
				                 		<a href="javascript:void(0)" class="btnSave" onclick="cancel()"><span>取消</span></a>
				                	</div>
				              	</div>
			            	</div>
          				</div>
          			</div>
          		</div>
          	</div>
          </div>
	</div>
</body>
</html>

