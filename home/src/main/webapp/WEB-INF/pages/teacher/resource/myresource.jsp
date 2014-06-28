<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@include file="/WEB-INF/pages/commons/meta.jsp"%>
	<title>课件</title>
	<link href="${static_ctx}/static/css/lib/zTreeStyle/zTreeStyle.css" rel="stylesheet" type="text/css" media="all" />
	<link href="${static_ctx}/static/css/pagebar.css" rel="stylesheet" type="text/css" media="all" />
</head>
<body>
	<div class="container">
		<div class="wrapper">
			<!-- 头部 -->
			<%@include file="/WEB-INF/pages/commons/header.jsp" %>
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
										 	<li class="current"><a href="${ctx }/teacher/resource/myresource" >我上传的资源</a></li>
						                    <li><a  href="${ctx }/teacher/resource/myfocus/2" >我的收藏</a></li>
						                    <li><a  href="${ctx }/teacher/resource/myfocus/3" >我的下载</a></li>
						                   <%--  <li><a  href="${ctx }/teacher/resource/myfocus/1" >我的引用</a></li> --%>
										</ul>
									</div>
								</div>
								<div class="mainIndex">
									<!-- left sidebar start -->
									<div class="sidebar">
										<ul class="sdbTltle">
											<li style="border-bottom: 1px solid #DDDDDD;width:100%;font-weight: bold;height: 35px;line-height:35px;text-align:left;padding-left:10px;" >资源分类</li>
										</ul>
										<div style="overflow: auto; height: 764px;">
							          		<ul id="tree" class="ztree"></ul>
							          	</div>
									</div>
									<div class="mainConWrap">
										<div class="mainCon mainCon01">
											<div class="conNataWrap">
												<div class="nataHead nataHead01">
					                            	<div class="mainTabWrap">
					                              		<ul class="mainTab">
							                                <li class="current"><a data-id=2 href="javascript:void(0)"><span>共享</span></a></li>
							                                <li><a data-id=0 href="javascript:void(0)"><span>私有</span></a></li>
							                                <li><a data-id=-1 href="javascript:void(0)"><span>提交中</span></a></li>
						                              	</ul>
						                            </div>
						                            <div class="search">
						                              	<div class="BtnGray23">
						                               		<a href="${ctx }/teacher/resource/createCourseware" class="btnSave" id="btnSave"><span>上传资源</span></a>
						                              	</div>
						                              	<div class="BtnGray23">
						                               		<a href="javascript:void(0)" class="btnSave" id="rm"><span>分类管理</span></a>
						                              	</div>
						                              	<div class="BtnGray23">
						                               		<a href="javascript:void(0)" class="btnSave" id="btnDel"><span>删除</span></a>
						                              	</div>
						                              	<div class="BtnGray23">
						                               		<a href="javascript:void(0)" class="btnSave" id="btnMove"><span>移动</span></a>
						                              	</div>
					                            	</div>
				                          		</div>
												<div class="conNata">
													<div class="nataSelect">
														<div class="nataList">
															<div class="ListBox">
																<dl class="ListLine">
																	<dt>类型：</dt> 
																	<dd data-id=0 class="current">课件</dd>
																	<dd data-id=2>素材</dd>
																	<dd data-id=1>教学资料</dd>
																	<dd data-id=3>试卷</dd>
																</dl>
															</div>
														</div>
													</div>
													<div class="nataDetail">
														<div class="list list01">
															<table class="listTable">
																<thead>
																<tr>
																	<th width="10"><input type="checkbox" id="cbks"></th>
																	<th>资源名称</th>
																	<th>类型</th>
																	<th><a href="" class="listSort">创建时间 <em></em></a></th>
																	<th>状态</th>
																	<th class="last">操作</th>
																</tr>
																</thead>
																<tbody id="resource_list" ></tbody>
															</table>
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
			<%@include file="/WEB-INF/pages/commons/footer.jsp" %>
		</div>
	</div>
	
	<script type="text/template" id="resource-tpl">
	{@each list as resource}
		 <tr>
		    <td><input  type="checkbox" name="chk" value=?{resource.id}></td>                        
			<td><em class="ico-?{resource.resourceFormat} res-mag-ico"></em><a data-id=?{resource.id} data-type=?{resource.resourceType} class="infoLabel">?{resource.resourceName}</a></td>
			<td>?{resource.resourceType|getResourceType} </td>
			<td>??{resource.submitTime|getDate}</td>
			<td>?{resource.checkStatus|getCheckStatus}</td>
			<td><span class="oper"><a class="off" href="">编辑</a> | <a class="off" href="">删除</a> </span></td>
		</tr>
	{@/each}
	</script>
	<script type="text/javascript"
		src="${static_ctx}/static/js/lib/jquery.ztree.all-3.5.min.js"></script>
	<script type="text/javascript"
		src="${static_ctx}/static/js/lib/jquery.pagebar.js"></script>
	<script type="text/javascript"
		src="${static_ctx}/static/js/teacher/resource/myresource.js"></script>
	<%@include file="review/reviewCourseware.jsp"%>
	<%@include file="review/review.jsp"%>
	<%@include file="review/reviewClip.jsp"%>
	<%@include file="review/reviewTestPaper.jsp"%>
	<script type="text/javascript">
		$(document).ready(function() {
			latte.teacher.rb.init();
		});
	</script>
	
</body>
</html>

