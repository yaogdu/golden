latte.teacher.review = {
	data : {
		resourceId : null,
		reviewDialogTpl : null,
		dialog : null
	},
	init : function(){
		latte.teacher.review.data.reviewDialogTpl = juicer('#review-dialog-tpl');
		$('body').on('click','#tab_file',function(){
			$(this).addClass('current');
			$(this).siblings('li').removeClass('current');
			$('#preview').show();
			$('#preview-wrapper').show();
			$('#description').hide();
		});
		
		$('body').on('click','#tab_desc',function(){
			$(this).addClass('current');
			$(this).siblings('li').removeClass('current');
			$('#preview').hide();
			$('#preview-wrapper').hide();
			$('#description').show();
		});
		
		$('body').on('click','#btn_pass',latte.teacher.review.pass);
		$('body').on('click','#btn_reject',latte.teacher.review.reject);
		$('body').on('click','#btn_reback',latte.teacher.review.reback);
		
	},
	show : function(data){//点击初始化资源
		latte.teacher.review.data.resourceId = data.id;
		data.isPreview = false;
		latte.teacher.review.data.dialog = art.dialog({
			lock : true,
			id : 'preview_dialog',
			title : '<em class="ico-'+data.resourceFormat+' preview-ico"></em>' + data.resourceName,
			content : latte.teacher.review.data.reviewDialogTpl.render(data),
			init:function(){
				data.resourceType=1;
				latte.teacher.preview.init(data,function(data){
					$('#topic_name').find('span').html(data.topic);
					$('#series_name').find('span').html(data.series);
					$('#stage_name').find('span').html(data.stage+ " "+ data.subject);
				});
			},
			top : 46
		});
	},
	view : function(data){//点击初始化资源
		latte.teacher.review.data.resourceId = data.id;
		data.isPreview = true;
		latte.teacher.review.data.dialog = art.dialog({
			lock : true,
			id : 'preview_dialog',
			title : '<em class="ico-'+data.resourceFormat+' preview-ico"></em>' + data.resourceName,
			content : latte.teacher.review.data.reviewDialogTpl.render(data),
			init:function(){
				data.resourceType=1;
				latte.teacher.preview.init(data,function(data){
					$('#topic_name').find('span').html(data.topic);
					$('#series_name').find('span').html(data.series);
					$('#stage_name').find('span').html(data.stage+ " "+ data.subject);
				});
			},
			top : 46
		});
	},
	pass : function(){
		
		util.dialog.defaultDialog('确认通过?',function(){
			$.ajax({
				type : "POST",
				cache : false,
				contentType: 'application/json',
				url : ctx+"/res/resource/approve",
				dataType : 'json',
				data:JSON.stringify({
					"checkStatus":0,
					"resourceType":1,
					"resource":latte.teacher.review.data.resourceId
				}),
				success : function(response){
					latte.teacher.search.material.searchResource();
					util.dialog.messageDialog('成功');
					latte.teacher.review.data.dialog.close();
				} 
			});
		});
	},
	reject : function(){
		var id = $(this).attr('data-id');
		util.dialog.defaultDialog('拒绝理由:<br><textarea id="reject_reason" maxlength=100 style="width:300px;height:60px;" />',function(){
			var reason =  util.escapeCode($('#reject_reason').val());
			if(reason==""){
				util.dialog.infoDialog('拒绝理由不能为空');
				return false;
			}
			$.ajax({
				type : "POST",
				cache : false,
				contentType: 'application/json',
				url : ctx+"/res/resource/approve",
				data:JSON.stringify({
					"checkStatus":1,
					"resourceType":1,
					"resource":latte.teacher.review.data.resourceId,
					"refuseReason":reason
				}),
				dataType : 'json',
				success : function(response){
					latte.teacher.search.material.searchResource();
					util.dialog.messageDialog('成功');
					latte.teacher.review.data.dialog.close();
				} 
			});
		});
	},
	reback : function(){
		latte.teacher.review.data.dialog.close();
	}
};




