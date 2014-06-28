latte.teacher.reviewTestPaper = {
	data : {
		resourceId : null,
		reviewDialogTpl : null,
		dialog : null,
		prov:'',
		provId:'',
		city:'',
		cityId:''
	},
	init : function(){
		latte.teacher.reviewTestPaper.data.reviewDialogTpl = juicer('#review-dialog-tpl');
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
		
		$('body').on('click','#btn_pass',latte.teacher.reviewTestPaper.pass);
		$('body').on('click','#btn_reject',latte.teacher.reviewTestPaper.reject);
		$('body').on('click','#btn_reback',latte.teacher.reviewTestPaper.reback);
		
	},
	
	
	getProvince : function (paperArea){
		if(paperArea==-1){
			return false;
		}
		$.ajax({
			type : "get",
			cache : false,
			async : false,
			contentType : "application/json",
			url : ctx + "/res/resource/getProvince?cityId="+paperArea,
			dataType : 'json',
			success : function(data){
				latte.teacher.reviewTestPaper.data.provId=data.cityinfo;
				for(var i=0;i<latte.teacher.search.testPaper.data.provs.length;i++){
					var pr=latte.teacher.search.testPaper.data.provs[i];
					if(latte.teacher.reviewTestPaper.data.provId==pr.id){
						latte.teacher.reviewTestPaper.data.prov=pr.name;
						break;
					}
				}
				//$('#provSel').val(latte.teacher.paper.data.prov);
				latte.teacher.reviewTestPaper.initPaperArea();
				/*$('#paperArea').val(latte.teacher.paper.postData.paperArea);*/
			} 
		});	
	},
	initPaperArea : function (){
		
		if(latte.teacher.reviewTestPaper.data.provId==-1){
			return false;
		}
		$.ajax({
			type : "get",
			cache : false,
			contentType : "application/json",
			url : ctx + "/res/resource/getCityInfo?paraId="+latte.teacher.reviewTestPaper.data.provId,
			dataType : 'json',
			success : function (data){
				for(var i=0;i<data.province.length;i++){
					var city=data.province[i];
					if(city.id==latte.teacher.reviewTestPaper.data.cityId){
						latte.teacher.reviewTestPaper.data.city=city.name;
						break ;
					}
				}
			} 
		});		
	},
	show : function(data){//点击初始化资源
		latte.teacher.reviewTestPaper.data.resourceId = data.id;
		latte.teacher.reviewTestPaper.data.cityId=data.paperArea;
		data.isPreview = false;
		latte.teacher.reviewTestPaper.getProvince(data.paperArea);
		latte.teacher.reviewTestPaper.data.dialog = art.dialog({
			lock : true,
			id : 'preview_dialog',
			title : '<em class="ico-'+data.resourceFormat+' res-mag-ico"></em>' + data.resourceName,
			content : latte.teacher.reviewTestPaper.data.reviewDialogTpl.render(data),
			init:function(){
				data.resourceType=3;
				latte.teacher.preview.init(data,function(data){
//					$('#topic_name').find('span').html(data.topic);
//					$('#series_name').find('span').html(data.series);
					$('#stage_name').find('span').html(data.stage+ " "+ data.subject);
					$('#testAreaSpan').find('span').html(latte.teacher.reviewTestPaper.data.prov+ "-"+ latte.teacher.reviewTestPaper.data.city);
				});
			},
			top : 46
		});
	},
	view : function(data){//点击初始化资源
		latte.teacher.reviewTestPaper.data.resourceId = data.id;
		latte.teacher.reviewTestPaper.data.cityId=data.paperArea;
		data.isPreview = true;
		latte.teacher.reviewTestPaper.getProvince(data.paperArea);
		latte.teacher.reviewTestPaper.data.dialog = art.dialog({
			lock : true,
			id : 'preview_dialog',
			title : '<em class="ico-'+data.resourceFormat+' res-mag-ico"></em>' + data.resourceName,
			content : latte.teacher.reviewTestPaper.data.reviewDialogTpl.render(data),
			init:function(){
				data.resourceType=3;
				latte.teacher.preview.init(data,function(data){
//					$('#topic_name').find('span').html(data.topic);
//					$('#series_name').find('span').html(data.series);
					$('#stage_name').find('span').html(data.stage+ " "+ data.subject);
					$('#testAreaSpan').find('span').html(latte.teacher.reviewTestPaper.data.prov+ "-"+ latte.teacher.reviewTestPaper.data.city);
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
					"resourceType":3,
					"resource":latte.teacher.reviewTestPaper.data.resourceId
				})
				,
				success : function(response){
					util.dialog.timerDialog(0.5,'操作成功',function(){
						latte.teacher.reviewTestPaper.data.dialog.close();
						latte.teacher.search.testPaper.searchResource();
	            	});
				} 
			});
		});
	},
	reject : function(){
		var id = $(this).attr('data-id');
		util.dialog.defaultDialog('拒绝理由:<br><textarea id="reject_reason" maxlength=100 style="width:300px;height:60px;" />',function(){
			var reason = util.escapeSpace($('#reject_reason').val());
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
					"resourceType":3,
					"resource":latte.teacher.reviewTestPaper.data.resourceId,
					"refuseReason":reason
				}),
				dataType : 'json',
				success : function(response){
					util.dialog.timerDialog(0.5,'操作成功',function(){
						latte.teacher.reviewTestPaper.data.dialog.close();
						latte.teacher.search.testPaper.searchResource();
	            	});
				} 
			});
		});
	},
	reback : function(){
		latte.teacher.reviewTestPaper.data.dialog.close();
	}
};

