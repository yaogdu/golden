<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/school/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@include file="/WEB-INF/pages/commons/school/meta.jsp"%>
	<script src="${static_ctx}/static/js/school/courseTemplate/updateCourseTemplate.js" type="text/javascript"></script>
	<title>编辑课程模板</title>
</head>
<body>
	<div class="container">
		<%@include file="/WEB-INF/pages/commons/school/header.jsp" %>
		<div class="mainWrap">
        	<div class="mainIndex">
        		<%@include file="include/left-menu.jsp" %>
        		<div class="mainCon">
        			<div class="mainTitle"><span>编辑课程模板</span></div>
        			<div class="mainPart">
           				<div class="conBox">
           					<input type="hidden" id="context" value="${static_ctx}"/>
        					<input type="hidden" id="courseTemplateId" value="${ct.id }"/>
           					<div class="conFormList conFormList01">
           						<div class="conForm">
					            	<label>学段：</label>
					                <div class="info">
					                  	<span class="infoLabel">${ct.stage }</span>
					                </div>
              					</div>
				              	<div class="conForm">
					                <label>年级：</label>
					                <div class="info">
					                  	<span class="infoLabel">${ct.grade }</span>
					                </div>
				              	</div>
				              	<div class="conForm">
					                <label>学科：</label>
					                <div class="info">
					                  	<span class="infoLabel">${ct.subject }</span>
					                </div>
				              	</div>
				              	<div class="BtnWrap BtnWrap01">
					                <div class="BtnBlue22">
					                  	<a href="javascript:void(0)" class="btnSave" onclick="update()">完成</a>
					                </div>
					                <div class="BtnGray22">
					                  	<a href="javascript:void(0)" class="btnSave" onclick="back()">取消</a>
					                </div>
				              	</div>
           					</div>
           					<div class="conShow">
           						<c:set var="c_index" value="1"></c:set>
                				<c:set var="s_index" value="1"></c:set>
           						<div class="moduleItem">
           							<h3 class="moduleItemTitle">
                    					<span class="titleLine">推荐课程</span>
                    					<span>推荐资源</span>
                					</h3>
           							<div class="treewrap treewrap01">
					                  	<ul class="treeRoot">
											<c:forEach items="${list }" var="item" varStatus="sta">
			           							<c:choose>
			           								<c:when test="${item.category == 1 }">
			           									<li id="chapter_${c_index }" class="treeLi">
															<div id="chapter_modify_${c_index }" class="tree1Node tree1Node02">
																<div class="tree1Info">
																<a href="javascript:void(0);" class="tree1Aarrow">&nbsp;</a>
																<span class="tree1NodeFolder"></span>
																<div class="tree1NodeName"><span id="chapter_title_${c_index }">第一章</span></div>
																<input id="chapter_input_${c_index }" type="text"  value="${item.name }" class="inputText" maxlength="30"/>
															    <div class="BtnWrap">
															      	<div class="BtnBlue23">
															       		<a class="btnSave" href="javascript:void(0)" onclick="saveChapter('${c_index }');"><span>确定</span></a>
															      	</div>
															      	<div class="BtnGray23">
															       		<a class="btnSave" href="javascript:void(0)" onclick="cancelSaveChapter('${c_index }');"><span>取消</span></a>
															      	</div>
															    </div>
																</div>
															</div>
															
															<div id="chapter_show_${c_index }" class="tree1Node">
																<div class="tree1Info">
																		<a href="javascript:void(0);" class="tree1Aarrow">&nbsp;</a>
																		<span class="tree1NodeFolder"></span>
																	<div class="tree1NodeName"><span id="chapter_title2_${c_index }">第一章</span>&nbsp;<span id="chapter_input_value_${c_index }">${item.name }</span></div>
																</div>
																<div class="treeShow">
																  	<a id="chapter_img_${c_index }" href="javascript:void(0);" class="showIco"></a>
																</div>
															</div>
															
															<div class="tree1Box">
																<ul id="lefts_${c_index }" class="treeUl">
															  	
																</ul>
																<ul id="rights_${c_index }" class="treeUl treeUl01">
																  	
																</ul>
															</div>
														</li>
														<c:set var="c_index" value="${c_index + 1 }"></c:set>
						                				<c:set var="s_index" value="1"></c:set>
			           								</c:when>
			           								<c:otherwise>
			           									<li id="sectionLeft_${c_index - 1 }_${s_index }" class="treeLi">
			
															<div id="sectionLeft_modify_${c_index - 1 }_${s_index }" class="tree1Node tree1Node02">
																<div class="tree1Info">
																	<span class="tree1NodeIndent">
															  		<b class="tree1NodeLine3"></b>
																	</span>
																	<a href="javascript:void(0);" class="tree1Active">&nbsp;</a>
																	<span class="tree1NodeFolder"></span>
																	<div class="tree1NodeName"><span id="sectionLeft_title_${c_index - 1 }_${s_index }">第一节</span>&nbsp;</div>
																	<input id="sectionLeft_input_${c_index - 1 }_${s_index }" type="text" value="${item.name }" class="inputText" maxlength="30"/>
																    <div class="BtnWrap">
																      	<div class="BtnBlue23">
																       		<a class="btnSave" href="javascript:void(0)" onclick="saveSection('${c_index - 1 }_${s_index }')"><span>确定</span></a>
																      	</div>
																      	<div class="BtnGray23">
																       	<a class="btnSave" href="javascript:void(0)" onclick="cancelSaveSection('${c_index - 1 }_${s_index }')"><span>取消</span></a>
																      	</div>
																    </div>
																</div>
															</div>
														
															<div id="sectionLeft_show_${c_index - 1 }_${s_index }" class="tree1Node">
																<div class="tree1Info">
																	<span class="tree1NodeIndent">
																 	<b class="tree1NodeLine3"></b>
																	</span>
																	<a href="javascript:void(0);" class="showIco" >&nbsp;</a>
																	<span class="tree1NodeFolder">&nbsp;</span>
																	<div class="tree1NodeName"><span id="sectionLeft_title2_${c_index - 1 }_${s_index }">第一节</span>&nbsp;<span id="section_input_value_${c_index - 1 }_${s_index }">${item.name }</span></div>
																</div>
																<div class="treeShow">
								                            		<a class="showIco" id="section_img_${c_index - 1 }_${s_index }" href="javascript:void(0);"></a>
								                            	</div>
															</div>
														</li>
														
														
														<li id="sectionRight_${c_index - 1 }_${s_index }" class="treeLi">
			
															<div id="sectionRight_empty_${c_index - 1 }_${s_index }" class="tree1Node">
															</div>
															
															<div id="sectionRight_show_${c_index - 1 }_${s_index }" class="tree1Node">
															  	<div class="tree1Info">
															    	<a class="treeIco" href="javascript:void(0);"></a>
															    	<span class="tree1NodeFolder"></span>
															    	<a id="sectionRight_r_${c_index - 1 }_${s_index }" class="tree1NodeName" href="javascript:void(0);" target="_blank"></a>
															  	</div>
															</div>
															
														</li>
														<c:set var="s_index" value="${s_index + 1 }"></c:set>
			           								</c:otherwise>
			           							</c:choose>
			           						</c:forEach>
					                  	</ul>
					                </div>
           						</div>
           						
           						<ul id="ChapterLinks" class="treeRoot">
			                    	<li class="treeLi">
				                      	<div class="tree1Node">
					                        <div class="treeShow">
					                          	<!-- <a class="showIco" href=""></a> -->
					                          	<ul style="display:block" class="treeSwBox">
						                            <li>
						                              	<a href="javascript:void(0);">添加<em class="arrowIco"></em></a>
						                              	<ul class="tree2">
							                                <li><a id="addChildSectionLink" href="javascript:void(0);">本章小节</a></li>
							                                <li><a id="addChapterPreviousLink" href="javascript:void(0);">同级前章</a></li>
							                                <li><a id="addChapterNextLink" href="javascript:void(0);">同级后章</a></li>
						                              	</ul>
						                            </li>
						                            <li><a id="deleteChapterLink" href="javascript:void(0);">删除</a></li>
						                            <li><a id="renameChapterLink" href="javascript:void(0);">重命名</a></li>
					                          	</ul>
					                        </div>
				                      	</div>
			                    	</li>
			                  	</ul>
			                  	
			                  	<ul id="SectionLinks" class="treeRoot">
			                    	<li class="treeLi">
				                      	<div class="tree1Node">
					                        <div class="treeShow">
					                          	<!-- <a class="showIco" href=""></a> -->
					                          	<ul style="display:block" class="treeSwBox">
						                            <li>
						                              	<a href="javascript:void(0);">添加<em class="arrowIco"></em></a>
						                              	<ul class="tree2">
							                                <li><a id="addSectionPreviousLink" href="javascript:void(0);">同级前节</a></li>
							                                <li><a id="addSectionNextLink" href="javascript:void(0);">同级后节</a></li>
						                              	</ul>
						                            </li>
						                            <li><a id="deleteSectionLink" href="javascript:void(0);">删除</a></li>
						                            <li><a id="renameSectionLink" href="javascript:void(0);">重命名</a></li>
					                          	</ul>
					                        </div>
				                      	</div>
			                    	</li>
			                  	</ul>
           						
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

