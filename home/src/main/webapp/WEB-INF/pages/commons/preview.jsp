<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<script type="text/template" id="review-dialog-tpl">
	<!--弹窗开始-->
	<div class="windowWrap">
		<div class="windowBox">
			<div class="windowTitle">
				<span class="swIco01"></span>?{resourceName}
				<span id="btn_collect" class="BtnWhite24" style="float:right;">
					<a class="btnSave" href="javascript:void(0)">收藏</a>
				</span>
				<span id="btn_quote" class="BtnWhite24" style="float:right;">
					<a class="btnSave" href="javascript:void(0)">引用</a>
				</span>
				<span id="btn_edit" class="BtnWhite24" style="float:right;">
					<a class="btnSave" href="javascript:void(0)">编辑</a>
				</span>
			</div>
			<div class="windowMain">
				<div class="windowCon"> 
					<div class="windowBoxTp">
						<div class="formTab">
							<ul class="TabTit">
								<li id="tab_file" class="current"><a href="javascript:void(0)">预览文件</a></li>
								<li id="tab_desc"><a href="javascript:void(0)">资源信息</a></li>
							</ul>
						</div>
					</div> 
					<div id="preview" class="windowBoxBt">
						<div id='preview_info' class="preview-info"></div>	
						<div class="preview-page">
							<div id="page_bar" >
								<span class="btn-up lfloat"></span>
								<input id="curr_page" value=1  style='width:30px;' >
								<label id="total_page" class="lfloat">/1</label>
								<span class="btn-down lfloat" ></span>	
							</div>
						</div>
					</div>
					<div id="description" class="formCon formCon01" style="display:none;" >
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
								??{score|formatscore}
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
							<label>文件大小：</label>
							<div class="info">
								<span class="infoLabel">?{fileSize|fileSizeFormat}</span>
							</div>
						</div>
						<div class="formList">
							<label>发布时间：</label>
							<div class="info">
								<span class="infoLabel">??{submitTime.time|dateFormat}</span>
							</div>
						</div>
					</div>		
				</div>
			</div>
		</div>
	</div>
</script>
<script type="text/javascript" src="${static_ctx}/static/js/preview/jwplayer.js"></script>
<script type="text/javascript" src="${static_ctx}/static/js/preview/swfobject.js"></script>
<script type="text/javascript" src="${static_ctx}/static/js/preview/preview.js"></script>