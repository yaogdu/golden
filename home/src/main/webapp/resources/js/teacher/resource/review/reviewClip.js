latte.teacher.reviewClip = {
	data : {
		resourceId : null,
		reviewDialogTpl : null,
		dialog : null
	},
	init : function(){
		latte.teacher.reviewClip.data.reviewDialogTpl = juicer('#review-dialog-tpl');
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
		
		$('body').on('click','#btn_pass',latte.teacher.reviewClip.pass);
		$('body').on('click','#btn_reject',latte.teacher.reviewClip.reject);
		$('body').on('click','#btn_reback',latte.teacher.reviewClip.reback);
		
	},
	show : function(data){//点击初始化资源
		latte.teacher.reviewClip.data.resourceId = data.id;
		data.isPreview = false;
		latte.teacher.reviewClip.data.dialog = art.dialog({
			lock : true,
			id : 'preview_dialog',
			title : '<em class="ico-'+data.resourceFormat+' res-mag-ico"></em>' + data.resourceName,
			content : latte.teacher.reviewClip.data.reviewDialogTpl.render(data),
			init:function(){
				data.resourceType=2;
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
		latte.teacher.reviewClip.data.resourceId = data.id;
		data.isPreview = true;
		latte.teacher.reviewClip.data.dialog = art.dialog({
			lock : true,
			id : 'preview_dialog',
			title : '<em class="ico-'+data.resourceFormat+' res-mag-ico"></em>' + data.resourceName,
			content : latte.teacher.reviewClip.data.reviewDialogTpl.render(data),
			init:function(){
				data.resourceType=2;
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
					"resourceType":2,
					"resource":latte.teacher.reviewClip.data.resourceId
				})
				,
				success : function(response){
					util.dialog.timerDialog(0.5,'操作成功',function(){
						latte.teacher.reviewClip.data.dialog.close();
						latte.teacher.search.clip.searchResource();
	            	});
				} 
			});
		});
	},
	reject : function(){
		var id = $(this).attr('data-id');
		util.dialog.defaultDialog('拒绝理由:<br><textarea id="reject_reason" maxlength=100 style="width:300px;height:60px;" />',function(){
			var reason =  util.escapeSpace($('#reject_reason').val());
			if(reason==""){
				util.dialog.infoDialog('拒绝理由不能为空');
				return false;
			}
			reason=util.escapeCode($('#reject_reason').val());
			$.ajax({
				type : "POST",
				cache : false,
				contentType: 'application/json',
				url : ctx+"/res/resource/approve",
				data:JSON.stringify({
					"checkStatus":1,
					"resourceType":2,
					"resource":latte.teacher.reviewClip.data.resourceId,
					"refuseReason":reason
				}),
				dataType : 'json',
				success : function(response){
					util.dialog.timerDialog(0.5,'操作成功',function(){
						latte.teacher.reviewClip.data.dialog.close();
						latte.teacher.search.clip.searchResource();
	            	});
				} 
			});
		});
	},
	reback : function(){
		latte.teacher.reviewClip.data.dialog.close();
	}
};

