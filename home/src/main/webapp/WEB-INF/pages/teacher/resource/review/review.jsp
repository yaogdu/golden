<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<script type="text/template" id="review-dialog-tpl">
	<div class="preview-container"> 
		<div>
			<div class="formTab" style="margin-top:0;">
				<ul class="TabTit">
					<li id="tab_file" class="current"><a href="javascript:void(0)">预览文件</a></li>
					<li id="tab_desc"><a href="javascript:void(0)">资源信息</a></li>
				</ul>
				<div class="BtnWrap operBtn" style="margin-top:15px;">
					{@if !isPreview }
						<span id="btn_pass" class="BtnWhite24" >
							<a class="btnSave" href="javascript:void(0)">√ 通过</a>
						</span>
						<span id="btn_reject" class="BtnWhite24">
							<a class="btnSave" href="javascript:void(0)">× 拒绝</a>
						</span>
						
					{@else}
						<span id="btn_reback" class="BtnWhite24" >
							<!--<a class="btnSave" href="javascript:void(0)"><span class="returnIco"></span>返回</a>-->
						</span>
					{@/if}
				</div>
			</div>
		</div> 
		<div id="preview">
			<div class="preview-page">
				<div id="page_bar" >
					<span class="btn-down lfloat" ></span>
					<input id="curr_page" value="1" class="lfloat" />
					<input id="total_page" class="lfloat" value="/1" readonly=readonly />
					<span class="btn-up lfloat"></span>
				</div>
			</div>
			<div id='preview_info' class="preview-info"></div>	
		</div>
		
		<div id="description" class="formCon formCon01" style="display:none;" >
			<div class="formList">
				<label>资源名称：</label>
				<div class="info">
					<span class="infoLabel">??{resourceName}</span>
				</div>
			</div>
			<div class="formList">
				<label>简介：</label>
				<div class="info">
					<span class="infoLabel">??{intro}</span>
				</div>
			</div>
			<div class="formList">
				<label>类型：</label>
				<div class="info">
					<span class="infoLabel">教学材料</span>
				</div>
			</div>

			<div class="formList">
				<label>格式：</label>
				<div class="info">
					<span class="infoLabel">??{resourceFormat|fileTypeChinese}</span>
				</div>
			</div>
			<div class="formList">
				<label>阶段：</label>
				<div class="info">
					<span class="infoLabel">?{phase|phaseCode}</span>
				</div>
			</div>
			<div id="stage_name" class="formList">
				<label>学段/学科：</label>
				<div class="info">
					<span class="infoLabel"></span>
				</div>
			</div>
			<div id="topic_name" class="formList">
				<label>主题：</label>
				<div class="info">
					<span class="infoLabel"></span>
				</div>
			</div>
			<div id="series_name" class="formList">
				<label>专题：</label>
				<div class="info">
					<span class="infoLabel"></span>
				</div>
			</div>
			<div class="formList">
				<label>来源：</label>
				<div class="info">
					<span class="infoLabel">?{src|srcCode}</span>
				</div>
			</div>
			 
			
			<div class="formList">
				<label>提交人：</label>
				<div class="info">
					<span class="infoLabel">?{userName}</span>
				</div>
			</div>
			<div class="formList">
				<label>收藏数：</label>
				<div class="info">
					<span class="infoLabel">?{fav}</span>
				</div>
			</div>
			<div class="formList">
				<label>下载数：</label>
				<div class="info">
					<span class="infoLabel">?{dnd}</span>
				</div>
			</div>
			<div class="formList">
				<label>引用次数：</label>
				<div class="info">
					<span class="infoLabel">?{ref}</span>
				</div>
			</div>
			<div class="formList">
				<label>好评：</label>
				<div class="info">
					<!--<div class="starIco">
					<em class="limit"></em>
					<em class="limit"></em>
					<em class="limit"></em>
					<em></em>
					<em></em>
					</div>-->
				??{score|formatscore}
				</div>
			</div>
			<div class="formList">
				<label>文件大小：</label>
				<div class="info">
					<span class="infoLabel">?{fileSize|fileSizeFormat}</span>
				</div>
			</div>
			<div class="formList">
				<label>适用对象：</label>
				<div class="info">
					<span class="infoLabel">?{audience|audienceCode} </span>
				</div>
			</div>
			<div class="formList">
				<label>提交时间：</label>
				<div class="info">
					<span class="infoLabel">??{submitTime.time|dateFormat}</span>
				</div>
			</div>
			<div class="formList">
				<label>审核状态：</label>
				<div class="info">
					<span class="infoLabel">?{checkStatus|getCheckStatus}</span>
				</div>
			</div>
		</div>		
	</div>

</script>
<script type="text/javascript" src="${static_ctx}/static/js/preview/jwplayer.js"></script>
<script type="text/javascript" src="${static_ctx}/static/js/preview/swfobject.js"></script>
<script type="text/javascript" src="${static_ctx}/static/js/teacher/resource/review/review.js"></script>

<script type="text/javascript" src="${static_ctx}/static/js/teacher/resource/review/preview.js"></script>