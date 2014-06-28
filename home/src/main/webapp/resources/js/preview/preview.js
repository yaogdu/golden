/** ppt列表页 */
latte.preview = {
	data : {
		totalPage : null,
		currPage : null,
		prefix :  null,//路径前缀(不包括文件名)
		suffix : null,//原文件后缀
		orgFileName : null,//原文件名
		fileName : null,//转换后文件名
		playType : null,//转换后文件后缀
		dict : 'jpg,png,gif',
		format : {
			doc : 'doc',
			docx : 'doc'
		}
	},
	initPath : function(data,callback){
		latte.preview.data.orgFileName = data.fileName,
		$.ajax({
			type : 'GET',
			cache : false,
			async : true,
			contentType : 'application/json',
			url : ctx+"/res/preview",
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
				latte.preview.data.playType = result.playType;
				latte.preview.data.prefix = result.http;
				var index = data.fileName.lastIndexOf('.');
				latte.preview.data.suffix = data.fileName.substr(index+1);;
				index = result.fileName.lastIndexOf('.');
				latte.preview.data.fileName = result.fileName.substr(0,index);
				
				if(latte.preview.data.dict.indexOf(latte.preview.data.suffix)!=-1){
					$('#preview_info').html('<div style="display:table-cell;vertical-align:middle;"><img src="'+latte.preview.data.prefix+latte.preview.data.orgFileName+'"id="img_preview" style="max-height:575px;max-width:918px;"></img></div>');
					$('.preview-page').hide();
				}else{
					util.jsonp.rst = function(data){
						latte.preview.data.totalPage = data.count;
						if(!latte.preview.data.totalPage)
							latte.preview.data.totalPage = 1;
						$('#total_page').text('/'+latte.preview.data.totalPage);
						latte.preview.getDocPreview(1);
					};
					
					if(latte.preview.data.playType == 'png'){
						//可能需要把docx修改为doc等等
						$('#preview_info').html('<div style="display:table-cell;vertical-align:middle;"><img id="img_preview" style="max-height:575px;max-width:918px;"></img></div>');
						$('.btn-up').click(latte.preview.pre);
						$('.btn-down').click(latte.preview.next);
						$('.preview-page').show();
						$.ajax({
							url: latte.preview.data.prefix + latte.preview.data.suffix + '_png/' + latte.preview.data.fileName + ".json",
							async:false,
							dataType:"jsonp"
						});
					}else{
						$('#page_bar').remove();
						$('.preview-page').hide();
						$('#preview_info').html('<div id="mediaspace"></div>');
						jwplayer('mediaspace').setup({
							 flashplayer: static_ctx+'/static/js/preview/flvplayer.swf',
							 file: 'http://10.200.130.74/'+result.fileName,
							 controlbar: 'bottom',
							 width: '470',
							 height: '320'
						});
						$('#mediaspace_wrapper').css('margin','auto');
						$('#preview_info').css('padding-top','90px');
					}
				}
			},
			error : function() {
				alert("error");
			}
		});
		
		
	},
	init : function(data,callback){
		latte.preview.initPath(data,callback);
	},
	getDocPreview : function(pageNo){
		$('#curr_page').val(pageNo);
		var suffix = '.png';
		$('#img_preview').attr('src',latte.preview.data.prefix + latte.preview.data.fileName +'_'+pageNo+suffix);
	},
	pre : function(){
		if(latte.preview.data.currPage > 1)
			latte.preview.data.currPage = latte.preview.data.currPage - 1;
		latte.preview.getDocPreview(latte.preview.data.currPage);
	},
	next : function(){
		if(latte.preview.data.currPage < latte.preview.data.totalPage)
			latte.preview.data.currPage = latte.preview.data.currPage + 1;
		latte.preview.getDocPreview(latte.preview.data.currPage);
	},
	download : function(docId){
		console.log('download');
	}
};