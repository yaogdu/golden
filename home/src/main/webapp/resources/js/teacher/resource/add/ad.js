latte.teacher.ad = {
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
		topics : [],
		stage : {},
		subject : {},
		phase : -1,
		series : [],
		rid:-1,
		shareLevel:0,
		addWay : 0
	},
	init : function() {
		$('#hd_menu_resource').addClass('current');
		$('#lmenu_add').addClass('current');
//		latte.teacher.ad.optionRatternTpl = juicer($('#option-pattern-tpl')
//				.html());
		
		//latte.teacher.ad.initSrc();
		//latte.teacher.ad.initTab();
		latte.teacher.ad.initUploader();
		//latte.teacher.ad.hiddenDetail();
		// $('#btn_select_theme').click(latte.teacher.ad.showThemeSelector);
		// $('#btn_select_special').click(latte.teacher.ad.showSpecialSelector);
		$('#btn_save_ad').click(latte.teacher.ad.commit);
	},
	/* init kings of values */
	initSrc : function() {
		$.ajax({
			type : "get",
			cache : false,
			contentType : "application/json",
			url : ctx + "/teacher/resource/initad",
			dataType : 'json',
			success : latte.teacher.ad.handleInit,
			error : function() {
				alert("error");
			}
		});
	},
	handleInit : function(data) {
		
		
	},
	
	/* init ends */
	initTab : function() {// ��ʼ������tab��ǩ
		$('.TabTit li').click(function() {
			$(this).siblings('li').removeClass('current');
			$(this).addClass('current');
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
		
		latte.teacher.ad.fileUploader = new plupload.Uploader(
				{
					runtimes : 'html5,flash',
					browse_button : 'file', // ѡ���ļ���ťID
					max_file_size : '100mb', // �ļ��ϴ����ֵ
					chunks : false,// ���ֿ��ϴ�
					unique_names : true, // �ϴ����ļ����Ƿ�Ψһ,ֻ����δ���зֿ��ϴ�ʱ�ļ���Ψһ����Ч
					url : ctx + "/ad/add",
					flash_swf_url : static_ctx + '/js/lib/plupload/plupload.flash.swf',// plupload.flash.swf�ļ�����·��
					multi_selection : false,
					filters: [
							     {title: "允许文件类型", extensions: fileTypeFilters.join(',')}
					        ],
					init : {
						FileUploaded : function(up, file, info) {
							$('#btn_save_ad').css('disabled', '');// ���ñ��水ť
							$('#file a').text('修改');
							latte.teacher.ad.fileUploader.disableBrowse(false);
							var data = eval('(' + info.response + ')');
							if (data.success == false) {
								util.dialog.errorDialog('文件内容不合规范,请重新选择文件上传');
								return;
							} else {
								util.dialog.messageDialog('上传成功');
								return;
							}
						},
						FilesAdded : function(up, file) { 
							$('#file a').text('修改');
							
							$('#ad_file .search').hide();
							$('#ad_file .info').show();
							$('#ad_file_name').text(file[0].name);
						},
						BeforeUpload : function(up, file) {
							latte.teacher.ad.fileUploader.disableBrowse(true);
							$('#btn_save_ad').css('disabled', 'disabled');// ���ñ��水ť
						},
						UploadProgress : function(up, file) {
							$('#ad_file .barBg').css('width',
									file.percent + '%');
						},
						Error : function(up, err) {
							latte.teacher.ad.fileUploader.disableBrowse(false);
							up.refresh(); // Reposition Flash/Silverlight
							util.dialog.errorDialog(err.message);
						}
					}
				});
		latte.teacher.ad.fileUploader.init();
	},
	commit : function() {// �ύ
		
		var ad={
			 title:$('#title').val(),
			 description:$('.infoTextarea').val(),
			 totalReward:$('#totalReward').val(),
			 individualReward:$('#invidualReward').val(),
			 expire:$('#expire').val(),
			 q1:latte.teacher.ad.orgAQ(1),
			 q2:latte.teacher.ad.orgAQ(2),
			 q3:latte.teacher.ad.orgAQ(3),
			 a1:$('input[type=radio][name=r1]:checked').attr('value'),
			 a2:$('input[type=radio][name=r2]:checked').attr('value'),
			 a3:$('input[type=radio][name=r3]:checked').attr('value')
			 
		};
		var data = {
			"ad" : JSON.stringify(ad)
		};
		latte.teacher.ad.fileUploader.settings.multipart_params = data;
		latte.teacher.ad.fileUploader.settings.url = ctx + "/ad/add";// ƴ���ϴ�url��param
		latte.teacher.ad.fileUploader.start();// �ϴ�
	},
	orgAQ : function (type){
		var answer="[";
		var question=$('#q'+type).val();
		var i=1;
		$('input[type=text][name=a'+type+']').each(function (){
			answer+="{answerID:"+i+",answerText:"+$(this).val()+"},";
			i++;
		});
		answer=answer.substring(0,answer.lastIndexOf(","));
		answer+="]";
		if(question==""){
			return "";
		}
		//console.log({"question":question,"answer":answer});
		//console.log("{question:"+question+",answer:"+answer+"}");
		return "{question:"+question+",answer:"+answer+"}";
	},
	loadModuleList : function(data) {
		var $moodule = $('#zhuti_module');
		$moodule.html('');
		for ( var mindex in data) {
			var module = data[mindex];
			var option = $("<option value='" + module.id + "'>" + module.name
					+ "</option>");
			option.data(module.units);
			option.click(latte.teacher.ad.loadUnitList);
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
			option.click(latte.teacher.ad.loadTopicList);
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
		latte.teacher.ad.loadModuleList(latte.teacher.ad.data.moduleTopic);
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
					title : '信息',
					content : $('#special-selector-tpl').html(),
					okValue : '确认',
					init : function() {
						latte.teacher.ad.loadModuleList();
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