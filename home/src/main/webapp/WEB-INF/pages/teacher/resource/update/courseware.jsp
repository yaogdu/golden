<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@include file="/WEB-INF/pages/commons/meta.jsp"%>
	<title>制作课件</title>
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
									<div class="mainHead">
										<ul class="mainTitle">
											<li class="current"><a href="">上传资源</a></li>
										</ul>
									</div>
								</div>
								<div class="mainIndex">
									<div class="mainConWrap" style="float:none;margin:0;">
										<div class="nataHead nataHead01">
			                            	<div class="mainTabWrap" style="border:0;padding:0;">
			                              		<ul class="mainTab" style="float:none;">
					                                <li style="line-height:normal;"><a data-id=2 href="javascript:void(0)"><span>课件</span></a></li>
					                                <li style="line-height:normal;"  class="current"><a data-id=0 href="javascript:void(0)"><span>教学资料</span></a></li>
					                                <li style="line-height:normal;"><a data-id=-1 href="javascript:void(0)">素材</a></li>
				                              	</ul>
				                              	<div class="conFormWrap">
					                              	<div class="formCon">
					                              		<!-- 	<div id="courseware_addway" class="formList">
														<label><em>*</em>添加方式：</label>
														<div class="infoRadio">
															<input type="radio"  name="addway" value="0" checked="checked" class="infoRadio">本地上传
														</div>
														<div class="infoRadio">
															<input type="radio" name="addway" value="1" class="infoRadio">在线制作
														</div> 
									                </div>-->
					                              	
										                <div id="courseware_file" class="formList">
															<label><em>*</em>选择文件：</label>
															<span id="file" class="btn-blue22 w80" ><a class="btnSave">上传文件</a></span>
															<div class="info" style="display:none;" >
																<div class="infoSwBox">
																	<a href="javascript:void(0);" class="infoSw">
																		<span class="swIco01"></span>
																		<p id="courseware_file_name"></p>
																	</a>
																	<div class="infoBarBox">
																		<div class="infoBar">
																			<div style="width:0%" class="barBg"></div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
										                <div id="courseware_name" class="formList">
															<label><em>*</em>标题：</label>
															<div class="info">
															<input type="hidden" id="id" value="${id }"/>
																<input type="text" maxlength="45" id="resourceName" name="" value="" size="30" class="infoText">
															</div>
										                </div>
										                <div id="courseware_desc" class="formList">
															<label>简介：</label>
															<div class="info">
																<textarea maxlength="100" class="infoTextarea"  placeholder="选填"></textarea>
															</div>
														</div>
														
									            		<!-- <div id="courseware_format" class="formList">
										                  <label><em>*</em>格式：</label>
															<div class="info">
																<select  id="resourceFormat" class="infoSelect">
																	
																</select>
																
															</div>
										                </div> -->
														<div id="courseware_sharelevel" class="formList">
															<label><em>*</em>是否共享：</label>
															<div class="infoRadio">
																<input type="radio"  name="sharelevel" value="0" checked="checked" class="infoRadio">私有(<span>只有你本人可以查看</span>)
															</div>
															<!-- <div class="infoRadio">
																<input type="radio" name="sharelevel" value="1" class="infoRadio">校内共享(<span>本校范围都可查看</span>)
															</div> -->
															<div class="infoRadio">
																<input type="radio" name="sharelevel" value="2" class="infoRadio">平台共享(<span>本校及所有学校都可查看，需要审核</span>)
															</div>
										                </div>
														<div id="hidden">
														<div id="courseware_phase" class="formList">
															<label><em>*</em>阶段：</label>
															 
														</div>
														
														
														
														<div id="courseware_selector1" class="formList">
															<label><em>*</em>学段/学科：</label>
															<div class="info">
																<select id="stage" class="infoSelect"></select>
																<select id="subject" class="infoSelect"></select>
															</div>
														</div>
														
														<div class="formList">
															<label>主题：</label>
															 <div class="info">
																<div class="infoAdd">
																  <div class="AddBoxWrap">
																	<select id="zhuti_module" size="10"  class="AddBox">
																	</select>
																  </div>
																  <div class="AddBoxWrap">
																		<select id="zhuti_unit" size="10" class="AddBox"></select>
																  </div>
																  <div class="AddBoxWrap">
																	<select id="zhuti_topic" size="10" class="AddBox"></select>
																  </div>
																  <div class="BtnWrap">
																	<span class="btn-blue22" onclick="latte.teacher.courseware.linkTopic($('#zhuti_topic'),$('#zhuti_selected'));"><a class="btnSave">添加</a></span>
																  	<span class="btn-blue22 margin-top5" onclick="latte.teacher.courseware.unlinkTopic($('#zhuti_topic'),$('#zhuti_selected'));"><a class="btnSave">删除</a></span>
																  </div>
																  <div class="AddBoxWrap AddBoxWrap01">
																	<select id="zhuti_selected" size="10" class="AddBox"></select>
																  </div>
																</div>
															  </div>
														</div>
														<div class="formList">
															<label>专题：</label>
															<div class="info">
																<select id="seriesModule" class="infoSelect"></select>
																<select id="series" class="infoSelect"></select>
															</div>
														</div>
														
														<div class="formList">
															<label>上传到：</label>
															<div class="info">
																<select id="rms" class="infoSelect"></select>
															</div>
														</div>
														
														
														<!-- <div id="courseware_audience" class="formList">
															<label><em>*</em>适应对象：</label>
															<div class="info">
																<div class="infoBox">
																	<input id="auth_teacher" type="checkbox" name="audience" class="infoCheckbox" value="" >
																	<p class="infoLabel">老师（老师可查看）</p>
																</div>
																<div class="infoBox">
																	<input id="auth_student" type="checkbox" name="audience" class="infoCheckbox" value="" >
																	<p class="infoLabel">学生（学生可查看）</p>
																</div>
															</div>
														</div>
														</div> -->
													</div>
													
										 
												</div>
												<div class="conBtnWrap">
													 <span id="btn_save_courseware" class="BtnBlue24" ><a class="btnSave">提交信息</a></span>
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
	
	<script type="text/template" id="theme-selector-tpl">
		<div>
			<div style="display:inline-block;" >
				<select id="zhuti_module" size="10" style="min-width:120px;border:1px solid #CCCCCC;">
				</select>
			</div>
			<div style="display:inline-block;min-width:120px;">
				<select id="zhuti_unit" size="10"  style="min-width:120px;border:1px solid #CCCCCC;">
				</select>
			</div>
			<div style="display:inline-block;min-width:120px;">
				<select id="zhuti_topic" size="10" style="min-width:120px;border:1px solid #CCCCCC;">
				</select>
			</div>
			<div style="display:inline-block;width:50px;">
				<button class="btn-yellow" style="width:50px;height:25px;padding:0;" onclick="latte.teacher.courseware.linkTopic($('#zhuti_topic'),$('#zhuti_selected'));">添加&gt;&gt;</button>
				<br><br>
				<button class="btn-yellow" style="width:50px;height:25px;padding:0;" onclick="latte.teacher.courseware.unlinkTopic($('#zhuti_topic'),$('#zhuti_selected'));">&lt;&lt;删除</button>
			</div>
			<div style="display:inline-block;">
				<select id="zhuti_selected" size="10" style="min-width:120px;border:1px solid #CCCCCC;">
				</select>
			</div>
		</div>
	</script>
	
	<script type="text/template" id="special-selector-tpl">
		<div>
            <div style="display:inline-block;">
                <select id="zhuanti_module"  onchange="latte.teacher.resource.upload.refreshSeriesList();" size="10" style="min-width:120px;border:1px solid #CCCCCC;">
                </select>
            </div>
            <div style="display:inline-block;">
                <select id="zhuanti_series" size="10" style="min-width:120px;border:1px solid #CCCCCC;">
                </select>
            </div>
            <div style="display:inline-block;width:50px;">
                <button class="btn-yellow" style="width:50px;height:25px;padding:0;" onclick="latte.teacher.resource.upload.linkTopic($('#zhuanti_series'),$('#zhuanti_selected'));">添加&gt;&gt;</button>
                <br><br>
                <button class="btn-yellow" style="width:50px;height:25px;padding:0;" onclick="latte.teacher.resource.upload.unlinkTopic($('#zhuanti_series'),$('#zhuanti_selected'));">&lt;&lt;删除</button>
            </div>
            <div style="display:inline-block;">
                <select id="zhuanti_selected" size="10" style="min-width:120px;border:1px solid #CCCCCC;">
                </select>
            </div>
        </div>
	</script>
	
	
	<script type="text/template" id="option-pattern-tpl">
	{@each list as obj}
    	<option value="?{id}">?{name}&nbsp;&nbsp;?{mastery}</option>
	{@/each}
	</script>
	<script type="text/javascript" src="${static_ctx}/static/js/lib/plupload/plupload.js?v=${version}"></script>
	<script type="text/javascript" src="${static_ctx}/static/js/lib/plupload/plupload.html5.js?v=${version}"></script>
	<script type="text/javascript" src="${static_ctx}/static/js/lib/plupload/plupload.flash.js?v=${version}"></script>
	<script type="text/javascript" src="${static_ctx}/static/js/teacher/resource/update/courseware.js"></script>
	<script type="text/javascript">
		$(document).ready(function() {
			latte.teacher.courseware.init();
		});
	</script>
</body>
</html>

