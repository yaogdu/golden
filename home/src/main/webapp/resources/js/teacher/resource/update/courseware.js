latte.teacher.courseware = {
	data : {
		themeSelectorTpl : null,
		specialSelectorTpl : null,
		optionRatternTpl : null,
		fileUploader : null,
		zhuti_module : null,// 当前选择主题
		zhuanti_module : null,
		subjects : [],
		series : [],
		moduleTopic : null,
		moduleSeries : null
	// 当前选择专题
	},
	updateUrl: '',
	valid:false,
	topicData : [],
	updateFile : false,
	postData : {
		id : 0,
		resourceName : '',
		intro : ' ',
		topics : [], 
		stage : {},
		subject : {},
		phase : -1,
		series : [], 
		rid:-1,
		addWay:0
	},
	init : function() {
		latte.teacher.courseware.postData.id = $("#id").val();
		$('#hd_menu_resource').addClass('current');
		$('#lmenu_add').addClass('current');
		latte.teacher.courseware.optionRatternTpl = juicer($('#option-pattern-tpl')
				.html());

		latte.teacher.courseware.initSrc();
		latte.teacher.courseware.initTab();
		//latte.teacher.courseware.initUploader();
		latte.teacher.courseware.initCourseware();
		
		// $('#btn_select_theme').click(latte.teacher.courseware.showThemeSelector);
		// $('#btn_select_special').click(latte.teacher.courseware.showSpecialSelector);
		$('#btn_save_courseware').click(latte.teacher.courseware.commit);
	},
	initCourseware : function() {
		$.ajax({
			type : "get",
			cache : false,
			contentType : "application/json",
			url : ctx + "/teacher/resource/getInfo",
			dataType : 'json',
			data : {
				"resourceId" : latte.teacher.courseware.postData.id,
				"resourceType" : 0
			},
			success : function(response) {
				var data =response.object;
				
				if(response.boardUrl!=undefined){
					latte.teacher.courseware.valid=true;
					var url=response.boardUrl;
					url+='&series='+response.series;
					url+='&topic='+response.topic;
					url+='&subject='+response.subject;
					url+='&md5='+response.md5;
					url+='&stage='+response.stage;
					url+='&resourceName='+response.resourceName;
					latte.teacher.courseware.updateUrl=url;
				}
				
//				
//				$('input[name=addway][value=' + data.addWay + ']').attr(
//						'checked', 'checked');
				latte.teacher.courseware.postData.addWay = data.addWay;
				
				if (data.addWay == 0) {
					$("#courseware_file").show();
					latte.teacher.courseware.postData.addWay = 0;
//					$('#btn_save_courseware').click(latte.teacher.courseware.commit);

					$('#file a').text('更改课件内容');
					$('#courseware_file .search').hide();
					$('#courseware_file .info').show();
					$('#courseware_file_name').text(data.fileName);
				} else if (data.addWay == 1) {
					$("#courseware_file").hide();
					latte.teacher.courseware.postData.addWay = 1;
//					$('#btn_save_courseware').click(
//					latte.teacher.courseware.commitWithoutFile);
				}
				  
				/*$("#resourceFormat").val(
						util.getFormatParent(util.getTail(data.fileName)));
				latte.teacher.courseware.postData.resourceFormat = util
						.getFormatParent(util.getTail(data.fileName));*/
				$('#resourceName').val(data.resourceName);
				latte.teacher.courseware.postData.resourceName = data.resourceName;
				$('.infoTextarea').val(data.intro);
				latte.teacher.courseware.postData.intro = data.intro;
				$('input[name=phase][value=' + data.phase + ']').attr(
						'checked', 'checked');
				latte.teacher.courseware.postData.phase = data.phase;
				
				var sharelevel=data.shareLevel;
				$('input[name=sharelevel][value='+sharelevel+']').attr('checked','checked');
				if(sharelevel==2){
					$('#stage').val(data.stage.id);
					latte.teacher.courseware.postData.stage = data.stage;
					latte.teacher.courseware.initStage($('#stage').val());
					$('#subject').val(data.subject.id);
					latte.teacher.courseware.postData.subject = data.subject;
	
					latte.teacher.courseware.postData.topics = new Array();
					$.each(data.topics, function(idx, itm) {
						var topic = data.topics[idx];
						var option = $("<option value='" + topic.id + "'>"
								+ topic.name + "</option>");
						$('#zhuti_selected').append(option);
						var obj = {
							"id" : topic.id,
							"name" : topic.name
						};
						latte.teacher.courseware.postData.topics.push(obj);
					});
					latte.teacher.courseware.initTopic(data.subject.id);
					var moduleSeries = latte.teacher.courseware.data.moduleSeries;
					
					$("#series").empty();
					var moduleid = -1;
					var seriesid = -1;
					var b = false;
					for (var i = 0; i < moduleSeries.length; i++) {
						var module = moduleSeries[i];
						if (!b) {
							var series = module.series;
							for (var j = 0; j < series.length; j++) {
								var s = series[j];
								if (!b) {
									if (s.id == data.series.id) {
										moduleid = module.id;
										seriesid = s.id;
										b = true;
										break;
									}
								} else {
									break;
								}
							}
						} else {
							break;
						}
					}
	
					$('#seriesModule').val(moduleid);
					latte.teacher.courseware.initSeries(moduleid);
					$('#series').val(seriesid);
					latte.teacher.courseware.postData.series =[{"id": seriesid}];
					/*var au = data.audience;
					if (au == 2) {
						$('#auth_teacher').attr('checked', 'checked');
						$('#auth_student').attr('checked', 'checked');
					} else if (au == 1) {
						$('#auth_student').attr('checked', 'checked');
					} else if (au == 0) {
						$('#auth_teacher').attr('checked', 'checked');
					}
					latte.teacher.courseware.postData.audience = au;*/
					$("#rms").val(data.rid);
					latte.teacher.courseware.postData.rid =data.rid;
					
				}else{
					latte.teacher.courseware.postData.stage={};
					latte.teacher.courseware.postData.subject ={};
					latte.teacher.courseware.postData.topics =[];
					latte.teacher.courseware.postData.series=[]; 
					latte.teacher.courseware.initTopic($("#subject").val());
				}
				latte.teacher.courseware.postData.shareLevel=data.shareLevel;
				latte.teacher.courseware.hiddenDetail();
			},
			error : function() {
				alert("error");
			}
		});
	},
	/* init kings of values */
	initSrc : function() {
		$.ajax({
			type : "get",
			cache : false,
			contentType : "application/json",
			url : ctx + "/teacher/resource/initCourseware",
			dataType : 'json',
			success : latte.teacher.courseware.handleInit,
			error : function() {
				alert("error");
			}
		});
	},
	handleInit : function(data) {
		var result =data;
		/*var formats = result.formats; 
		$("<option value='-1'></option>").appendTo($("#resourceFormat"));
		for (var i = 0; i < formats.length; i++) {
			var format = formats[i];
			$(
					"<option value='" + format.dictCode + "'>"
							+ format.dictName + "</option>").appendTo(
					$("#resourceFormat"));
		}
		$('#resourceFormat').on("change", function() {
			latte.teacher.courseware.postData.resourceFormat = $(this).val();
		});
		$('#resourceFormat').attr('disabled', 'disabled');*/
		// phase handle
		var phases = result.phase;
		ht = "";
		for (var i = 0; i < phases.length; i++) {
			var phase = phases[i];
			ht += "<div class=\"infoRadio\">";
			ht += "<input type=\"radio\" name=\"phase\"  class=\"infoRadio\" value=\""
					+ phase.dictCode + "\"/>";
			ht += "<p class=\"infoLabel\">" + phase.dictName + "</p></div>";
		}
		$('#courseware_phase').append(ht);

		$('#courseware_phase').on("click",'input', function() {

			latte.teacher.courseware.postData.phase = $(this).val();
		});

		
		$('#courseware_sharelevel').on("click",'input', function() {
			latte.teacher.courseware.postData.shareLevel = $(this).val();
			latte.teacher.courseware.hiddenDetail();
		});
		
		
		var rms=result.rms;
		$("<option value=-1>请选择</option>").appendTo('#rms');
		for(var i=0;i<rms.length;i++){
			var rm=rms[i];
			$("<option value='"+rm.id+"'>"+rm.name+"</option>").appendTo('#rms');
		}
		$("#rms").on("change", function() {
			latte.teacher.courseware.postData.rid = $(this).val();
		});

		
		var stages = result.stage;

		latte.teacher.courseware.data.subjects = new Array();
		for (var i = 0; i < stages.length; i++) {
			var stage = stages[i];
			if (i == 0) {
				latte.teacher.courseware.postData.stage = {
					"id" : stage.id
				};
			}
			$("<option value='" + stage.id + "'>" + stage.name + "</option>")
					.appendTo($("#stage"));
			var subjects = stage.subject;

			for (var j = 0; j < subjects.length; j++) {
				var subject = subjects[j];
				subject.stage = stage.id;
				latte.teacher.courseware.data.subjects.push(subject);

				if (i == 0) {
					$(
							"<option value='" + subject.id + "'>"
									+ subject.name + "</option>").appendTo(
							$("#subject"));
					if (j == 0) {
						latte.teacher.courseware.postData.subject = {
							"id" : subject.id
						};
					}
				}
			}
		}

		$("#stage").on("change", function() {
			latte.teacher.courseware.postData.stage = {
				"id" : $(this).val()
			};
			latte.teacher.courseware.initStage($(this).val());
		});
		$("#subject").on("change", function() {
			latte.teacher.courseware.postData.subject = {
				"id" : $(this).val()
			};
			latte.teacher.courseware.initTopic($("#subject").val());
			$('#zhuti_unit').html('');
			$('#zhuti_topic').html('');
		});
		//latte.teacher.courseware.initTopic($("#subject").val());

	},
	initStage : function(stageId) {
		$("#subject").empty();
		var subjects = latte.teacher.courseware.data.subjects;
		for (var j = 0; j < subjects.length; j++) {
			var subject = subjects[j];
			if (subject.stage == stageId) {
				$(
						"<option value='" + subject.id + "'>" + subject.name
								+ "</option>").appendTo($("#subject"));
			}
		}
	},
	initTopic : function(subjectId) {
		$.ajax({
			type : "get",
			cache : false,
			async : false,
			contentType : "application/json",
			url : ctx + "/teacher/resource/loadTopic/" + subjectId,
			dataType : 'json',
			success : latte.teacher.courseware.initTopicData,
			error : function() {
				alert("error");
			}
		});
	},
	initTopicData : function(response) {
		latte.teacher.courseware.topicData = response;
		latte.teacher.courseware.handleTopic(latte.teacher.courseware.topicData);
	},
	handleTopic : function(topicData) {
		var modules =  JSON.parse(JSON.stringify(topicData));

		latte.teacher.courseware.data.moduleTopic = modules.moduleTopic;
		latte.teacher.courseware.loadModuleList(latte.teacher.courseware.data.moduleTopic);
		var moduleSeries = modules.moduleSeries;
		latte.teacher.courseware.data.moduleSeries = moduleSeries;
		latte.teacher.courseware.series = new Array();
		$("#seriesModule").empty();
		$("#series").empty();
		$("<option value='-1'>请选择</option>").appendTo($("#seriesModule"));
		$("<option value='-1'>请选择</option>").appendTo($("#series"));
		for (var i = 0; i < moduleSeries.length; i++) {
			var module = moduleSeries[i];

			$("<option value='" + module.id + "'>" + module.name + "</option>")
					.appendTo($("#seriesModule"));
			var series = module.series;
			for (var j = 0; j < series.length; j++) {
				var s = series[j];
				s.module = module.id;
				latte.teacher.courseware.series.push(s);
				// if(i==0){
				// $("<option value='" + s.id + "'>" + s.name + "</option>")
				// .appendTo($("#series"));
				// if(j==0){
				// latte.teacher.courseware.postData.series={"id":s.id};
				// }
				// }
			}
		}
	},
	initSeries : function(moduleId) {
		$("#series").empty();
		if (moduleId == -1) {
			$("<option value='-1'>请选择</option>").appendTo($("#series"));
			latte.teacher.courseware.postData.series = [];
		} else {
			var series = latte.teacher.courseware.series;
			for (var j = 0; j < series.length; j++) {
				var s = series[j];
				if (s.module == moduleId) {
					$("<option value='" + s.id + "'>" + s.name + "</option>")
							.appendTo($("#series"));
				}
			}
			latte.teacher.courseware.postData.series = [{
				"id" : $('#series').val()
			}];
		}
	},
	hiddenDetail:function(){
		var shareLevel=latte.teacher.courseware.postData.shareLevel;
		if(shareLevel<2){
			$('#hidden').hide();
		}else{
			$('#hidden').show();
		}
	},
	/* init ends */
	initTab : function() {// 初始化顶部tab标签
		$('.TabTit li').click(function() {
			$(this).siblings('li').removeClass('current');
			$(this).addClass('current');
			/** 在这里添加点击tab标签触发的事件 */
		});

		$("#seriesModule").on("change", function() {
			latte.teacher.courseware.initSeries($(this).val());
		});
		$("#series").on("change", function() {
			latte.teacher.courseware.postData.series = [{
				"id" : $(this).val()
			}];
		});
 
		$("#resourceName").change(function() {
			latte.teacher.courseware.postData.resourceName = $(this).val();
		});
		$(".infoTextarea").change(function() {
			latte.teacher.courseware.postData.intro = $(this).val();
		});
		

		$("#rms").on("change", function() {
			latte.teacher.courseware.postData.rid = $(this).val();
		});
		
		
//		$("input[name='addway']").on(
//				"click",
//				function() {
//					var selected = $("input[name='addway']:checked").val();
//					if (selected == 0) {
//						$("#courseware_file").show();
//						latte.teacher.courseware.postData.addWay = 0;
////						$('#btn_save_courseware').click(
////								latte.teacher.courseware.commit);
//
//					} else if (selected == 1) {
//						$("#courseware_file").hide();
//						latte.teacher.courseware.postData.addWay = 1;
////						$('#btn_save_courseware').click(
////								latte.teacher.courseware.commitWithoutFile);
//					}
//				});
		$('#file a').on('click',function(){
			if(latte.teacher.courseware.valid){
				window.open(latte.teacher.courseware.updateUrl,"_blank");
			}else{
				util.dialog.infoDialog('文件内容存在问题');
			}
		});
	},
//	initUploader : function() {// 初始化文件上传控件
//		latte.teacher.courseware.fileUploader = new plupload.Uploader(
//				{
//					runtimes : 'html5,flash',
//					browse_button : 'file', // 选择文件按钮ID
//					max_file_size : '20mb', // 文件上传最大值
//					chunks : false,// 不分块上传
//					unique_names : true, // 上传的文件名是否唯一,只有在未进行分块上传时文件名唯一才有效
//					url : ctx + "/teacher/courseware/update",
//					flash_swf_url : static_ctx
//							+ '/js/lib/plupload/plupload.flash.swf',// plupload.flash.swf文件所在路径
//					multi_selection : false,
//					init : {
//						FileUploaded : function(up, file, info) {
//							$('#btn_save_courseware').css('disabled', '');// 启用保存按钮
//							$('#file a').text('修改');
//							latte.teacher.courseware.fileUploader.disableBrowse(false);
//							var data = eval('(' + info.response + ')');
//							if (data.success == false) {
//								util.dialog.errorDialog('失败');
//								return;
//							} else {
//								util.dialog.messageDialog('成功');
//								return;
//							}
//
//						},
//						FilesAdded : function(up, file) {
//							$('#file a').text('修改');
//							$('#courseware_file .search').hide();
//							$('#courseware_file .info').show();
//							$('#courseware_file_name').text(file[0].name);
//							/*$("#resourceFormat").val(
//									util.getFormatParent(util
//											.getTail(file[0].name)));
//							latte.teacher.courseware.postData.resourceFormat = util
//									.getFormatParent(util.getTail(file[0].name));*/
//							latte.teacher.courseware.updateFile = true;
//						},
//						BeforeUpload : function(up, file) {
//							latte.teacher.courseware.fileUploader.disableBrowse(true);
//							$('#btn_save_courseware').css('disabled', '');// 禁用保存按钮
//						},
//						UploadProgress : function(up, file) {
//							$('#courseware_file .barBg').css('width',
//									file.percent + '%');
//						},
//						Error : function(up, err) {
//							latte.teacher.courseware.fileUploader.disableBrowse(false);
//							up.refresh(); // Reposition Flash/Silverlight
//							util.dialog.errorDialog(err.message);
//						}
//					}
//				});
//		latte.teacher.courseware.fileUploader.init();
//	},
	commit : function() {// 提交

		var b = latte.teacher.courseware.updateFile;
		
		var sharelevel=latte.teacher.courseware.postData.shareLevel;
		if(sharelevel<2){
			
		}else{
			latte.teacher.courseware.postData.topics = new Array();
	
			$.each($("#zhuti_selected option"), function(idx, itm) {
				var obj = {
					"id" : $(itm).val(),
					"name" : $(itm).text()
				};
				latte.teacher.courseware.postData.topics.push(obj);
			});
	
			var errorMessage = '';
			for ( var key in latte.teacher.courseware.postData) {
				if ( key != "series") {
					if (latte.teacher.courseware.postData[key] == -1) {
						errorMessage += key + ",";
					}
				} 
			}
			if (latte.teacher.courseware.postData.topics.length == 0
					&& util.isEmptyObject(latte.teacher.courseware.postData.series)) {
				errorMessage += '主题,';
			}
			latte.teacher.courseware.postData.stage={'id':$('#stage').val(),'name':$('#stage').text()};
			latte.teacher.courseware.postData.subject={'id':$('#subject').val(),'name':$('#subject').text()};
			if (errorMessage.length > 0) {
				util.dialog.errorDialog("请输入完整");
				return false;
			}
		}
		 
		var data = {
			"courseware" : JSON.stringify(latte.teacher.courseware.postData)
		};
		if (b) {
			latte.teacher.courseware.fileUploader.settings.multipart_params = data;
			latte.teacher.courseware.fileUploader.settings.url = ctx
					+ "/teacher/courseware/update";// 拼接上传url与param
			latte.teacher.courseware.fileUploader.start();// 上传

		} else {
			$.ajax({
				type : 'POST',
				contentType : 'application/json',
				url : ctx + "/teacher/courseware/updateWithoutFile",
				dataType : "json",
				data : JSON.stringify(latte.teacher.courseware.postData),
				success : function(response) {
					alert("成功");
				},
				error : function(response) {
					alert("出现错误!");
				}
			});
		}
	},
	loadModuleList : function(data) {
		var $moodule = $('#zhuti_module');
		$moodule.html('');
		for ( var mindex in data) {
			var module = data[mindex];
			var option = $("<option value='" + module.id + "'>" + module.name
					+ "</option>");
			option.data(module.units);
			option.click(latte.teacher.courseware.loadUnitList);
			$moodule.append(option);
		}
	},
	loadUnitList : function() {
		var $unit = $('#zhuti_unit');
		$unit.html('');
		var units = $(this).data();
		for ( var uindex in units) {
			var unit = units[uindex];
			var option = $("<option value='" + unit.id + "'>" + unit.name
					+ "</option>");
			option.data(unit.topics);
			option.click(latte.teacher.courseware.loadTopicList);
			$unit.append(option);
		}
	},
	loadTopicList : function() {
		var $topic = $('#zhuti_topic');
		var topics = $(this).data();
		$topic.html('');
		for ( var tindex in topics) {
			var topic = topics[tindex];
			var option = $("<option value='" + topic.id + "'>" + topic.name
					+ "</option>");
			$topic.append(option);
		}
	},
	showThemeSelector : function() {// 主题选择
		latte.teacher.courseware.loadModuleList(latte.teacher.courseware.data.moduleTopic);
	},
	refreshUnitList : function() {
		var zhuti = $("#zhuti_module").val();
		if (!zhuti) {
			zhuti = Evaluation.data.zhuti_module;
		} else {
			Evaluation.data.zhuti_module = zhuti;
		}

		$.getJSON("../../unit/module/" + zhuti).done(function(data) {
			$("#zhuti_unit").append(optionRatternTpl({
				list : data
			}));
		});
	},
	refreshTopicList : function() {
		$.getJSON("../../unit/topic/" + $("#zhuti_unit").val()).done(
				function(data) {
					$("#zhuti_topic").append(optionRatternTpl({
						list : data
					}));
				});
	},
	showSpecialSelector : function() {// 专题选择
		art
				.dialog({
					width : 800,
					id : 'msg_dialog',
					title : '信息',
					content : $('#special-selector-tpl').html(),
					okValue : '确认',
					init : function() {
						latte.teacher.courseware.loadModuleList();
						// 绑定事件
					},
					ok : function() {
						var linkedTopicIds = "";
						var linkedTopicNames = "";
						$
								.each(
										$("#zhuanti_selected option"),
										function(idx, itm) {
											linkedTopicIds += $(itm).val()
													+ ",";
											linkedTopicNames += '<li id="zhuanti'
													+ $(itm).val()
													+ '" style="list-style: none;">'
													+ $(itm).text()
													+ '<em style="font-size:16px;cursor:pointer;margin-right:2px;" onclick="QuestionEdit.delZhuanti(\''
													+ $(itm).val()
													+ '\')">x</em>;</li>';

										});
						if (linkedTopicIds.lastIndexOf(",") == linkedTopicIds.length - 1) {
							linkedTopicIds = linkedTopicIds.substr(0,
									linkedTopicIds.length - 1);
						}
						$('#zhuanti').val(linkedTopicIds);
						$('#zhuanti_show').html(linkedTopicNames);
					},
					cancelValue : '取消',
					cancel : function() {
					}
				});
	},
	refreshSeriesList : function() {
		var zhuanti = $("#zhuanti_module").val();
		if (!zhuanti) {
			zhuanti = Evaluation.data.zhuanti_module;
		} else {
			Evaluation.data.zhuanti_module = zhuanti;
		}
		if (!zhuanti) {
			zhuanti = ' ';
		}

		$.getJSON("../../series/module/" + zhuanti).done(function(data) {
			$("#zhuanti_series").append(optionRatternTpl({
				list : data
			}));
		});
	},

	linkTopic : function($left, $right) {
		var added = false;
		var $selected = $left.find(":selected");
		$.each($right.find("option"), function(idx, itm) {
			if ($selected.val() == $(itm).val()) {
				added = true;
			}
		});
		if (!added) {
			$right.append($left.find(":selected"));
		} else {
			util.dialog.messageDialog("已经添加");
		}

	},
	unlinkTopic : function($left, $right) {
		$left.append($right.find(":selected"));
		$right.find(":selected").remove();

	}
}