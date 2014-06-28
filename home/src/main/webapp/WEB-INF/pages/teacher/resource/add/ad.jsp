<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@include file="/WEB-INF/pages/commons/meta.jsp"%>
	<title>发布广告</title>
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
					                                <li style="line-height:normal;" class="current"><a data-id=2 href="javascript:void(0)"><span>广告</span></a></li>
					                                <%-- <li style="line-height:normal;"  ><a data-id=0 href="${ctx }/teacher/resource/createMaterial"><span>教学资料</span></a></li>
					                                <li style="line-height:normal;"><a data-id=-1 href="${ctx }/teacher/resource/createClip"><span>素材</span></a></li> --%>
				                              	</ul>
				                              	<div class="conFormWrap">
					                              	<div class="formCon">
										                <div id="ad_file" class="formList">
															<label><em>*</em>选择文件：</label>
															<span id="file" class="btn-blue22 w80" ><a class="btnSave">上传文件</a></span>
															<div class="info" style="display:none;" >
																<div class="infoSwBox">
																	<a href="javascript:void(0);" class="infoSw">
																		<span class="swIco01"></span>
																		<p id="ad_file_name"></p>
																	</a>
																	<div class="infoBarBox">
																		<div class="infoBar">
																			<div style="width:0%" class="barBg"></div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
										                <div id="ad_title" class="formList">
															<label><em>*</em>标题：</label>
															<div class="info">
																<input type="text" maxlength="45" id="title" name="title" value="" size="30" class="infoText">
															</div>
										                </div>
										                <div id="ad_description" class="formList">
															<label>简介：</label>
															<div class="info">
																<textarea maxlength="100" class="infoTextarea"  placeholder="选填"></textarea>
															</div>
														</div>
														
									            		<!-- <div id="ad_format" class="formList">
										                  <label><em>*</em>格式：</label>
															<div class="info">
																<select  id="resourceFormat" class="infoSelect">
																	
																</select>
																
															</div>
										                </div> -->
														<!-- <div id="ad_sharelevel" class="formList">
															<label><em>*</em>是否共享：</label>
															<div class="infoRadio">
																<input type="radio"  name="sharelevel" value="0" checked="checked" class="infoRadio">私有(<span>只有你本人可以查看</span>)
															</div>
															<div class="infoRadio">
																<input type="radio" name="sharelevel" value="1" class="infoRadio">校内共享(<span>本校范围都可查看</span>)
															</div>
															<div class="infoRadio">
																<input type="radio" name="sharelevel" value="2" class="infoRadio">平台共享(<span>本校及所有学校都可查看，需要审核</span>)
															</div>
										                </div> -->
														 
														<div id="ad_total_reward" class="formList">
                                                          <label>总奖金：</label>      
															<div class="info">
																<input type="text" maxlength="45" id="totalReward" name="totalReward" value="" size="30" class="infoText">
															</div>
														</div>
                                                        <div id="ad_invidual_reward" class="formList">
                                                         <label>单个奖金：</label>  
                                                          <div class="info">
                                                            <input type="text" maxlength="45" id="invidualReward" name="invidualReward" value="" size="30" class="infoText">
                                                          </div>
                                                        </div>
                                                        
                                                          <div id="ad_expire" class="formList">
                                                           <label>有效时间(天)：</label>  
                                                          <div class="info">
                                                            <input type="text" maxlength="45" id="expire" name="expire" value="" size="30" class="infoText">
                                                          </div>
                                                        </div>
                                                        
                                                        <div id="ad_question1" class="formList">
                                                         <label>问题1：</label>  
                                                          <div class="info">
                                                            <input type="text" maxlength="45" id="q1" name="q1" value="" size="30" class="infoText">
                                                          </div>
                                                        </div>
                                                        
                                                         <div id="ad_a1" class="formList">
                                                         <label>选项：</label>  
                                                          <div class="info">
                                                            <input type="radio" id="r1_1" name="r1"  value="1" class="infoRadio">
                                                            <input type="text"  maxlength="45" id="a1_1" name="a1"  value="" style="width: 117px;" size="10" class="infoText">&nbsp;
                                                            <input type="radio" id="r1_2" name="r1"  value="2" class="infoRadio">
                                                            <input type="text"  maxlength="45" id="a1_2" name="a1"  value="" style="width: 117px;" size="10" class="infoText">&nbsp;
                                                            <input type="radio" id="r1_3" name="r1"  value="3" class="infoRadio">
                                                            <input type="text"  maxlength="45" id="a1_3" name="a1"  value="" style="width: 117px;" size="10" class="infoText">&nbsp;
                                                            <input type="radio" id="r1_4" name="r1"  value="4" class="infoRadio">
                                                            <input type="text"  maxlength="45" id="a1_4" name="a1"  value="" style="width: 117px;" size="10" class="infoText">&nbsp;
                                                          </div>
                                                        </div>
                                                        
                                                        <div id="ad_question2" class="formList">
                                                         <label>问题2：</label>  
                                                          <div class="info">
                                                            <input type="text" maxlength="45" id="q2" name="q2" value="" size="30" class="infoText">
                                                          </div>
                                                        </div>
                                                         <div id="ad_a2" class="formList">
                                                         <label>选项：</label>  
                                                          <div class="info">
                                                            
                                                            <input type="radio" id="r2_1" name="r2"  value="1" class="infoRadio">
                                                            <input type="text"  maxlength="45" id="a2_1" name="a2"  value=""  style="width: 117px;" size="10" class="infoText">&nbsp;
                                                            <input type="radio" id="r2_2" name="r2"  value="2" class="infoRadio">
                                                            <input type="text"  maxlength="45" id="a2_2" name="a2"  value="" style="width: 117px;" size="10" class="infoText">&nbsp;
                                                            <input type="radio" id="r2_3" name="r2"  value="3" class="infoRadio">
                                                            <input type="text"  maxlength="45" id="a2_3" name="a2"  value="" style="width: 117px;" size="10" class="infoText">&nbsp;
                                                            <input type="radio" id="r2_4" name="r2"  value="4" class="infoRadio">
                                                            <input type="text"  maxlength="45" id="a2_4" name="a2"  value="" style="width: 117px;" size="10" class="infoText">&nbsp;
                                                          </div>
                                                        </div>
                                                        
                                                        
                                                          <div id="ad_question3" class="formList">
                                                           <label>问题3：</label>  
                                                          <div class="info">
                                                            <input type="text" maxlength="45" id="q3" name="q3" value="" size="30" class="infoText">
                                                          </div>
                                                        </div>
                                                         <div id="ad_a3" class="formList">
                                                         <label>选项：</label>  
                                                          <div class="info">
                                                            
                                                            <input type="radio" id="r3_1" name="r3"  value="1" class="infoRadio">
                                                            <input type="text"  maxlength="45" id="a3_1" name="a3"  value=""  style="width: 117px;" size="10" class="infoText">&nbsp;
                                                            <input type="radio" id="r3_2" name="r3"  value="2" class="infoRadio">
                                                            <input type="text"  maxlength="45" id="a3_2" name="a3"  value="" style="width: 117px;" size="10" class="infoText">&nbsp;
                                                            <input type="radio" id="r3_3" name="r3"  value="3" class="infoRadio">
                                                            <input type="text"  maxlength="45" id="a3_3" name="a3"  value=""  style="width: 117px;" size="10" class="infoText">&nbsp;
                                                            <input type="radio" id="r3_4" name="r3"  value="4" class="infoRadio">
                                                            <input type="text"  maxlength="45" id="a3_4" name="a3"  value=""  style="width: 117px;" size="10" class="infoText">&nbsp;
                                                          </div>
                                                        </div>
														 
														
														<!-- div class="formList">
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
																	<span class="btn-blue22" onclick="latte.teacher.ad.linkTopic($('#zhuti_topic'),$('#zhuti_selected'));"><a class="btnSave">添加</a></span>
																  	<span class="btn-blue22 margin-top5" onclick="latte.teacher.ad.unlinkTopic($('#zhuti_topic'),$('#zhuti_selected'));"><a class="btnSave">删除</a></span>
																  </div>
																  <div class="AddBoxWrap AddBoxWrap01">
																	<select id="zhuti_selected" size="10" class="AddBox"></select>
																  </div>
																</div>
															  </div>
														</div> -->
														 
														 
														</div>
														
													</div>
													
										 
												</div>
												<div class="conBtnWrap">
													 <span id="btn_save_ad" class="BtnBlue24" ><a class="btnSave">提交</a></span>
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
				<button class="btn-yellow" style="width:50px;height:25px;padding:0;" onclick="latte.teacher.ad.linkTopic($('#zhuti_topic'),$('#zhuti_selected'));">添加&gt;&gt;</button>
				<br><br>
				<button class="btn-yellow" style="width:50px;height:25px;padding:0;" onclick="latte.teacher.ad.unlinkTopic($('#zhuti_topic'),$('#zhuti_selected'));">&lt;&lt;删除</button>
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
	<script type="text/javascript" src="${static_ctx}/static/js/teacher/resource/add/ad.js"></script>
	<script type="text/javascript">
		$(document).ready(function() {
			latte.teacher.ad.init();
		});
	</script>
</body>
</html>

