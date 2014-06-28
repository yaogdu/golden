latte.teacher.clip = {
	data : {
		themeSelectorTpl : null,
		specialSelectorTpl : null,
		optionRatternTpl : null,
		fileUploader : null,
		zhuti_module : null,// ��ǰѡ������
		zhuanti_module : null,
		subjects : [],
		series : [],
		moduleTopic : null
	// ��ǰѡ��ר��
	},
	topicData : [],
	postData : {
		resourceName : '',
		intro : ' ',
		topics : null,
		resourceFormat : '-1',
		stage : {},
		subject : {},
		series : [], 
		rid:-1,
		shareLevel:0
	},
	init : function() {
		$('#hd_menu_resource').addClass('current');
		$('#lmenu_add').addClass('current');
		latte.teacher.clip.optionRatternTpl = juicer($('#option-pattern-tpl')
				.html());

		latte.teacher.clip.initSrc();
		latte.teacher.clip.initTab();
		latte.teacher.clip.initUploader();
		latte.teacher.clip.hiddenDetail();
		// $('#btn_select_theme').click(latte.teacher.clip.showThemeSelector);
		// $('#btn_select_special').click(latte.teacher.clip.showSpecialSelector);
		$('#btn_save_clip').click(latte.teacher.clip.commit);
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
		var result =data;
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
		if(stages!=null&&stages.length>0){
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
		latte.teacher.clip.initTopic($("#subject").val());
		}
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
		latte.teacher.clip.initTopic($("#subject").val());
	},
	initTopic : function(subjectId) {
		$.ajax({
			type : "get",
			cache : false,
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

			}
		}

	},
	initSeries : function(moduleId) {
		$("#series").empty();
		if (moduleId == -1) {
			$("<option value='-1'>请选择</option>").appendTo($("#series"));
			latte.teacher.clip.postData.series =[];
		} else {
			var series = latte.teacher.clip.series;
			for (var j = 0; j < series.length; j++) {
				var s = series[j];
				if (s.module == moduleId) {
					$("<option value='" + s.id + "'>" + s.name + "</option>")
							.appendTo($("#series"));
				}
			}
			latte.teacher.clip.postData.series = [{
				"id" : $('#series').val()
			}];
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
	initTab : function() {// ��ʼ������tab��ǩ
		$('.TabTit li').click(function() {
			$(this).siblings('li').removeClass('current');
			$(this).addClass('current');
			/** ��������ӵ��tab��ǩ�������¼� */
		});

		$("#seriesModule").on("change", function() {
			latte.teacher.clip.initSeries($(this).val());
		});
		$("#series").on("change", function() {
			latte.teacher.clip.postData.series = [{
				"id" : $(this).val()
			}];
		});

		/*$("#clip_audience").on("click",'input', function() {
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

	},
	initUploader : function() {// ��ʼ���ļ��ϴ��ؼ�
		var fileTypeFilters = [];
		for(var type in latte.fileType){
			fileTypeFilters.push(type);
		}
		plupload.addI18n({
			 'File extension error.' : '文件类型错误',
		        'File size error.' : '文件大小超出限制'
	    });
		latte.teacher.clip.fileUploader = new plupload.Uploader(
				{
					runtimes : 'html5,flash',
					browse_button : 'file', // ѡ���ļ���ťID
					max_file_size : '20mb', // �ļ��ϴ����ֵ
					chunks : false,// ���ֿ��ϴ�
					unique_names : true, // �ϴ����ļ����Ƿ�Ψһ,ֻ����δ���зֿ��ϴ�ʱ�ļ���Ψһ����Ч
					url : ctx + "/teacher/clip/add",
					flash_swf_url : static_ctx + '/js/lib/plupload/plupload.flash.swf',// plupload.flash.swf�ļ�����·��
					multi_selection : false,
					filters: [
					     {title: "�����ļ�����", extensions: fileTypeFilters.join(',')}
			        ],
					init : {
						FileUploaded : function(up, file, info) {
							$('#btn_save_clip').css('disabled', '');// ���ñ��水ť
							$('#file a').text('修改');
							latte.teacher.clip.fileUploader.disableBrowse(false);
							var data = eval('(' + info.response + ')');
							if (data.success == false) {
								util.dialog.errorDialog('文件内容不合规范,请重新选择文件上传');
								return;
							} else {
								util.dialog.defaultDialog('上传成功',function(){
									location.reload();
								});
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
							if (latte.teacher.clip.postData.resourceName == null
									|| latte.teacher.clip.postData.resourceName == "") {
								$('#resourceName').val(file[0].name);
								latte.teacher.clip.postData.resourceName = file[0].name;
							}
						},
						BeforeUpload : function(up, file) {
							latte.teacher.clip.fileUploader.disableBrowse(true);
							$('#btn_save_clip').css('disabled', 'disabled');// ���ñ��水ť
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
	commit : function() {// �ύ

		
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
					&& latte.teacher.clip.postData.series.length==0) {
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
		latte.teacher.clip.fileUploader.settings.multipart_params = data;
		latte.teacher.clip.fileUploader.settings.url = ctx + "/teacher/clip/add";// ƴ���ϴ�url��param
		latte.teacher.clip.fileUploader.start();// �ϴ�
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
	showThemeSelector : function() {// ����ѡ��
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
	showSpecialSelector : function() {// ר��ѡ��
		art
				.dialog({
					width : 800,
					id : 'msg_dialog',
					title : '��Ϣ',
					content : $('#special-selector-tpl').html(),
					okValue : 'ȷ��',
					init : function() {
						latte.teacher.clip.loadModuleList();
						// ���¼�
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
					cancelValue : 'ȡ��',
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
			util.dialog.messageDialog("�Ѿ����");
		}

	},
	unlinkTopic : function($left, $right) {
		$left.append($right.find(":selected"));
		$right.find(":selected").remove();

	}
}