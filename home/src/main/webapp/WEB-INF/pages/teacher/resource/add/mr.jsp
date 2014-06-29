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
                                                    <li style="line-height:normal;" class="current"><a href="${ctx }/mr"><span>调研</span></a></li>
				                              	</ul>
				                              	<div class="conFormWrap">
					                              	<div class="formCon">
										                <div id="mr_file" class="formList">
															<label><em>*</em>选择文件：</label>
															<span id="file" class="btn-blue22 w80" ><a class="btnSave">上传文件</a></span>
															<div class="info" style="display:none;" >
																<div class="infoSwBox">
																	<a href="javascript:void(0);" class="infoSw">
																		<span class="swIco01"></span>
																		<p id="mr_file_name"></p>
																	</a>
																	<div class="infoBarBox">
																		<div class="infoBar">
																			<div style="width:0%" class="barBg"></div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
										                <div id="mr_title" class="formList">
															<label><em>*</em>标题：</label>
															<div class="info">
																<input type="text" maxlength="45" id="title" name="title" value="" size="30" class="infoText">
															</div>
										                </div>
										                <div id="mr_description" class="formList">
															<label>简介：</label>
															<div class="info">
																<textarea maxlength="100" class="infoTextarea"  placeholder="选填"></textarea>
															</div>
														</div>
														
														 
														<div id="mr_total_reward" class="formList">
                                                          <label>总奖金：</label>      
															<div class="info">
																<input type="text" maxlength="45" id="totalReward" name="totalReward" value="" size="30" class="infoText">
															</div>
														</div>
                                                        <div id="mr_invidual_reward" class="formList">
                                                         <label>单个奖金：</label>  
                                                          <div class="info">
                                                            <input type="text" maxlength="45" id="invidualReward" name="invidualReward" value="" size="30" class="infoText">
                                                          </div>
                                                        </div>
                                                        
                                                          <div id="mr_expire" class="formList">
                                                           <label>有效时间(天)：</label>  
                                                          <div class="info">
                                                            <input type="text" maxlength="45" id="expire" name="expire" value="" size="30" class="infoText">
                                                          </div>
                                                        </div>
                                                        
                                                        <div id="mr_question1" class="formList">
                                                         <label>问题1：</label>  
                                                          <div class="info">
                                                            <input type="text" maxlength="45" id="q1" name="q1" value="" size="30" class="infoText">
                                                          </div>
                                                          
                                                        </div> 
                                                        <div id="mr_question2" class="formList">
                                                         <label>问题2：</label>  
                                                         <div class="info">
                                                            <input type="text" maxlength="45" id="q2" name="q2" value="" size="30" class="infoText">
                                                          </div>
                                                          
                                                        </div> 
                                                        <div id="mr_question3" class="formList">
                                                         <label>问题3：</label>  
                                                         <div class="info">
                                                            <input type="text" maxlength="45" id="q3" name="q3" value="" size="30" class="infoText">
                                                          </div>
                                                          
                                                        </div> 
                                                        
                                                        <div id="mr_question4" class="formList">
                                                         <label>问题4：</label>  
                                                         <div class="info">
                                                            <input type="text" maxlength="45" id="q4" name="q4" value="" size="30" class="infoText">
                                                          </div>
                                                          
                                                        </div> 
                                                        
                                                        <div id="mr_question5" class="formList">
                                                         <label>问题5：</label>  
                                                         <div class="info">
                                                            <input type="text" maxlength="45" id="q5" name="q5" value="" size="30" class="infoText">
                                                          </div>
                                                          
                                                        </div> 
                                                        
                                                        
                                                        <div id="mr_question6" class="formList">
                                                         <label>问题6：</label>  
                                                         <div class="info">
                                                            <input type="text" maxlength="45" id="q6" name="q6" value="" size="30" class="infoText">
                                                          </div>
                                                          
                                                        </div> 
                                                        
                                                        
                                                        <div id="mr_question7" class="formList">
                                                         <label>问题7：</label>  
                                                         <div class="info">
                                                            <input type="text" maxlength="45" id="q7" name="q7" value="" size="30" class="infoText">
                                                          </div>
                                                          
                                                        </div> 
                                                        
                                                        <div id="mr_question8" class="formList">
                                                         <label>问题8：</label>  
                                                         <div class="info">
                                                            <input type="text" maxlength="45" id="q8" name="q8" value="" size="30" class="infoText">
                                                          </div>
                                                          
                                                        </div> 
                                                        
                                                        
                                                        <div id="mr_question9" class="formList">
                                                         <label>问题9：</label>  
                                                         <div class="info">
                                                            <input type="text" maxlength="45" id="q9" name="q9" value="" size="30" class="infoText">
                                                          </div>
                                                          
                                                        </div> 
                                                        
                                                        <div id="mr_question10" class="formList">
                                                         <label>问题10：</label>  
                                                         <div class="info">
                                                            <input type="text" maxlength="45" id="q10" name="q10" value="" size="30" class="infoText">
                                                          </div>
                                                          
                                                        </div> 
                                                        
                                                        
                                                         
														 
														 
														</div>
														
													</div>
													
										 
												</div>
												<div class="conBtnWrap">
													 <span id="btn_save_mr" class="BtnBlue24" ><a class="btnSave">提交</a></span>
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
				<button class="btn-yellow" style="width:50px;height:25px;padding:0;" onclick="latte.teacher.mr.linkTopic($('#zhuti_topic'),$('#zhuti_selected'));">添加&gt;&gt;</button>
				<br><br>
				<button class="btn-yellow" style="width:50px;height:25px;padding:0;" onclick="latte.teacher.mr.unlinkTopic($('#zhuti_topic'),$('#zhuti_selected'));">&lt;&lt;删除</button>
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
	<script type="text/javascript" src="${static_ctx}/static/js/teacher/resource/add/mr.js"></script>
	<script type="text/javascript">
		$(document).ready(function() {
			latte.teacher.mr.init();
		});
	</script>
</body>
</html>

