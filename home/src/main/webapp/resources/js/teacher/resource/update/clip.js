latte.teacher.clip = {
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
	topicData : [],
	updateFile : false,
	postData : {
		id : 0,
		resourceName : '',
		intro : ' ',
		topics : null,
		resourceFormat : '-1',
		stage : {},
		subject : {}, 
		series : {}, 
		rid:-1
	},
	init : function() {
		latte.teacher.clip.postData.id = $("#id").val();
		$('#hd_menu_resource').addClass('current');
		$('#lmenu_add').addClass('current');
		latte.teacher.clip.optionRatternTpl = juicer($('#option-pattern-tpl')
				.html());

		latte.teacher.clip.initSrc();
		latte.teacher.clip.initTab();
		latte.teacher.clip.initUploader();
		latte.teacher.clip.initClip();
		
		// $('#btn_select_theme').click(latte.teacher.clip.showThemeSelector);
		// $('#btn_select_special').click(latte.teacher.clip.showSpecialSelector);
		$('#btn_save_clip').click(latte.teacher.clip.commit);
	},
	initClip : function() {
		$.ajax({
			type : "get",
			cache : false,
			contentType : "application/json",
			url : ctx + "/teacher/resource/getInfo",
			dataType : 'json',
			data : {
				"resourceId" : latte.teacher.clip.postData.id,
				"resourceType" : 2
			},
			success : function(response) {
				var data = response.object;
				$('#file a').text('修改');
				$('#clip_file .search').hide();
				$('#clip_file .info').show();
				$('#clip_file_name').text(data.fileName);
				$("#resourceFormat").val(
						util.getFormatParent(util.getTail(data.fileName)));
				latte.teacher.clip.postData.resourceFormat = util
						.getFormatParent(util.getTail(data.fileName));
				$('#resourceName').val(data.resourceName);
				latte.teacher.clip.postData.resourceName = data.resourceName;
				$('.infoTextarea').val(data.intro);
				latte.teacher.clip.postData.intro = data.intro;
				
				var sharelevel=data.shareLevel;
				$('input[name=sharelevel][value='+sharelevel+']').attr('checked','checked');
				if(sharelevel==2){
					$('#stage').val(data.stage.id);
					latte.teacher.clip.postData.stage = data.stage;
					latte.teacher.clip.initStage($('#stage').val());
					$('#subject').val(data.subject.id);
					latte.teacher.clip.postData.subject = data.subject;
	
					latte.teacher.clip.postData.topics = new Array();
					$.each(data.topics, function(idx, itm) {
						var topic = data.topics[idx];
						var option = $("<option value='" + topic.id + "'>"
								+ topic.name + "</option>");
						$('#zhuti_selected').append(option);
						var obj = {
							"id" : topic.id,
							"name" : topic.name
						};
						latte.teacher.clip.postData.topics.push(obj);
					});
					latte.teacher.clip.initTopic(data.subject.id);
					var moduleSeries = latte.teacher.clip.data.moduleSeries;
					
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
					latte.teacher.clip.initSeries(moduleid);
					$('#series').val(seriesid);
					latte.teacher.clip.postData.series ={"id": seriesid};
					/*var au = data.audience;
					if (au == 2) {
						$('#auth_teacher').attr('checked', 'checked');
						$('#auth_student').attr('checked', 'checked');
					} else if (au == 1) {
						$('#auth_student').attr('checked', 'checked');
					} else if (au == 0) {
						$('#auth_teacher').attr('checked', 'checked');
					}
					latte.teacher.clip.postData.audience = au;*/
					$("#rms").val(data.rid);
					latte.teacher.clip.postData.rid =data.rid;
					
				}else{
					latte.teacher.clip.postData.stage={};
					latte.teacher.clip.postData.subject ={};
					latte.teacher.clip.postData.topics ={};
					latte.teacher.clip.postData.series={}; 
					latte.teacher.clip.initTopic($("#subject").val());
				}
				latte.teacher.clip.postData.shareLevel=data.shareLevel;
				latte.teacher.clip.hiddenDetail();
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
			url : ctx + "/teacher/resource/initClip",
			dataType : 'json',
			success : latte.teacher.clip.handleInit,
			error : function() {
				alert("error");
			}
		});
	},
	handleInit : function(data) {
		var result = data;
		var formats = result.formats; 
		$("<option value='-1'></option>").appendTo($("#resourceFormat"));
		for (var i = 0; i < formats.length; i++) {
			var format = formats[i];
			$(
					"<option value='" + format.dictCode + "'>"
							+ format.dictName + "</option>").appendTo(
					$("#resourceFormat"));
		}
		$('#resourceFormat').on("change", function() {
			latte.teacher.clip.postData.resourceFormat = $(this).val();
		});
		$('#resourceFormat').attr('disabled', 'disabled');
		// phase handle
		/*var phases = result.phase;
		ht = "";
		for (var i = 0; i < phases.length; i++) {
			var phase = phases[i];
			ht += "<div class=\"infoRadio\">";
			ht += "<input type=\"radio\" name=\"phase\"  class=\"infoRadio\" value=\""
					+ phase.dictCode + "\"/>";
			ht += "<p class=\"infoLabel\">" + phase.dictName + "</p></div>";
		}
		$('#clip_phase').append(ht);

		$('#clip_phase').on("click",'input', function() {

			latte.teacher.clip.postData.phase = $(this).val();
		});*/

		
		$('#clip_sharelevel').on("click",'input', function() {
			latte.teacher.clip.postData.shareLevel = $(this).val();
			latte.teacher.clip.hiddenDetail();
		});
		
		
		var rms=result.rms;
		$("<option value=-1>请选择</option>").appendTo('#rms');
		for(var i=0;i<rms.length;i++){
			var rm=rms[i];
			$("<option value='"+rm.id+"'>"+rm.name+"</option>").appendTo('#rms');
		}
		$("#rms").on("change", function() {
			latte.teacher.clip.postData.rid = $(this).val();
		});

		
		var stages = result.stage;

		latte.teacher.clip.data.subjects = new Array();
		for (var i = 0; i < stages.length; i++) {
			var stage = stages[i];
			if (i == 0) {
				latte.teacher.clip.postData.stage = {
					"id" : stage.id
				};
			}
			$("<option value='" + stage.id + "'>" + stage.name + "</option>")
					.appendTo($("#stage"));
			var subjects = stage.subject;

			for (var j = 0; j < subjects.length; j++) {
				var subject = subjects[j];
				subject.stage = stage.id;
				latte.teacher.clip.data.subjects.push(subject);

				if (i == 0) {
					$(
							"<option value='" + subject.id + "'>"
									+ subject.name + "</option>").appendTo(
							$("#subject"));
					if (j == 0) {
						latte.teacher.clip.postData.subject = {
							"id" : subject.id
						};
					}
				}
			}
		}

		$("#stage").on("change", function() {
			latte.teacher.clip.postData.stage = {
				"id" : $(this).val()
			};
			latte.teacher.clip.initStage($(this).val());
		});
		$("#subject").on("change", function() {
			latte.teacher.clip.postData.subject = {
				"id" : $(this).val()
			};
			latte.teacher.clip.initTopic($("#subject").val());
			$('#zhuti_unit').html('');
			$('#zhuti_topic').html('');
		});
		//latte.teacher.clip.initTopic($("#subject").val());

	},
	initStage : function(stageId) {
		$("#subject").empty();
		var subjects = latte.teacher.clip.data.subjects;
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
			success : latte.teacher.clip.initTopicData,
			error : function() {
				alert("error");
			}
		});
	},
	initTopicData : function(response) {
		latte.teacher.clip.topicData = response;
		latte.teacher.clip.handleTopic(latte.teacher.clip.topicData);
	},
	handleTopic : function(topicData) {
		var modules =  JSON.parse(JSON.stringify(topicData));

		latte.teacher.clip.data.moduleTopic = modules.moduleTopic;
		latte.teacher.clip.loadModuleList(latte.teacher.clip.data.moduleTopic);
		var moduleSeries = modules.moduleSeries;
		latte.teacher.clip.data.moduleSeries = moduleSeries;
		latte.teacher.clip.series = new Array();
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
				latte.teacher.clip.series.push(s);
				// if(i==0){
				// $("<option value='" + s.id + "'>" + s.name + "</option>")
				// .appendTo($("#series"));
				// if(j==0){
				// latte.teacher.clip.postData.series={"id":s.id};
				// }
				// }
			}
		}
	},
	initSeries : function(moduleId) {
		$("#series").empty();
		if (moduleId == -1) {
			$("<option value='-1'>请选择</option>").appendTo($("#series"));
			latte.teacher.clip.postData.series = {};
		} else {
			var series = latte.teacher.clip.series;
			for (var j = 0; j < series.length; j++) {
				var s = series[j];
				if (s.module == moduleId) {
					$("<option value='" + s.id + "'>" + s.name + "</option>")
							.appendTo($("#series"));
				}
			}
			latte.teacher.clip.postData.series = {
				"id" : $('#series').val()
			};
		}
	},
	hiddenDetail:function(){
		var shareLevel=latte.teacher.clip.postData.shareLevel;
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
			latte.teacher.clip.initSeries($(this).val());
		});
		$("#series").on("change", function() {
			latte.teacher.clip.postData.series = {
				"id" : $(this).val()
			};
		});

		/*$("#clip_audience").on("click","input", function() {
			var a1 = document.getElementById("auth_teacher").checked;
			var a2 = document.getElementById("auth_student").checked;
			if (a1 && a2) {
				latte.teacher.clip.postData.audience = 2;
			} else if (a1 && (!a2)) {
				latte.teacher.clip.postData.audience = 0;
			} else if (!a1 && a2) {
				latte.teacher.clip.postData.audience = 1;
			} else {
				latte.teacher.clip.postData.audience = -1;
			}
		});*/

		$("#resourceName").change(function() {
			latte.teacher.clip.postData.resourceName = $(this).val();
		});
		$(".infoTextarea").change(function() {
			latte.teacher.clip.postData.intro = $(this).val();
		});
		

		$("#rms").on("change", function() {
			latte.teacher.clip.postData.rid = $(this).val();
		});

	},
	initUploader : function() {// 初始化文件上传控件
		
		latte.teacher.clip.fileUploader = new plupload.Uploader(
				{
					runtimes : 'html5,flash',
					browse_button : 'file', // 选择文件按钮ID
					max_file_size : '20mb', // 文件上传最大值
					chunks : false,// 不分块上传
					unique_names : true, // 上传的文件名是否唯一,只有在未进行分块上传时文件名唯一才有效
					url : ctx + "/teacher/clip/update",
					flash_swf_url : static_ctx
							+ '/js/lib/plupload/plupload.flash.swf',// plupload.flash.swf文件所在路径
					multi_selection : false,
					init : {
						FileUploaded : function(up, file, info) {
							$('#btn_save_clip').css('disabled', '');// 启用保存按钮
							$('#file a').text('修改');
							latte.teacher.clip.fileUploader.disableBrowse(false);
							var data = eval('(' + info.response + ')');
							if (data.success == false) {
								util.dialog.errorDialog('失败');
								return;
							} else {
								util.dialog.messageDialog('成功');
								return;
							}

						},
						FilesAdded : function(up, file) {
							$('#file a').text('修改');
							$('#clip_file .search').hide();
							$('#clip_file .info').show();
							$('#clip_file_name').text(file[0].name);
							$("#resourceFormat").val(
									util.getFormatParent(util
											.getTail(file[0].name)));
							latte.teacher.clip.postData.resourceFormat = util
									.getFormatParent(util.getTail(file[0].name));
							latte.teacher.clip.updateFile = true;
						},
						BeforeUpload : function(up, file) {
							latte.teacher.clip.fileUploader.disableBrowse(true);
							$('#btn_save_clip').css('disabled', '');// 禁用保存按钮
						},
						UploadProgress : function(up, file) {
							$('#clip_file .barBg').css('width',
									file.percent + '%');
						},
						Error : function(up, err) {
							latte.teacher.clip.fileUploader.disableBrowse(false);
							up.refresh(); // Reposition Flash/Silverlight
							util.dialog.errorDialog(err.message);
						}
					}
				});
		latte.teacher.clip.fileUploader.init();
	},
	commit : function() {// 提交

		var b = latte.teacher.clip.updateFile;
		
		var sharelevel=latte.teacher.clip.postData.shareLevel;
		if(sharelevel<2){
			
		}else{
			latte.teacher.clip.postData.topics = new Array();
	
			$.each($("#zhuti_selected option"), function(idx, itm) {
				var obj = {
					"id" : $(itm).val(),
					"name" : $(itm).text()
				};
				latte.teacher.clip.postData.topics.push(obj);
			});
	
			var errorMessage = '';
			for ( var key in latte.teacher.clip.postData) {
				if ( key != "series") {
					if (!latte.teacher.clip.postData[key]
							|| latte.teacher.clip.postData[key] == -1) {
						errorMessage += key + ",";
					}
				}  
			}
			if (latte.teacher.clip.postData.topics.length == 0
					&& util.isEmptyObject(latte.teacher.clip.postData.series)) {
				errorMessage += '主题,';
			}
	
			if (errorMessage.length > 0) {
				util.dialog.errorDialog("请输入完整");
				return false;
			}
		}
		var data = {
			"clip" : JSON.stringify(latte.teacher.clip.postData)
		};
		if (b) {
			latte.teacher.clip.fileUploader.settings.multipart_params = data;
			latte.teacher.clip.fileUploader.settings.url = ctx
					+ "/teacher/clip/update";// 拼接上传url与param
			latte.teacher.clip.fileUploader.start();// 上传

		} else {
			$.ajax({
				type : 'POST',
				contentType : 'application/json',
				url : ctx + "/teacher/clip/updateWithoutFile",
				dataType : "json",
				data : JSON.stringify(latte.teacher.clip.postData),
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
			option.click(latte.teacher.clip.loadUnitList);
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
			option.click(latte.teacher.clip.loadTopicList);
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
		latte.teacher.clip.loadModuleList(latte.teacher.clip.data.moduleTopic);
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
						latte.teacher.clip.loadModuleList();
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