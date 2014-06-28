latte.createcourse = {
		courseware_uploader : null,
		uploaddialog : null,
		data : {
			stageId  : 0, //学段Id
		  subjectId  : 0,  //学科Id
		      type   : 't'
		},
		postData : {
			resourceName : '',
			intro : ' ',
			topics : {},
			stage : {},
			subject : {},
			phase : -1,
			series : {},
			rid:-1,
			shareLevel:0,
			addWay : 0
		},
		
		init : function(){
			$.when().done(function(){
				latte.createcourse.data.stageId = $('#stageId').val();
				latte.createcourse.data.subjectId = $('#subjectId').val();
				latte.createcourse.getmodules();
			});
			
			$('#grade_selector,#subject_selector').bind('change',function(){
				latte.createcourse.getmodules();
			});
			

			$('#kownledge_module').on('click','a',function(){//知识模块事件
				var $a = $(this);
				$(this).addClass('current');
				$a.siblings('a').removeClass('current');
				if(latte.createcourse.data.type == 't'){
					latte.createcourse.getunits();
				}else{
					latte.createcourse.getseries();
				}
				//call function
			});

			$('#kownledge_unit').on('click','a',function(){//知识单元事件
				var $a = $(this);
				$(this).addClass('current');
				$a.siblings('a').removeClass('current');
				latte.createcourse.gettopics();
			});

			$('#kownledge_topic').on('click','a',function(){//知识主题事件
				var $a = $(this);
				var $input = $(this).find('input');
				
				if($input.attr('checked')){
					
					var exist = latte.createcourse.data.type+'_'+$input.val();
					var list = new Array();
					$('#kownledge_selected span').each(function(index){
						list.push($(this).attr('exist'));
					});
					if($.inArray(exist,list) >= 0 ){
						alert("不能重复添加主题或者专题!");
						//$input.attr('checked',false);
					}else{
						var html = '';
						html+='<div class="BtnGray23 ids" id="'+latte.createcourse.data.type+'_'+$input.val()+'_'+$a.text().replace('\r','').replace('\n','')+'" data-id="'+$input.val()+'">';
						html+='<a href="javascript:void(0)" class="btnSave"><span'+' exist = '+ latte.createcourse.data.type+'_'+$input.val()+' >'+$a.text().replace('\r','').replace('\n','')+'<em class="swIco02"></em></span></a>';
						html+='</div>';
						$('#removeAll').before(html);
					}
					
				}else{
					var target = $('#'+latte.createcourse.data.type+'_'+$input.val());
					if(target.length > 0){
						target.remove();
					}
				}
			});
			$('#removeAll').click(function(){
				$(this).siblings('div').remove();
				$('#kownledge_topic').find('dd').find('a').find('input').removeAttr('checked');
			});
			
			$('#kownledge_selected').on('click','.swIco02',function(){
				var $obj = $(this).parents('.BtnGray23');
				var id = latte.createcourse.data.type+'_c_'+$obj.attr('data-id');
				$('#'+id).find('input').removeAttr('checked');
				$obj.remove();
			});
			
			$('#btn_goto_whiteboard').click(function(){latte.createcourse.commitWithoutFile();});
			
			latte.createcourse.getunits();
			latte.createcourse.gettopics();
			
			$('#kownledge_type').on('click','a',function(){//知识模块事件
				var $a = $(this);
				$(this).addClass('current');
				$a.siblings('a').removeClass('current');
				if(latte.createcourse.data.type == 't'){
					latte.createcourse.getunits();
				}else{
					latte.createcourse.getseries();
				}
				//call function
			});
			
			
			//文件上传控件参数配置
		plupload.addI18n({
	        'File extension error.' : '文件类型错误',
	        'File size error.' : '文件大小超出限制'
	    });
		latte.createcourse.courseware_uploader = new plupload.Uploader({
		        runtimes : 'html5,flash',
		        browse_button : 'dlg_btn_upload_ppt', //选择文件按钮ID 
		        max_file_size : '50mb',  //文件上传最大值
		        chunks : false,//不分块上传
		        unique_names : true,  // 上传的文件名是否唯一,只有在未进行分块上传时文件名唯一才有效
		        url: ctx+ "/teacher/courseware/create/createbyupload",
		        flash_swf_url: static_ctx+'/js/lib/plupload/plupload.flash.swf',//plupload.flash.swf文件所在路径
		        multi_selection : false,
		        filters: [
		              {title: "document", extensions: "pptx"}
		        ],
		        init : {
		            FileUploaded : function(up, file, info) {
		            	latte.createcourse.courseware_uploader.disableBrowse(true);
		            	latte.createcourse.uploaddialog.close();
		            	window.open(info.response,"_blank");
		            	latte.createcourse.courseware_uploader.disableBrowse(false);
		            },
		            FilesAdded : function(up, files){
		            	$('#file_name').text(files[0].name);
		            	latte.createcourse.postData.resourceName = files[0].name;
		            	$('#dlg_btn_upload_ppt').hide();
		            	$('#dlg_btn_commit_ppt').show();
		            },
		            BeforeUpload : function(up, file){
		            	latte.createcourse.courseware_uploader.disableBrowse(false);
		            },
		            UploadProgress : function(up, file) { 
		                
		            	$('#progress_bar').css('width',file.percent+'%');
		            	//$('#progress_bar').text('已上传'+file.percent+'%');
		                if(file.percent === 100){
		                	//$('#progress_bar').text('文件处理中...');
		                }
		            },
		            Error : function(up, err) {
		            	latte.createcourse.courseware_uploader.disableBrowse(false);
		                up.refresh(); // Reposition Flash/Silverlight
		                util.dialog.errorDialog(err.message);
		            }
		        }
		    });
			$('#btn_upload_ppt').click(function(){latte.createcourse.commit();});
		},
		
		postCourseware : function(){
			
			latte.createcourse.postData.topics = new Array();
			latte.createcourse.postData.series = new Array();
			$.each($("#kownledge_selected div"), function() {
				
				var obj = $(this).attr('id');
				var type = obj.substring(0,1);
				var id = obj.substring(obj.indexOf('_')+1,obj.lastIndexOf('_')); 
				var name = obj.substring(obj.lastIndexOf('_')+1,obj.length);
				if(type == 't'){
					var topic = {
						"id" : id,
						"name" : name
					};
					latte.createcourse.postData.topics.push(topic);
				}
				if(type == 's'){
					var series = {
						"id" : id,
						"name" : name
					};
					latte.createcourse.postData.series.push(series);
				}
				
			});
			
			var data = {"courseware" : JSON.stringify(latte.createcourse.postData)};
			latte.createcourse.courseware_uploader.settings.multipart_params = data;
			latte.createcourse.courseware_uploader.start();
		},
		
		commit : function() {
			
			var html = '<div class="infoSwBox">';
			html+='<a href="javascript:void(0);" class="infoSw">';
			html+='<span class="swIco01"></span>';
			html+='<p id="file_name"></p>';
			html+='</a>';
			html+='<div class="infoBarBox">';
			html+='<div class="infoBar" style="width:200px;background:#FFFFFF;height:20px;">';
			html+='<div id="progress_bar" style="width:0%;background:blue;" class="barBg"></div>';
			html+='</div>';
			html+='</div>';
			html+='</div>';
			html+='<div><span id="dlg_btn_upload_ppt">选择文件</span></div>';
			html+='<div><span id="dlg_btn_commit_ppt" style="display:none;">上传</span></div>';
			
			if($('#kownledge_selected span').length == 0){
				art.dialog({
					width:400,
					height:300,
					title : '提示',
					content : '请先选择要制作课件的主题或者专题!',
				});
				return;
			}

			var uploaddialog = art.dialog({
				width:400,
				height:300,
				title : '上传ppt',
				content : html,
				init : function(){
					latte.createcourse.courseware_uploader.destroy();
					latte.createcourse.courseware_uploader.init();
					$('#dlg_btn_commit_ppt').unbind('click');
					$('#dlg_btn_commit_ppt').click(function(){latte.createcourse.postCourseware();});	
				}
			});
			
			latte.createcourse.uploaddialog = uploaddialog;
		},
		commitWithoutFile : function() {
			
			if($('#kownledge_selected span').length == 0){
				art.dialog({
					width:400,
					height:300,
					title : '提示',
					content : '请先选择要制作课件的主题或者专题!',
				});
				return;
			}
			
			latte.createcourse.postData.topics = new Array();
			latte.createcourse.postData.series = new Array();
			
			$.each($("#kownledge_selected div"), function() {
				
				var obj = $(this).attr('id');
				var type = obj.substring(0,1);
				var id = obj.substring(obj.indexOf('_')+1,obj.lastIndexOf('_')); 
				var name = obj.substring(obj.lastIndexOf('_')+1,obj.length);
				if(type == 't'){
					var topic = {
						"id" : id,
						"name" : name
					};
					latte.createcourse.postData.topics.push(topic);
				}
				if(type == 's'){
					var series = {
						"id" : id,
						"name" : name
					};
					latte.createcourse.postData.series.push(series);
				}
				
			});
			
		 
			
			$.ajax({
				type : 'POST',
				contentType : 'application/json',
				url : ctx + "/teacher/courseware/create/createonline",
				dataType: "json",
				data : JSON.stringify(latte.createcourse.postData),
				success : function(response) {      
					window.open(response.boardUrl,"_blank");
					//window.location.href = response.boardUrl;
				},
				error : function(response) {
					alert(response.msg);
				}
			});
		},
		
		getmodules : function(){	 //获取所有模块数据
			latte.createcourse.data.type = 't';
			$('#kownledge_unit').show();
			$('#kownledge_topic dt').html('<em>*</em>知识主题：');
			var stageid = latte.createcourse.data.stageId;
			var subjectid = latte.createcourse.data.subjectId;
			
			$.ajax({	
				url:ctx+ "/teacher/courseware/create/getmodules/"+stageid+"/"+subjectid,	
				contentType : 'application/json',
				type: "GET",	
				dataType: "json",	
				success: function(response) {		
					var result = JSON.parse(JSON.stringify(response));
					var html = '';
					for(var index in result){
						var module = result[index];
						if(index == 0)
							html += '<a class="current" href="javascript:void(0);" data-id="'+module.id+'" >'+module.name+'</a>';
						else{
							html += '<a href="javascript:void(0);" data-id="'+module.id+'">'+module.name+'</a>';
						}
					}
					$('#kownledge_module dd').html(html);
					
					latte.createcourse.getunits();
				},	
				error: function(response) {}
			});
		},
		getunits : function(moduleid){
			if(!moduleid)
				moduleid = $('#kownledge_module dd a.current').attr('data-id');
			if(!moduleid)
				return false;
			//if(moduleid == 1) moduleid=5;
			var stageid = latte.createcourse.data.stageId;
			var subjectid = latte.createcourse.data.subjectId;
			
			$.ajax({	
				url:ctx+ "/teacher/courseware/create/getunits/"+stageid+"/"+subjectid+"/"+moduleid,	//获取所有学段数据	/2/2/1
				contentType : 'application/json',
				type: "GET",	
				dataType: "json",	
				success: function(response) {
					var result = JSON.parse(JSON.stringify(response));
					var html = '';
					for(var index in result){
						var unit = result[index];
						if(index == 0)
							html += '<a class="current" href="javascript:void(0);" data-id="'+unit.id+'" >'+unit.name+'</a>';
						else{
							html += '<a href="javascript:void(0);" data-id="'+unit.id+'">'+unit.name+'</a>';
						}
					}
					$('#kownledge_unit dd').html(html);
					if($('#kownledge_unit a').length == 0 ){
						$('#kownledge_unit dd').html('<a href="javascript:void(0);" class="text">该模块下无相关知识单元</a>'); //
						$('#kownledge_topic dd').html('<a href="javascript:void(0);" class="text" >该单元下无相关知识主题</a>');
					}else{
						latte.createcourse.gettopics();
					}
				},	
				error: function(response) {}	
			}); 
		},
		gettopics : function(unitid){
			if(!unitid)
				unitid = $('#kownledge_unit dd a.current').attr('data-id');
			if(!unitid)
				return false;
			
			var stageid = latte.createcourse.data.stageId;
			var subjectid = latte.createcourse.data.subjectId;
			
			$.ajax({	
				url:ctx+"/teacher/courseware/create/gettopics/"+stageid+"/"+subjectid+"/"+unitid,	//获取主题
				contentType : 'application/json',
				type: "GET",	
				dataType: "json",	
				success: function(response) {	 
					var result = JSON.parse(JSON.stringify(response));
					var html = '';
					for(var index in result){
						var topic = result[index];
						var id = latte.createcourse.data.type+'_c_'+topic.id;
						if(index == 0)
							html += '<a id="'+id+'" href="javascript:void(0);" data-id="'+topic.id+'" ><input type="checkbox" value="'+topic.id+'"/>&nbsp;'+topic.name+'</a>';
						else{
							html += '<a id="'+id+'" href="javascript:void(0);" data-id="'+topic.id+'"><input type="checkbox" value="'+topic.id+'" />&nbsp;'+topic.name+'</a>';
						}
					}
					
					$('#kownledge_topic dd').html(html);
					if($('#kownledge_topic a').length == 0){
						$('#kownledge_topic dd').html('<a href="javascript:void(0);" class="text">该单元无相关知识主题</a>');
					}
				},	
				error: function(response) {}	
			});
		},
		getseries : function(moduleid){
			latte.createcourse.data.type = 's';
			$('#kownledge_unit').hide();
			$('#kownledge_topic dt').html('<em>*</em>知识专题：');
			if(!moduleid)
				moduleid = $('#kownledge_module dd a.current').attr('data-id');
			
			var stageid = latte.createcourse.data.stageId;
			var subjectid = latte.createcourse.data.subjectId;
			
			$.ajax({	
				url:ctx+ "/teacher/courseware/create/getseries/"+stageid+"/"+subjectid+"/"+moduleid,	//获取所有单元数据
				contentType : 'application/json',
				type: "GET",	
				dataType: "json",	
				success: function(response) {	 
					var result = JSON.parse(JSON.stringify(response));
					var html = '';
					for(var index in result){
						var series = result[index];
						var id = latte.createcourse.data.type+'_c_'+series.id;
						if(index == 0)
							html += '<a id="'+id+'" href="javascript:void(0);" data-id="'+series.id+'" ><input type="checkbox" value="'+series.id+'" />&nbsp;'+series.name+'</a>';
						else{
							html += '<a id="'+id+'" href="javascript:void(0);" data-id="'+series.id+'"><input type="checkbox" value="'+series.id+'" />&nbsp;'+series.name+'</a>';
						}
					}
					
					$('#kownledge_topic dd').html(html);
					$('#kownledge_topic dd').html(html);
					if($('#kownledge_topic a').length == 0){
						$('#kownledge_topic dd').html('<a href="javascript:void(0);" class="text">该单元无相关知识专题</a>');
					}
				},	
				error: function(response) {
					//var result = JSON.parse(JSON.stringify(response));
				}	
			});
		},
		createIndex : function(){
			$.ajax({	
				url:ctx+"/teacher/courseware/create/creat/"+id,	//获取主题
				contentType : 'application/json',
				type: "GET",	
				dataType: "json",	
				success: function(response) {},	
				error: function(response) {}	
			});
		}
};