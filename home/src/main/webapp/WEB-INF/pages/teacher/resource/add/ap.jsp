<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@include file="/WEB-INF/pages/commons/meta.jsp"%>
	<title>发布调研</title>
</head>
<body>
	<div class="container">
		<div class="wrapper">
			<!-- 头部 -->
			<div class="mainWrap">
				<div class="mainBgCl">
					<div class="mainBgCr">
						<div class="mainBoxCon">
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
					                                <li style="line-height:normal;"><a data-id=2 href="${ctx }/ad"><span>广告</span></a></li>
                                                    <li style="line-height:normal;"><a href="${ctx }/mr"><span>调研</span></a></li>
                                                    <li style="line-height:normal;" class="current"><a href="${ctx }/ap"><span>应用</span></a></li>
				                              	</ul>
				                              	<div class="conFormWrap">
					                              	<div class="formCon">
										                <div id="ap_file" class="formList">
															<label><em>*</em>选择文件：</label>
															<span id="file" class="btn-blue22 w80" ><a class="btnSave">上传文件</a></span>
															<div class="info" style="display:none;" >
																<div class="infoSwBox">
																	<a href="javascript:void(0);" class="infoSw">
																		<span class="swIco01"></span>
																		<p id="ap_file_name"></p>
																	</a>
																	<div class="infoBarBox">
																		<div class="infoBar">
																			<div style="width:0%" class="barBg"></div>
																		</div>
																	</div>
																</div>
															</div>
                                                           
														</div>
										                <div id="ap_title" class="formList">
															<label><em>*</em>标题：</label>
															<div class="info">
																<input type="text" maxlength="45" id="title" name="title" value="" size="30" class="infoText">
															</div>
										                </div>
										                <div id="ap_description" class="formList">
															<label>简介：</label>
															<div class="info">
																<textarea maxlength="100" class="infoTextarea"  placeholder="选填"></textarea>
															</div>
														</div>
														
														 
														<div id="ap_total_reward" class="formList">
                                                          <label>总奖金：</label>      
															<div class="info">
																<input type="text" maxlength="45" id="totalReward" name="totalReward" value="" size="30" class="infoText">
															</div>
														</div>
                                                        <div id="ap_invidual_reward" class="formList">
                                                         <label>单个奖金：</label>  
                                                          <div class="info">
                                                            <input type="text" maxlength="45" id="invidualReward" name="invidualReward" value="" size="30" class="infoText">
                                                          </div>
                                                        </div>
                                                        
                                                          <div id="ap_expire" class="formList">
                                                           <label>有效时间(天)：</label>  
                                                          <div class="info">
                                                            <input type="text" maxlength="45" id="expire" name="expire" value="" size="30" class="infoText">
                                                          </div>
                                                        </div>
                                                        
                                                        
                                                         <div id="ap_package_name" class="formList">
                                                           <label>包名称：</label>  
                                                          <div class="info">
                                                            <input type="text" maxlength="45" id="packageName" name="packageName" value="" size="30" class="infoText">
                                                          </div>
                                                        </div>
                                                        
                                                         
                                                        
                                                        
                                                         
														 
														 
														</div>
														
													</div>
													
										 
												</div>
												<div class="conBtnWrap">
													 <span id="btn_save_ap" class="BtnBlue24" ><a class="btnSave">提交</a></span>
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
				<button class="btn-yellow" style="width:50px;height:25px;padding:0;" onclick="latte.teacher.ap.linkTopic($('#zhuti_topic'),$('#zhuti_selected'));">添加&gt;&gt;</button>
				<br><br>
				<button class="btn-yellow" style="width:50px;height:25px;padding:0;" onclick="latte.teacher.ap.unlinkTopic($('#zhuti_topic'),$('#zhuti_selected'));">&lt;&lt;删除</button>
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
	<script type="text/javascript" src="${static_ctx}/static/js/teacher/resource/add/ap.js"></script>
	<script type="text/javascript">
		$(document).ready(function() {
			latte.teacher.ap.init();
		});
	</script>
</body>
</html>

