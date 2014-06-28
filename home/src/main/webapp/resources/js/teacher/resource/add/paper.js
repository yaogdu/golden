latte.teacher.paper = {
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
		uploadDialogTpl : null,
		fileUploader : null,
		subjects : [],
		grades : [],
		prov:'-1',
		paperTypes:[]
	// 当前选择专题
	},
	postData : {
		resourceName : '',
		intro : ' ',
		resourceFormat : '-1',
		stage : {},
		subject : {},
		phase : -1,
		series : [],
		audience : -1,
		rid:-1,
		shareLevel:0
	},
	init : function() {
		$('#hd_menu_resource').addClass('current');
		$('#lmenu_add').addClass('current');
		latte.teacher.paper.optionRatternTpl = juicer($('#option-pattern-tpl')
				.html());

		latte.teacher.paper.initSrc();
		latte.teacher.paper.initTab();
		latte.teacher.paper.initSearchOption();
		latte.teacher.paper.initUploader();
		latte.teacher.paper.hiddenDetail();
		$('#provSel').parents('div .formList').hide();
		// $('#btn_select_theme').click(latte.teacher.paper.showThemeSelector);
		// $('#btn_select_special').click(latte.teacher.paper.showSpecialSelector);
		$('#btn_save_paper').click(latte.teacher.paper.commit);
	},
	/* init kings of values */
	initSrc : function() {
		$.ajax({
			type : "get",
			cache : false,
			contentType : "application/json",
			url : ctx + "/teacher/resource/initTestPaper",
			dataType : 'json',
			success : latte.teacher.paper.handleInit,
			error : function() {
				alert("error");
			}
		});
	},
	handleInit : function(data) {
		var result = data;

		
		
		
		$('#paper_sharelevel').on("click",'input', function() {
			latte.teacher.paper.postData.shareLevel = $(this).val();
			latte.teacher.paper.hiddenDetail();
		});
 
		
		var paperType = result.paperType;

		latte.teacher.paper.data.paperTypes=paperType;
		
		var paperYear = result.paperYear;

		for (var i = 0; i < paperYear.length; i++) {
			var py = paperYear[i];

			if (i == 0) {
				latte.teacher.paper.postData.paperYear = py.dictCode;
			}
			$(
					"<option value='" + py.dictCode + "'>" + py.dictName
							+ "</option>").appendTo($("#paperYear"));
		}
		
		var province = result.province;

		for (var i = 0; i < province.length; i++) {
			var p = province[i];
//			if (i == 0) {
//				latte.teacher.paper.data.prov = p.id;
//			}
			$("<option value='" + p.id + "'>" + p.name + "</option>").appendTo(
					$("#provSel"));
		}
		$('#provSel').on("change", function() {
			latte.teacher.paper.data.prov = $(this).val();
			latte.teacher.paper.initPaperArea();
		});
		
		var testArea = result.testArea;

		for (var i = 0; i < testArea.length; i++) {
			var ta = testArea[i];
			if (i == 0) {
				latte.teacher.paper.postData.testArea = ta.dictCode;
			}
			$("<option value='" + ta.dictCode + "'>" + ta.dictName
							+ "</option>").appendTo($("#testArea"));
		}
		$('#testArea').on("change", function() {
			latte.teacher.paper.postData.testArea = $(this).val();
			latte.teacher.paper.initPaperArea();
		});

		var term = result.term;

		//radio = "<div class=\"infoBox\"><input type=\"radio\" class=\"infoRadio\" name=\"term\" value=-1 checked=\"checked\" /><p class=\"infoLabel\"> 不限</p></div>";

		for (var i = 0; i < term.length; i++) {
			var t = term[i];
			//radio += "<div class=\"infoBox\"><input class=\"infoRadio\" type=\"radio\" name=\"term\" value="
				////	+ t.dictCode
					//+ "  /><p class=\"infoLabel\"> "
				//	+ t.dictName
					//+ "</p></div>";
			$("<option value='" + t.dictCode+ "'>" + t.dictName
					+ "</option>").appendTo($("#term"));
			
		}
		//$('#termdiv').html(radio);
		$('#term').on("change", function() {
			latte.teacher.paper.postData.term = $(this).val();
		});
		
		var rms=result.rms;
		$("<option value=-1>请选择</option>").appendTo('#rms');
		for(var i=0;i<rms.length;i++){
			var rm=rms[i];
			$("<option value='"+rm.id+"'>"+rm.name+"</option>").appendTo('#rms');
		}
		$("#rms").on("change", function() {
			latte.teacher.paper.postData.rid = $(this).val();
		});

		
		var stages = result.stage;

		latte.teacher.paper.data.subjects = new Array();
		if(stages!=null&&stages.length>0){
		
		for (var i = 0; i < stages.length; i++) {
			var stage = stages[i];
			if (i == 0) {
				latte.teacher.paper.postData.stage = {
					"id" : stage.id
				};
			}
			$("<option value='" + stage.id + "'>" + stage.name + "</option>")
					.appendTo($("#stage"));
			var subjects = stage.subject;

			for (var j = 0; j < subjects.length; j++) {
				var subject = subjects[j];
				subject.stage = stage.id;
				latte.teacher.paper.data.subjects.push(subject);

				if (i == 0) {
					$(
							"<option value='" + subject.id + "'>"
									+ subject.name + "</option>").appendTo(
							$("#subject"));
					if (j == 0) {
						latte.teacher.paper.postData.subject = {
							"id" : subject.id
						};
					}
				}
			}
		}

		$("#stage").on("change", function() {
			latte.teacher.paper.postData.stage = {
				"id" : $(this).val()
			};
			latte.teacher.paper.initStage($(this).val());
		});
		$("#subject").on("change", function() {
			latte.teacher.paper.postData.subject = {
				"id" : $(this).val()
			};
		});

		latte.teacher.paper.data.grades = result.grade;

		latte.teacher.paper.initGrade();
		
		latte.teacher.paper.initPaperType();
		}
	},
	initSearchOption : function() {// 初始化查询排序面板,绑定查询按钮事件
		$("#resourceName").change(function() {
			latte.teacher.paper.postData.resourceName = $(this).val();
		});
		$(".infoTextarea").change(function() {
			latte.teacher.paper.postData.intro = $(this).val();
		});
		$('#paperYear').on("change", function() {
			latte.teacher.paper.postData.paperYear = $(this).val();
		});

	},
	initPaperType :function(){
		var paperType=latte.teacher.paper.data.paperTypes;
		var stageId = $('#stage').val();
		$('#paperType').empty();
		$("<option value='-1'>请选择</option>").appendTo($("#paperType"));
		for (var i = 0; i < paperType.length; i++) {
			var pt = paperType[i];
			if(pt.stageId==stageId){
				$("<option value='" + pt.id + "'>" + pt.name
						+ "</option>").appendTo($("#paperType"));
			}
		}
		latte.teacher.paper.postData.paperType = $('#paperType').val();
		
		$('#paperType').on("change", function() {
			latte.teacher.paper.postData.paperType = $(this).val();
		});
		
	},
	initPaperArea : function (){
		if(latte.teacher.paper.postData.testArea!=6){
			$('#provSel').parents('div .formList').hide();
			latte.teacher.paper.data.prov=-1;
			latte.teacher.paper.postData.paperArea=-1;
			$('#provSel').val(-1);
			$('#paperArea').val(-1);
			return false;
		}
		$('#provSel').parents('div .formList').show();
		if(latte.teacher.paper.data.prov==-1){
			//util.dialog.infoDialog('请选择省份');
			return false;
		}
		
		$.ajax({
			type : "get",
			cache : false,
			contentType : "application/json",
			url : ctx + "/teacher/resource/getCityInfo?paraId="+latte.teacher.paper.data.prov,
			dataType : 'json',
			success : latte.teacher.paper.handleProvince 
		});		
	},
	initStage : function(stageId) {
		$("#subject").empty();
		var subjects = latte.teacher.paper.data.subjects;
		for (var j = 0; j < subjects.length; j++) {
			var subject = subjects[j];
			if (subject.stage == stageId) {
				$(
						"<option value='" + subject.id + "'>" + subject.name
								+ "</option>").appendTo($("#subject"));
				 
			}
		}
		 latte.teacher.paper.postData.subject = {
				 "id" : $('#subject').val()
				 }; 
		
		latte.teacher.paper.initGrade();
		latte.teacher.paper.initPaperType();
	},
	handleProvince :function(data){
		var province = data.province;
		$("#paperArea").empty();
		$("<option value='-1'>市</option>").appendTo(
				$("#paperArea"));
		for (var i = 0; i < province.length; i++) {
			var p = province[i];
//			if (i == 0) {
//				latte.teacher.paper.data.prov = p.id;
//			}
			$("<option value='" + p.id + "'>" + p.name + "</option>").appendTo(
					$("#paperArea"));
		}
		$('#paperArea').on("change", function() {
			latte.teacher.paper.postData.paperArea = $(this).val();
		});
	},
	initGrade : function() {
		var grade = latte.teacher.paper.data.grades;
		var stageId = $('#stage').val();
		$('#grade').empty();
		//var radio = "<div class=\"infoBox\"><input type=\"radio\" name=\"grade\" value=-1 class=\"infoRadio\" checked=\"checked\" /> <p class=\"infoLabel\">不限</p></div>";
		$("<option value='-1'>请选择</option>").appendTo($("#grade"));
		for (var i = 0; i < grade.length; i++) {

			var g = grade[i];
			if (g.stageId == stageId) {
				/*radio += "<div class=\"infoBox\"><input type=\"radio\" name=\"grade\" value="
						+ g.id
						+ " class=\"infoRadio\" /> <p class=\"infoLabel\">"
						+ g.name + "</p></div>";
				*/
				$("<option value='" + g.id + "'>" + g.name
								+ "</option>").appendTo($("#grade"));
			}
		}
		latte.teacher.paper.postData.grade = $('#grade').val();
		//$('#gradediv').html(radio);
		$('#grade').on("change", function() {
			latte.teacher.paper.postData.grade = $(this).val();
		});
	},
	hiddenDetail:function(){
		var shareLevel=latte.teacher.paper.postData.shareLevel;
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
 
 
		$("#resourceName").change(function() {
			latte.teacher.paper.postData.resourceName = $(this).val();
		});
		$(".infoTextarea").change(function() {
			latte.teacher.paper.postData.intro = $(this).val();
		});

	},
	initUploader : function() {// 初始化文件上传控件
		var fileTypeFilters = [];
		for(var type in latte.fileType){
			fileTypeFilters.push(type);
		}
		plupload.addI18n({
	        'File extension error.' : '文件类型错误',
	        'File size error.' : '文件大小超出限制'
	    });
		latte.teacher.paper.fileUploader = new plupload.Uploader(
				{
					runtimes : 'html5,flash',
					browse_button : 'file', // 选择文件按钮ID
					max_file_size : '20mb', // 文件上传最大值
					chunks : false,// 不分块上传
					unique_names : true, // 上传的文件名是否唯一,只有在未进行分块上传时文件名唯一才有效
					url : ctx + "/teacher/testpaper/add",
					flash_swf_url : static_ctx + '/js/lib/plupload/plupload.flash.swf',// plupload.flash.swf文件所在路径
					multi_selection : false,
					filters: [
					     {title: "允许文件类型", extensions: fileTypeFilters.join(',')}
			        ],
					init : {
						FileUploaded : function(up, file, info) {
							$('#btn_save_paper').css('disabled', '');// 启用保存按钮
							$('#file a').text('修改');
							latte.teacher.paper.fileUploader.disableBrowse(false);
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
							$('#paper_file .search').hide();
							$('#paper_file .info').show();
							$('#paper_file_name').text(file[0].name);
							$("#resourceFormat").val(
									util.getFormatParent(util
											.getTail(file[0].name)));
							latte.teacher.paper.postData.resourceFormat = util
									.getFormatParent(util.getTail(file[0].name));
							if (latte.teacher.paper.postData.resourceName == null
									|| latte.teacher.paper.postData.resourceName == "") {
								$('#resourceName').val(file[0].name);
								latte.teacher.paper.postData.resourceName = file[0].name;
							}
						},
						BeforeUpload : function(up, file) {
							latte.teacher.paper.fileUploader.disableBrowse(true);
							$('#btn_save_paper').css('disabled', 'disabled');// 禁用保存按钮
						},
						UploadProgress : function(up, file) {
							$('#paper_file .barBg').css('width',
									file.percent + '%');
						},
						Error : function(up, err) {
							latte.teacher.paper.fileUploader.disableBrowse(false);
							up.refresh(); // Reposition Flash/Silverlight
							util.dialog.errorDialog(err.message);
						}
					}
				});
		latte.teacher.paper.fileUploader.init();
	},
	commit : function() {// 提交

		
		var sharelevel=latte.teacher.paper.postData.shareLevel;
		if(sharelevel<2){
			
		}else{
			 
		}
		var data = {
			"paper" : JSON.stringify(latte.teacher.paper.postData)
		};
		latte.teacher.paper.fileUploader.settings.multipart_params = data;
		latte.teacher.paper.fileUploader.settings.url = ctx + "/teacher/testpaper/add";// 拼接上传url与param
		latte.teacher.paper.fileUploader.start();// 上传
	}
}