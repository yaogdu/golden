latte.teacher.mr = {
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
	qdivNum:0,
	i:0,
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
//		latte.teacher.mr.optionRatternTpl = juicer($('#option-pattern-tpl')
//				.html());
		
		//latte.teacher.mr.initSrc();
		//latte.teacher.mr.initTab();
		latte.teacher.mr.initUploader();
		//latte.teacher.mr.hiddenDetail();
		// $('#btn_select_theme').click(latte.teacher.mr.showThemeSelector);
		// $('#btn_select_special').click(latte.teacher.mr.showSpecialSelector);
		$('#btn_save_mr').click(latte.teacher.mr.commit);
		$('#btn_insert_question').click(latte.teacher.mr.insertQ);
		latte.teacher.mr.drawDiv();
		
		$('body').on('click','span[name=btnInsertOption]',function(){
			var optionId=$(this).prev().attr('id');//a3_4
			var qNum=$(this).attr('data-id');
			var optionNum=optionId.substring(optionId.lastIndexOf('_')+1,optionId.length+1);
//			console.log(optionNum);
			$(this).prev().after(latte.teacher.mr.drawOption(qNum,(parseInt(optionNum)+1)));
		});
	},
	/* init kings of values */
	initSrc : function() {
		$.ajax({
			type : "get",
			cache : false,
			contentType : "application/json",
			url : ctx + "/teacher/resource/initad",
			dataType : 'json',
			success : latte.teacher.mr.handleInit,
			error : function() {
				alert("error");
			}
		});
	},
	handleInit : function(data) {
		
		
	},
	drawDiv : function (){
		for(var i=1;i<=10;i++){
			var qdiv=latte.teacher.mr.drawQ(i);
			latte.teacher.mr.qdivNum=i;
			//$('#mr_expire').after(qdiv);
			$('.formCon').append(qdiv);
		}
		
	},
	insertQ : function (){
		//for(var i=1;i<=10;i++){
			++latte.teacher.mr.qdivNum;
			var qdiv=latte.teacher.mr.drawQ(latte.teacher.mr.qdivNum);
			//latte.teacher.mr.qdivNum=i;
			//$('#mr_expire').after(qdiv);
			$('.formCon').append(qdiv);
		//}
		
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
		
		latte.teacher.mr.fileUploader = new plupload.Uploader(
				{
					runtimes : 'html5,flash',
					browse_button : 'file', // ѡ���ļ���ťID
					max_file_size : '100mb', // �ļ��ϴ����ֵ
					chunks : false,// ���ֿ��ϴ�
					unique_names : true, // �ϴ����ļ����Ƿ�Ψһ,ֻ����δ���зֿ��ϴ�ʱ�ļ���Ψһ����Ч
					url : ctx + "/mr/add",
					flash_swf_url : static_ctx + '/js/lib/plupload/plupload.flash.swf',// plupload.flash.swf�ļ�����·��
					multi_selection : false,
					filters: [
							     {title: "允许文件类型", extensions: fileTypeFilters.join(',')}
					        ],
					init : {
						FileUploaded : function(up, file, info) {
							$('#btn_save_mr').css('disabled', '');// ���ñ��水ť
							$('#file a').text('修改');
							latte.teacher.mr.fileUploader.disableBrowse(false);
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
							
							$('#mr_file .search').hide();
							$('#mr_file .info').show();
							$('#mr_file_name').text(file[0].name);
						},
						BeforeUpload : function(up, file) {
							latte.teacher.mr.fileUploader.disableBrowse(true);
							$('#btn_save_mr').css('disabled', 'disabled');// ���ñ��水ť
						},
						UploadProgress : function(up, file) {
							$('#mr_file .barBg').css('width',
									file.percent + '%');
						},
						Error : function(up, err) {
							latte.teacher.mr.fileUploader.disableBrowse(false);
							up.refresh(); // Reposition Flash/Silverlight
							util.dialog.errorDialog(err.message);
						}
					}
				});
		latte.teacher.mr.fileUploader.init();
	},
	commit : function() {// �ύ
		
		var qs=[];
		var i=1;
		$('input[type=text][name=question]').each(function (){
			if($(this).val()!=""){
				qs.push(latte.teacher.mr.orgQ(i));
				console.log("i is : "+i);
				i++;
			}
		});
		var mr={
			 title:$('#title').val(),
			 description:$('.infoTextarea').val(),
			 totalReward:$('#totalReward').val(),
			 individualReward:$('#invidualReward').val(),
			 expire:$('#expire').val(),
			 questions : qs
		};
		var data = {
			"mr" : JSON.stringify(mr)
		};
		latte.teacher.mr.fileUploader.settings.multipart_params = data;
		latte.teacher.mr.fileUploader.settings.url = ctx + "/mr/add";// ƴ���ϴ�url��param
		latte.teacher.mr.fileUploader.start();// �ϴ�
	},
	orgQ: function (type){
		++latte.teacher.mr.i;
		
		var q={};
		q.name=latte.teacher.mr.orgAQ(type);
		q.alias="问题 "+type;
		q.type=0;
		q.ownerType=1;
		q.id=new Date().getTime()+latte.teacher.mr.i;
		return q;
	},
	
	orgAQ : function (type){
		var answer="[";
		var question=$('#q'+type).val();
		var i=1;
		$('input[type=text][name=a'+type+']').each(function (){
			if($(this).val()!=null&&$(this).val()!=""){
				answer+="{answerID:"+i+",answerText:"+$(this).val()+"},";
			}
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
	drawQ: function (qNum){
		var qdiv="<div id=\"mr_question"+qNum+"\" class=\"formList\">";
		qdiv+=" <label>问题"+qNum+"：</label>";
		qdiv+="<div class=\"info\">";
		qdiv+="<input type=\"text\" maxlength=\"45\" id=\"q"+qNum+"\" name=\"question\" value=\"\" size=\"30\" class=\"infoText\">";
		qdiv+="</div></div>";
		
		qdiv+="<div id=\"mr_a"+qNum+"\" class=\"formList\">";
		qdiv+="<label>选项：</label>";
		qdiv+="<div class=\"info\">";
		qdiv+="<input type=\"text\"  maxlength=\"45\" id=\"a"+qNum+"_1\" name=\"a"+qNum+"\"  value=\"\" style=\"width: 117px;\" size=\"10\" class=\"infoText\">&nbsp;";
		qdiv+="<input type=\"text\"  maxlength=\"45\" id=\"a"+qNum+"_2\" name=\"a"+qNum+"\"  value=\"\" style=\"width: 117px;\" size=\"10\" class=\"infoText\">&nbsp;";
		qdiv+="<input type=\"text\"  maxlength=\"45\" id=\"a"+qNum+"_3\" name=\"a"+qNum+"\"  value=\"\" style=\"width: 117px;\" size=\"10\" class=\"infoText\">&nbsp;";
		qdiv+="<input type=\"text\"  maxlength=\"45\" id=\"a"+qNum+"_4\" name=\"a"+qNum+"\"  value=\"\" style=\"width: 117px;\" size=\"10\" class=\"infoText\">&nbsp;";
		//qdiv+="<input type=\"button\"  data-id=\"\" maxlength=\"45\" name=\"a"+qNum+"\"  value=\"添加选项\" style=\"width: 117px;\" size=\"10\" class=\"BtnBlue24\">&nbsp;";
		qdiv+=" <span data-id=\""+qNum+"\" name=\"btnInsertOption\"  class=\"BtnBlue24\" ><a class=\"btnSave\">添加选项</a></span>";
		qdiv+="</div></div>";
		return qdiv;
	},
	drawOption : function (qNum,optionNum){
		var option="<input type=\"text\"  maxlength=\"45\" id=\"a"+qNum+"_"+optionNum+"\" name=\"a"+qNum+"\"  value=\"\" style=\"width: 117px;\" size=\"10\" class=\"infoText\">&nbsp;";
		
		return option;
	},
	loadModuleList : function(data) {
		var $moodule = $('#zhuti_module');
		$moodule.html('');
		for ( var mindex in data) {
			var module = data[mindex];
			var option = $("<option value='" + module.id + "'>" + module.name
					+ "</option>");
			option.data(module.units);
			option.click(latte.teacher.mr.loadUnitList);
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
			option.click(latte.teacher.mr.loadTopicList);
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
		latte.teacher.mr.loadModuleList(latte.teacher.mr.data.moduleTopic);
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
						latte.teacher.mr.loadModuleList();
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