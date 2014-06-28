latte.teacher.courseware = {
	data : {
		resourceTpl : null,
		courseTpl:null,
		searchData : {
			stageid : '-1',
			subjectid : '-1',
			phase : '-1',// 阶段
			src : '-1',// 来源
			// format : '-1',//格式
			order : 'submitTime',// 排序
			topicId : '-1',
			keyword : '',
			seriesid : '-1',
			pageNo : '1',
			desc : true
		},
		resourceList : null
	},
	coursewareId:'0',
	rms:'',
	topicData : [],
	chapters:[],
	sections:[],
	//periods:[],
	grades:[],
	resourceName:'',
	theme : 0,
	init : function() {
		$('#nav_courseware').addClass('current');
		latte.teacher.courseware.data.resourceTpl = juicer($('#resource-tpl')
				.html());
		latte.teacher.courseware.data.courseTpl = juicer($('#create-course-dialog-tpl')
				.html());
		latte.teacher.courseware.initSrc();
		latte.teacher.reviewCourseware.init();
		// latte.teacher.courseware.initTree();

		// $('.search').click(latte.teacher.courseware.searchResource);

		// latte.xk.review.init();

		 $('#resource_list').on('click','.sortTitle',function(){
			 var id = $(this).attr('data-id');
			 var data = latte.teacher.courseware.data.resourceList[id];
			 
			 latte.teacher.reviewCourseware.view(data);
		 });

		// 收藏
		 $('#edit-div').mouseover(function(){
				$('#edit-div').css('display','block');
			});
		 $('#edit-div').mouseout(function(){
				$('#edit-div').css('display','none');
			});
		 $('#copy').on('click',function(){
				latte.teacher.courseware.copy();
			});
		 $('#cancelCopy').on('click',function(){
				$('#edit-div').css('display','none');
			});
		$('#resource_list').on('click', '#btnEdit', function() {
			
			latte.teacher.courseware.coursewareId=$(this).attr('data-id');
			var data=latte.teacher.courseware.data.resourceList[latte.teacher.courseware.coursewareId];
			
			 
			//TODO
			if(data.src==0&&data.createdBy==userId){
				 location.href=ctx+"/teacher/resource/toUpdate/0/"+data.id;
			}else{
				$('#edit-div').css('top',$(this).offset().top+10);
				$('#edit-div').css('left',$(this).offset().left+10);
				$('#edit-div').css('display','block');
			}
		});
 
		
		$('body').on('click','#btnFav',function(){
			var $obj=$(this);
			var id = $(this).attr('data-id');
			//TODO judge the resource belongs to me or not
//			var data = latte.teacher.material.data.resourceList[id];
			util.dialog.defaultDialog('分类:<select id="rmr">'+latte.teacher.courseware.rms+'</select>',function(){
				$.ajax({
					type : "POST",
					cache : false,
					contentType: 'application/json',
					url : ctx+"/teacher/resource/favResource",
					dataType : 'json',
					data:JSON.stringify({
						"resourceManagementId":$('#rmr').val(),
						"resourceId":id,
						"resourceType":0
					}),
					success : function(response){
						var result=response;
						if(result.success){
							util.dialog.infoDialog("收藏成功");
						}else{
							util.dialog.infoDialog(result.msg);
							$obj.unbind();
							$obj.on('click',function(){
								util.dialog.infoDialog('已经收藏');
								return false;
							})
						}
					}
				});
			});
		});
	}, 
	copy : function (){
		var id = latte.teacher.courseware.coursewareId;
		$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : ctx + "/teacher/courseware/copy",
			dataType : "json",
			data : JSON.stringify({
				"id" : id
			}),
			success : function(response) {
				if (response.boardUrl != undefined) {
					latte.teacher.courseware.valid = true;
					var url = response.boardUrl;
					url += '&series=' + response.series;
					url += '&topic=' + response.topic;
					url += '&subject=' + response.subject;
					url += '&md5=' + response.md5;
					url += '&stage=' + response.stage;
					url+='&resourceName='+response.resourceName;
					window.open(url, "_blank");
				}
			}
		});
	} ,
	initSrc : function() {
		$.ajax({
			type : "get",
			cache : false,
			contentType : "application/json",
			url : ctx + "/teacher/resource/initSearchCourseware",
			dataType : 'json',
			success : latte.teacher.courseware.handleInit 
		});
	},
	handleInit : function(data) {
		var result = data;

		var grades=result.grades;
		
		for(var i=0;i<grades.length;i++){
			var grade=grades[i];
			grade["title"]=grade.stage+grade.grade+"（ "+grade.class_number+" ） 班";
			latte.teacher.courseware.grades.push(grade);
		}
		
		latte.teacher.courseware.rms='';
		var rms=result.rms;
		var ht="";
		for(var i=0;i<rms.length;i++){
			var rm=rms[i];
			ht+="<option value='"+rm.id+"'>"+rm.name+"</option>";
		}
		latte.teacher.courseware.rms=ht;
		
		latte.teacher.courseware.chapters=result.chapters;
		
		var chapters=result.chapters;
		for(var i=0;i<chapters.length;i++){
			var chapter=chapters[i];
			var sections=chapter.sections;
			if(sections!=null&&sections.length>0){
				for(var j=0;j<sections.length;j++){
					var section=sections[j];
					latte.teacher.courseware.sections.push(section);
//					var periods=section.periods;
//					if(periods!=null&&periods.length>0){
//						for(var k=0;k<periods.length;k++){
//							var p=periods[k];
//							latte.teacher.courseware.periods.push(p);
//						}
//					}
				}
			}
			//$("<option value='"+chapter.id+"'>"+chapter.chapername+"</option>").appendTo($("#chapterSelection"));
		}
		
		var srcs = result.src;
		ht = "<dt>来源：</dt><dd id=\"-1\" class=\"current\">全部</dd>";
		for (var i = 0; i < srcs.length; i++) {
			var src = srcs[i];
			ht += "<dd id='" + src.dictCode + "'>" + src.dictName + "</dd>";
		}
		// ht+="<dd id=\"0\">我的</dd>";
		$('#src').html(ht);

		var phases = result.phase;
		ht = "<dt>阶段：</dt><dd id=\"-1\" class=\"current\">全部</dd>";
		for (var i = 0; i < phases.length; i++) {
			var phase = phases[i];
			ht += "<dd id='" + phase.dictCode + "'>" + phase.dictName + "</dd>";
		}
		$('#phase').html(ht);
 
		$('#phase').on(
				"click",
				"dd",
				function() {
					$(this).siblings('dd').removeClass('current');
					$(this).addClass('current');
					latte.teacher.courseware.data.searchData.pageNo = 1;
					latte.teacher.courseware.data.searchData.phase = $(this)
							.attr("id");
				});

		$('#src').on("click", "dd", function() {
			$(this).siblings('dd').removeClass('current');
			$(this).addClass('current');
			latte.teacher.courseware.data.searchData.pageNo = 1;
			latte.teacher.courseware.data.searchData.src = $(this).attr("id");
		});

		 
		var stage = result.stage;
		var subject = result.subject;
		latte.teacher.courseware.data.searchData.stageid = stage;
		latte.teacher.courseware.data.searchData.subjectid = subject;
		latte.teacher.courseware
				.initTopic(latte.teacher.courseware.data.searchData.subjectid);
		latte.teacher.courseware.initTab();
	},
	initTopic : function(subjectId) {
		$.ajax({
			type : "get",
			cache : false,
			contentType : "application/json",
			url : ctx + "/teacher/resource/loadTopic/" + subjectId,
			dataType : 'json',
			success : latte.teacher.courseware.initTopicData 
		});
	},
	initTopicData : function(response) {
		latte.teacher.courseware.topicData = response;
		latte.teacher.courseware
				.handleTopic(latte.teacher.courseware.topicData);
	},
	handleTopic : function(topicData) {
		var modules = JSON.parse(JSON.stringify(topicData));

		var moduleArray = new Array();
		if (latte.teacher.courseware.theme == 0) {
			var moduleTopic = modules.moduleTopic;
			for (var i = 0; i < moduleTopic.length; i++) {
				var module = moduleTopic[i];
				var units = module.units;
				module["pId"] = 0;
				module["open"] = false;
				delete module.units;
				delete module.series;
				moduleArray.push(module);
				for (var j = 0; j < units.length; j++) {
					var unit = units[j];
					var topics = unit.topics;
					unit["pId"] = module.id;
					unit.id = module.id + '-' + unit.id;
					delete unit.topics;
					moduleArray.push(unit);
					for (var k = 0; k < topics.length; k++) {
						var topic = topics[k];
						topic["pId"] = unit.id;
						topic.id = unit.id + '-' + topic.id;
						moduleArray.push(topic);

					}
				}
			}
		} else if (latte.teacher.courseware.theme == 1) {
			var moduleSeries = modules.moduleSeries;
			for (var i = 0; i < moduleSeries.length; i++) {
				var module = moduleSeries[i];
				var series = module.series;
				module["pId"] = 0;
				module["open"] = false;
				delete module.units;
				delete module.series;
				moduleArray.push(module);
				for (var j = 0; j < series.length; j++) {
					var s = series[j];
					s["pId"] = module.id;
					s.id = module.id + '-' + s.id;
					delete s.topics;
					moduleArray.push(s);

				}
			}
		}
		latte.teacher.courseware.zNodes = moduleArray;
		latte.teacher.courseware.initTree();
	},
	initChapter : function () {
		var chapters=latte.teacher.courseware.chapters;
		for(var i=0;i<chapters.length;i++){
			var chapter=chapters[i];
			$("<option value='"+chapter.chapterid+"'>"+chapter.chapername+"</option>").appendTo($("#chapterSelection"));
		}
		latte.teacher.courseware.initSection($('#chapterSelection').val());
		
	},
	initSection : function (chapterId){
		$('#sectionSelection').empty();
		if(chapterId!=null&&chapterId>0){
			var sections=latte.teacher.courseware.sections;
			if(sections!=null&&sections.length>0){
				for(var i=0;i<sections.length;i++){
					var section=sections[i];
					if(section.chapter_id==chapterId){
						$("<option value='"+section.id+"'>"+section.name+"</option>").appendTo($("#sectionSelection"));
					}
				}
			}
		}
	},
//	initPeriod : function (sectionId){
//		$('select.info').empty();
//		if(sectionId!=null&&sectionId>0){
//			var periods=latte.teacher.courseware.periods;
//			if(periods!=null&&periods.length>0){
//				for(var i=0;i<periods.length;i++){
//					var p=periods[i];
//					if(p.section_id==sectionId){
//						$("<option value='"+p.id+"'>"+p.name+"</option>").appendTo($("select.info"));
//					}
//				}
//			}
//		}
//	},
	initPeriod : function (){
		$('select.info').empty();
		var periods=latte.periods;
			for(var key in periods){
				$("<option value='"+key+"'>"+periods[key]+"</option>").appendTo($("select.info"));
			}
		 
	},
	/* init ends */
	initTab : function() {// 初始化顶部tab标签
		$('.right_button li').click(function() {
			$(this).siblings('li').removeClass('current');
			$(this).addClass('current');
			/** 在这里添加点击tab标签触发的事件 */
		});

		$('.infoText')
				.change(
						function() {
							latte.teacher.courseware.data.searchData.pageNo = 1;
							latte.teacher.courseware.data.searchData.keyword = encodeURI(encodeURI(util
									.escapeCode($(this).val())));
						});
		$('#theme').click(latte.teacher.courseware.selectTheme);
		$('#special').click(latte.teacher.courseware.selectSpecial);
		$('#phase').on('change', 'dd', function() {
			latte.teacher.courseware.data.searchData.pageNo = 1;
			latte.teacher.courseware.data.searchData.phase = $(this).val();
		});
		$('#src').on('change', 'dd', function() {
			latte.teacher.courseware.data.searchData.pageNo = 1;
			latte.teacher.courseware.data.searchData.src = $(this).val();
		});
		$('#btnSearch').click(function() {
			latte.teacher.courseware.searchResource();
		});
		$('.infoText').keydown(function(e) {
			var event = window.event || e;
			if(event.keyCode == 13){
				latte.teacher.courseware.searchResource();
			}
		});


		$('.opAll').on('click', function() {
			latte.teacher.courseware.zTree.expandAll(false);
			latte.teacher.courseware.data.searchData.pageNo = 1;
			latte.teacher.courseware.data.searchData.topicId = -1;
			latte.teacher.courseware.data.searchData.seriesid = -1;
			latte.teacher.courseware.searchResource();
		});

		$('.nataDetail>div>dl').on('click', 'a', latte.teacher.courseware.sort);
 
		$('#resource_list')
		.on('click',
				'#btnNewCourse',
				function() {
					var id = $(this).attr('data-id');
					var data = latte.teacher.courseware.data.resourceList[id];
					latte.teacher.courseware.resourceName=data.resourceName;
					art.dialog({
								id : "add_res",
								title : '创建课程',
								content : latte.teacher.courseware.data.courseTpl.render(latte.teacher.courseware),
								lock :true,
								padding : 0,
								zIndex:10,
								ok : function() {
								},
								cancelValue : '取消',
								cancel : function() {
								},
								style : "z-index:10"
							});
					
					latte.teacher.courseware.initChapter();
					$('#chapterSelection').unbind();
					$('#chapterSelection').on('change',function () {
						latte.teacher.courseware.initSection($(this).val());
					});
					latte.teacher.courseware.initPeriod();
					$('.aui_state_highlight').unbind();
					$('.aui_state_highlight').click(function (){
						
						var schedules=new Array();
						var ckbs=$('.infoCkb[type=checkbox]:checked');
						if(ckbs==null||ckbs.length==0){
							util.dialog.infoDialog('请选择');
							return false;
						}
						$('.infoCkb[type=checkbox]:checked').each(function(){
							var schedule={"classMode":1,"state":0};
							var dataId=$(this).attr('data-id');
							schedule['classId']=dataId;
							schedule['resourceId']=data.id;
							schedule['resourceMd5']=data.md5;
							schedule['startTime']=new Date($('#'+dataId+'date').val());
							schedule['period']=$('#'+dataId+'sche').val();
							schedules.push(schedule);
						});
						
						var period={
								"sectionId":$('#sectionSelection').val(),
								"name":$('#sectionSelection').text(),
								"resourceName":data.resourceName,
								"resourceMd5" :data.md5,
								"resourceId":data.id,
								"schedules":schedules
						};
						$.ajax({
							type : "POST",
							contentType : 'application/json',
							url : ctx + "/teacher/courseware/createCourse",
							dataType : "json",
							data : JSON.stringify(period),
							success : function(response) {
								util.dialog.infoDialog('成功');
							}
						});
					});
					
					//$(".inputText").val(new Date().format("yy/mm/dd"));
					$(".inputText").datepicker({
						dateFormat : 'yy/mm/dd',
						minDate :0
						 
					});
					
				});
		
		latte.teacher.courseware.sort(true);
	},
	searchResource : function() {
		var url = ctx + "/teacher/courseware/retrieve";
		var data = latte.teacher.courseware.data.searchData;
		data.keyword = $('.infoText').val();
		
		$.ajax({
			type : "get",
			cache : false,
			url : url,
			dataType : 'json',
			data : data,
			beforeSend : function() {
				$('#resource_list').append('<div style="text-align:center;margin-top:20px;"><img src="'
										+ static_ctx
										+ '/static/img/loading.gif"><span style="color:#999999;display:inline-block;font-size:14px;margin-left:5px;vertical-align:bottom;">正在载入，请等待...</span></div>');
			},
			success : latte.teacher.courseware.initPageResource
		});
	},
	initPageResource : function(data) {
		if (!data.success) {
			util.dialog.messageDialog('查询出错');
			return;
		}

		latte.teacher.courseware.data.resourceList = {};
		for ( var index in data.list) {
			var resource = data.list[index];
			latte.teacher.courseware.data.resourceList[resource.id] = resource;
		}

		data['ctx'] = ctx;// 上下文,模板中有超链接时需要使用
		data['static_ctx'] = static_ctx;// 静态内容上下文
		var html = latte.teacher.courseware.data.resourceTpl.render(data);
		$('#resource_list').html(html);

		var totalPage = data.totalPage;
		var totalcount = data.totalCount;
		if (totalPage <= 1) {
			$("#pagebar").html('');
		}
		if (totalPage >= 2) {
			$(function() {
				$.fn.jpagebar({
					renderTo : $("#pagebar"),
					totalpage : totalPage,
					totalcount : totalcount,
					pagebarCssName : 'pagination2',
					currentPage : data.pageNo,
					onClickPage : function(pageNo) {
						$.fn.setCurrentPage(this, pageNo);
						latte.teacher.courseware.data.searchData.pageNo = pageNo;
						if (latte.teacher.courseware.instance_resource == null)
							latte.teacher.courseware.instance_resource = this;
						latte.teacher.courseware.searchResource();
					}
				});
			});
		}
	},
	initResourceFunc : function() {
		$('.starIco em').click(function() {
			$(this).prevAll('em').addClass("limit");
			$(this).addClass("limit");
			$(this).nextAll('em').removeClass("limit");
		});
	},
	zTree : null,
	zNodes : null,
	setting : {
		view : {
			dblClickExpand : false,
			showLine : true,
			selectedMulti : false
		},
		data : {
			simpleData : {
				enable : true,
				idKey : "id",// id 自定义
				pIdKey : "pId",// 父节点id 自定义
				rootPId : ""
			}
		},
		callback : {
			beforeClick : function(treeId, treeNode) {
				var zTree = $.fn.zTree.getZTreeObj("tree");
				if (treeNode.isParent) {
					zTree.expandNode(treeNode);
					latte.teacher.courseware.data.searchData.topicId = '-1';
					latte.teacher.courseware.data.searchData.seriesid = '-1';
					return false;
				} else {
					// console.log(arguments);//点击叶子节点事件
					var topicId = arguments[1].id;
					if (topicId.indexOf("-") >= 0) {
						if (latte.teacher.courseware.theme == 0) {
							latte.teacher.courseware.data.searchData.seriesid = '-1';
							latte.teacher.courseware.data.searchData.topicId = topicId
									.substr(topicId.lastIndexOf("-") + 1);
						} else if (latte.teacher.courseware.theme == 1) {
							latte.teacher.courseware.data.searchData.seriesid = topicId
									.substr(topicId.lastIndexOf("-") + 1);
							latte.teacher.courseware.data.searchData.topicId = '-1';
						}
					}
					latte.teacher.courseware.data.searchData.pageNo = 1;
					latte.teacher.courseware.data.searchData.desc = false;
					latte.teacher.courseware.searchResource();
					return true;

				}
			}
		}
	},
	initTree : function() {// 初始化树功能，折叠展开点击事件
		var t = $("#tree");
		t = $.fn.zTree.init(t, latte.teacher.courseware.setting,
				latte.teacher.courseware.zNodes);
		latte.teacher.courseware.zTree = $.fn.zTree.getZTreeObj("tree");
		latte.teacher.courseware.zTree
				.selectNode(latte.teacher.courseware.zTree.getNodeByParam("id",
						101));

		$('.treeOper .unfold').click(function() {
			latte.teacher.courseware.zTree.expandAll(true);
		});

		$('.treeOper .shrink').click(function() {
			latte.teacher.courseware.zTree.expandAll(false);
		});

	},
	selectTheme : function() {
		var $li = $('#theme').parent('li'); 
		$li.addClass('current').siblings('li').removeClass('current');
		latte.teacher.courseware.theme = 0;
		latte.teacher.courseware.handleTopic(latte.teacher.courseware.topicData);
	},
	selectSpecial : function() {
		var $li = $('#special').parent('li'); 
		$li.addClass('current').siblings('li').removeClass('current');
		latte.teacher.courseware.theme = 1;
		latte.teacher.courseware.handleTopic(latte.teacher.courseware.topicData);
	},
	sort : function(init) {// init 为默认排序项

		var $obj;
		if (init == true) {
			$obj = $('#default');
		} else {
			$obj = $(this);
		}
		var id = $obj.attr("id");

		if ($obj.hasClass('current')) {
			if (id != "default") {
				var $array = $(this).find('em');
				if ($array.hasClass('up')) {
					$array.removeClass('up').addClass('down').text('↓');// 降序
					latte.teacher.courseware.data.searchData.desc = true;
				} else {
					$array.removeClass('down').addClass('up').text('↑');// 升序
					latte.teacher.courseware.data.searchData.desc = !latte.teacher.courseware.data.searchData.desc;
				}
			}
		} else {
			$obj.addClass('current').addClass('down').siblings('span')
					.removeClass('current');
			latte.teacher.courseware.data.searchData.desc = true;
		}
		latte.teacher.courseware.data.searchData.order = $obj.attr("id");// 查询
		latte.teacher.courseware.searchResource();
	}
};
