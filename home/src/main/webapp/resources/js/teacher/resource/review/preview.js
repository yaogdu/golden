/** ppt列表页 */
latte.teacher.preview = {
	data : {
		totalPage : null,
		currPage : null,
		prefix :  null,//路径前缀(不包括文件名)
		suffix : null,//原文件后缀
		orgFileName : null,//原文件名,不包含后缀
		fileName : null,//转换后文件名,不包含后缀
		playType : null,//转换后文件后缀
		image : 'jpg,png,gif,jpeg,bmp',
		initData : null,
		initCallback : null
	},
	refresh : function(){
		latte.teacher.preview.initPath(latte.teacher.preview.data.initData, latte.teacher.preview.data.initCallback);
	},
	initPath : function(data,callback){
		latte.teacher.preview.data.currPage = 1;
		latte.teacher.preview.data.initData = data;
		latte.teacher.preview.data.initCallback = callback;
		$('#page_bar').hide();
		util.ajax({
			type : 'GET',
			cache : false,
			async : true,
			contentType : 'application/json',
			url : ctx+"/teacher/preview",
			dataType : 'json',
			data:{
				"filename":data.md5,
				"resourceId":data.id,
				"resourceType":data.resourceType
			},
			success : function(response){
				var result = response;
				if(callback)
					callback(result);
				if(data.resourceType==0){
					$('#preview_info').html('<iframe align="center" style="text-align:center;margin:auto;" width="880" height="600" src="'+result.http+'" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>');
				}else{
					$('#page_bar').show();
					latte.teacher.preview.data.playType = result.playType;
					latte.teacher.preview.data.prefix = result.http;
					var index = data.fileName.lastIndexOf('.');//分解原文件名
					latte.teacher.preview.data.orgFileName = data.fileName.substr(0,index);
					latte.teacher.preview.data.suffix = data.fileName.substr(index+1);
					index = result.fileName.lastIndexOf('.');//分解转换后文件名
					latte.teacher.preview.data.fileName = result.fileName.substr(0,index);
					
					if(latte.teacher.preview.data.image.indexOf(latte.teacher.preview.data.suffix.toLowerCase())!=-1){
						$('#preview_info').html('<div style="text-align:center;vertical-align:middle;"><img src="'+latte.teacher.preview.data.prefix+latte.teacher.preview.data.fileName +'.'+ latte.teacher.preview.data.suffix.toLowerCase() +'"id="img_preview" style="max-width:900px;margin:auto;"></img></div>');
						$('.preview-page').hide();
					}else{
						util.jsonp.rst = function(data){
							latte.teacher.preview.data.totalPage = data.count;
							if(data.status && data.status!=0){
								$('#preview_info').html('<div style="text-align:center;vertical-align:middle;padding-top:150px;">文件转换中...<a href="javascript:latte.teacher.preview.refresh();">刷新</a></div>');
								$('.preview-page').hide();
								return ;
							}
							if(!latte.teacher.preview.data.totalPage)
								latte.teacher.preview.data.totalPage = 1;
							$('#total_page').val('/'+latte.teacher.preview.data.totalPage);
							latte.teacher.preview.getDocPreview(1);
						};
						
						if(latte.teacher.preview.data.playType == 'png'){
							//可能需要把docx修改为doc等等
							$('#preview_info').html('<div style="text-align:center;vertical-align:middle;"><img id="img_preview" style="max-width:900px;margin:auto;"></img></div>');
							$('.preview-page').show();
							$.ajax({
								url: latte.teacher.preview.data.prefix + latte.teacher.preview.data.suffix + '_png/' + latte.teacher.preview.data.fileName + ".json",
								async:false,
								dataType:"jsonp"
							});
						}else{
							$('#page_bar').remove();
							$('.preview-page').hide();
							$('#preview_info').html('<div id="mediaspace"></div>');
							jwplayer('mediaspace').setup({
								 flashplayer: static_ctx+'/static/js/preview/flvplayer.swf',
								 file: result.http+result.fileName,
								 controlbar: 'bottom',
								 width: '470',
								 height: '320'
							});
							$('#mediaspace_wrapper').css('margin','auto');
							if(latte.teacher.preview.data.playType == 'mp3'){
								$('#mediaspace_wrapper').css('height','24px');
								$('#mediaspace_wrapper').css('padding-top','288px');
							}else{
								$('#mediaspace_wrapper').css('padding-top','140px');
							}
						}
					}
				}
				
			} 
		});
	},
	init : function(data,callback){
		latte.teacher.preview.initPath(data,callback);
		$('#preview').off('click');
		$('#preview').on('keydown','#curr_page',latte.teacher.preview.jump);
		$('#preview').on('click','.btn-up',latte.teacher.preview.pre);
		$('#preview').on('click','.btn-down',latte.teacher.preview.next);
	},
	getDocPreview : function(pageNo){
		$('#curr_page').val(pageNo);
		var suffix = '.png';
		$('#img_preview').attr('src',latte.teacher.preview.data.prefix + latte.teacher.preview.data.fileName +'_'+pageNo+suffix);
	},
	pre : function(){
		if(latte.teacher.preview.data.currPage > 1)
			latte.teacher.preview.data.currPage = parseInt(latte.teacher.preview.data.currPage) - 1;
		latte.teacher.preview.getDocPreview(latte.teacher.preview.data.currPage);
	},
	next : function(){
		if(latte.teacher.preview.data.currPage < latte.teacher.preview.data.totalPage)
			latte.teacher.preview.data.currPage = parseInt(latte.teacher.preview.data.currPage) + 1;
		latte.teacher.preview.getDocPreview(latte.teacher.preview.data.currPage);
	},
	jump : function(e){
		var curr_page = $('#curr_page').val();
		if(isNaN(curr_page)){
			$('#curr_page').val(latte.teacher.preview.data.currPage);
			return;
		}
		var event = window.event || e;
		if(event.keyCode == 13){
			if(curr_page > 0 && curr_page <=  latte.teacher.preview.data.totalPage){
				latte.teacher.preview.data.currPage = curr_page;
				latte.teacher.preview.getDocPreview(latte.teacher.preview.data.currPage);
			}else{
				$('#curr_page').val(latte.teacher.preview.data.currPage);
			}
		}
	},
	download : function(docId){
	}
};