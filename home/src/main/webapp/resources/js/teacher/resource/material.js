latte.teacher.material = {
	data : {
		resourceTpl : null,
		searchData : {
			stageid : '-1',
			subjectid : '-1',
			phase : '-1',// 阶段
			src : '-1',// 来源
			format : '-1',//格式
			order : 'submitTime',// 排序
			topicId : '-1',
			keyword : '',
			seriesid : '-1',
			pageNo : '1',
			desc : true
		},
		resourceList : null
	},
	rms:'',
	topicData : [],
	theme : 0,
	init : function() {
		$('#nav_material').addClass('current');
		latte.teacher.material.data.resourceTpl = juicer($('#resource-tpl').html());
		latte.teacher.material.initSrc();
		//latte.teacher.material.initTree();

		//$('.search').click(latte.teacher.material.searchResource);

		latte.teacher.review.init();

		// $('#resource_list').on('click','.verify',function(){
		// var id = $(this).attr('data-id');
		// var data = latte.teacher.material.data.resourceList[id];
		// latte.xk.review.show(data);
		// });
		
		
		
		//收藏
		$('#resource_list').on('click','#btnFav',function(){
			var $obj=$(this);
			var id = $(this).attr('data-id');
			//TODO judge the resource belongs to me or not
//			var data = latte.teacher.material.data.resourceList[id];
			util.dialog.defaultDialog('分类:<select id="rmr">'+latte.teacher.material.rms+'</select>',function(){
				$.ajax({
					type : "POST",
					cache : false,
					contentType: 'application/json',
					url : ctx+"/teacher/resource/favResource",
					dataType : 'json',
					data:JSON.stringify({
						"resourceManagementId":$('#rmr').val(),
						"resourceId":id,
						"resourceType":1
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
			
			
//			
			//latte.xk.review.view(data);
		});
		$('#resource_list').on('click','.sortTitle',function(){
			var id = $(this).attr('data-id');
			var data = latte.teacher.material.data.resourceList[id];
			latte.teacher.review.view(data);
		});
		
		$('#resource_list').on('click','#btnDnd', function() {
			var id = $(this).attr('data-id');
			var data = latte.teacher.material.data.resourceList[id];
			window.open(util.getNfsUrl()+data.md5, "_blank");
			//latte.teacher.review.show(data);
			//latte.teacher.material.checking();
			
		});
		
		
//		$('#resource_list').on('click', '.verify', function() {
//			var id = $(this).attr('data-id');
//			var data = latte.teacher.material.data.resourceList[id];
//			latte.xk.review.show(data);
//			latte.teacher.material.checking();
//		});
//		$('#resource_list').on('click', '.start', function() {
//			var id = $(this).attr('data-id');
//			var data = latte.teacher.material.data.resourceList[id];
//			latte.teacher.material.start(data);
//		});
//		$('#resource_list').on('click', '.stop', function() {
//			var id = $(this).attr('data-id');
//			var data = latte.teacher.material.data.resourceList[id];
//			latte.teacher.material.stop(data);
//		});
//
//		$('#resource_list').on('click', '.edit', function() {
//			var id = $(this).attr('data-id');
//			var data = latte.teacher.material.data.resourceList[id];
//			latte.teacher.material.edit(data);
//		});
//		$('#resource_list').on('click', '.del', function() {
//			var id = $(this).attr('data-id');
//			var data = latte.teacher.material.data.resourceList[id];
//			latte.teacher.material.del(data);
//		});

	},
	checking:function(){
//		$.ajax({
//			type : "POST",
//			cache : false,
//			contentType: 'application/json',
//			url : ctx+"/res/resource/approve",
//			dataType : 'json',
//			data:JSON.stringify({
//				"checkStatus":3,
//				"resourceType":1,
//				"resource":latte.xk.review.data.resourceId
//			}),
//			success : function(response){
//			 
//			},
//			error : function() {
//			 
//			}
//		});
	 
 
},
	start : function(data) {
		util.dialog.defaultDialog('确认启用?', function() {
//			$.ajax({
//				type : "POST",
//				cache : false,
//				contentType : 'application/json',
//				url : ctx + "/res/resource/enable",
//				dataType : 'json',
//				data : JSON.stringify({
//					"resourceType" : 1,
//					"id" : data.id
//				}),
//				success : function(response) {
//					util.dialog.messageDialog('成功');
//					latte.teacher.material.searchResource();
//				},
//				error : function(response) {
//					util.dialog.errorDialog('启用失败');
//				}
//			});
		});
	},
	stop : function(data) {
		util.dialog.defaultDialog('确认停用?', function() {
//			$.ajax({
//				type : "POST",
//				cache : false,
//				contentType : 'application/json',
//				url : ctx + "/res/resource/disable",
//				dataType : 'json',
//				data : JSON.stringify({
//					"resourceType" : 1,
//					"id" : data.id
//				}),
//				success : function(response) {
//					util.dialog.messageDialog('成功');
//					latte.teacher.material.searchResource();
//				},
//				error : function(response) {
//					util.dialog.errorDialog('停用失败');
//				}
//			});
		});
	},
	edit : function(data) {
		//location.href = ctx + '/res/resource/toUpdate/1/' + data.id;
		
	},
	del : function(data) {
		util.dialog.defaultDialog('确认删除?', function() {
//			$.ajax({
//				type : "DELETE",
//				cache : false,
//				contentType : 'application/json',
//				url : ctx + "/res/material/delete",
//				dataType : 'json',
//				data : JSON.stringify({
//					"id" : data.id
//				}),
//				success : function(response) {
//					util.dialog.messageDialog('成功');
//					latte.teacher.material.searchResource();
//				},
//				error : function(response) {
//					util.dialog.errorDialog('删除失败');
//				}
//			});
		});
	},
	initSrc : function() {
		$.ajax({
			type : "get",
			cache : false,
			contentType : "application/json",
			url : ctx + "/teacher/resource/initSearchMaterial",
			dataType : 'json',
			success : latte.teacher.material.handleInit,
			error : function() {
				 
			}
		});
	},
	handleInit : function(data) {
		var result =data;

//		// src handle
//		var srcs = result.src;
//		$("<option value='-1'>来源</option>").appendTo($("#src"));
//		for ( var i = 0; i < srcs.length; i++) {
//			var src = srcs[i];
//			$(
//					"<option value='" + src.dictCode + "'>" + src.dictName
//							+ "</option>").appendTo($("#src"));
//		}
//
//		// //phase handle
//		var phases = result.phase;
//		$("<option value='-1'>阶段</option>").appendTo($("#phase"));
//		for ( var i = 0; i < phases.length; i++) {
//			var phase = phases[i];
//			$(
//					"<option value='" + phase.dictCode + "'>" + phase.dictName
//							+ "</option>").appendTo($("#phase"));
//		}
		
		
		 
		
		latte.teacher.material.rms='';
		var rms=result.rms;
		var ht="";
		for(var i=0;i<rms.length;i++){
			var rm=rms[i];
			ht+="<option value='"+rm.id+"'>"+rm.name+"</option>";
		}
		latte.teacher.material.rms=ht;
		
		var srcs=result.src;
		ht="<dt>来源：</dt><dd id=\"-1\" class=\"current\">全部</dd>";
		for(var i=0;i<srcs.length;i++){
			var src=srcs[i];
			ht+="<dd id='"+src.dictCode+"'>"+src.dictName+"</dd>";
		}
		$('#src').html(ht);
		
		var phases=result.phase;
		ht="<dt>阶段：</dt><dd id=\"-1\" class=\"current\">全部</dd>";
		for(var i=0;i<phases.length;i++){
			var phase=phases[i];
			ht+="<dd id='"+phase.dictCode+"'>"+phase.dictName+"</dd>";
		}
		$('#phase').html(ht);
		
		var formats=result.formats;
		ht="<dt>格式：</dt><dd id=\"-1\" class=\"current\">全部</dd>";
		for(var i=0;i<formats.length;i++){
			var format=formats[i];
			ht+="<dd id='"+format.dictCode+"'>"+format.dictName+"</dd>";
		}
		$('#format').html(ht);
		
		$('#phase').on("click","dd",function(){
			$(this).siblings('dd').removeClass('current');
			$(this).addClass('current');
			latte.teacher.material.data.searchData.pageNo = 1;
			latte.teacher.material.data.searchData.phase = $(this).attr("id");
		});
		
		$('#src').on("click","dd",function(){
			$(this).siblings('dd').removeClass('current');
			$(this).addClass('current');
			latte.teacher.material.data.searchData.pageNo = 1;
			latte.teacher.material.data.searchData.src = $(this).attr("id");
		});
		
		$('#format').on("click","dd",function(){
			$(this).siblings('dd').removeClass('current');
			$(this).addClass('current');
			latte.teacher.material.data.searchData.pageNo = 1;
			latte.teacher.material.data.searchData.format = util.appFormatSearch($(this).attr('id'));;
		});
		

//		var checkStatus = result.checkStatus;
//		$("<option value='-1'>审批状态</option>").appendTo($("#checkStatus"));
//		for ( var i = 0; i < checkStatus.length; i++) {
//			var c = checkStatus[i];
//			$("<option value='" + c.dictCode + "'>" + c.dictName + "</option>")
//					.appendTo($("#checkStatus"));
//		}
//
//		var publishStatus = result.publishStatus;
//		$("<option value='-1'>发布状态</option>").appendTo($("#publishStatus"));
//		for ( var i = 0; i < publishStatus.length; i++) {
//			var p = publishStatus[i];
//			$("<option value='" + p.dictCode + "'>" + p.dictName + "</option>")
//					.appendTo($("#publishStatus"));
//		}
		var stage=result.stage;
		var subject=result.subject;
		latte.teacher.material.data.searchData.stageid = stage;
		latte.teacher.material.data.searchData.subjectid =subject;
		latte.teacher.material.initTopic(latte.teacher.material.data.searchData.subjectid);
		//latte.teacher.material.sort(true);
		latte.teacher.material.initTab();
//		var stages = result.stage;
//
//		for ( var i = 0; i < stages.length; i++) {
//			var stage = stages[i];
//			/* dl="<dl><dt id=\""+stage.id+"\">"+stage.name+"</dt>"; */
//			var subjects = stage.subject;
//			for ( var j = 0; j < subjects.length; j++) {
//				var subject = subjects[j];
//				if (i == 0 && j == 0) {
//					$(
//							"<option value='" + subject.id + "'>" + stage.name
//									+ subject.name + "</option>").appendTo(
//							$("#subject"));
//
//					latte.teacher.material.data.searchData.subjectid = subject.id;
//
//				} else {
//					$(
//							"<option value='" + subject.id + "'>" + stage.name
//									+ subject.name + "</option>").appendTo(
//							$("#subject"));
//				}
//
//			}
//
//		}
//
//		$('#subject').on("change", function() {
//			latte.teacher.material.clearFilter();
//			latte.teacher.material.data.searchData.subjectid = $(this).val();
//			latte.teacher.material.initTopic($(this).val());
//			latte.teacher.material.sort(true);
//
//		});
//		latte.teacher.material.initTopic($("#subject").val());
//		latte.teacher.material.initTab();
	},
	initTopic : function(subjectId) {
		$.ajax({
			type : "get",
			cache : false,
			contentType : "application/json",
			url : ctx + "/teacher/resource/loadTopic/" + subjectId,
			dataType : 'json',
			success : latte.teacher.material.initTopicData,
			error : function() {
				 
			}
		});
	},
	initTopicData : function(response) {
		latte.teacher.material.topicData = response;
		latte.teacher.material
				.handleTopic(latte.teacher.material.topicData);
	},
	handleTopic : function(topicData) {
		var modules = JSON.parse(JSON.stringify(topicData));

		var moduleArray = new Array();
		if (latte.teacher.material.theme == 0) {
			var moduleTopic = modules.moduleTopic;
			for ( var i = 0; i < moduleTopic.length; i++) {
				var module = moduleTopic[i];
				var units = module.units;
				module["pId"] = 0;
				module["open"] = false;
				delete module.units;
				delete module.series;
				moduleArray.push(module);
				for ( var j = 0; j < units.length; j++) {
					var unit = units[j];
					var topics = unit.topics;
					unit["pId"] = module.id;
					unit.id = module.id + '-' + unit.id;
					delete unit.topics;
					moduleArray.push(unit);
					for ( var k = 0; k < topics.length; k++) {
						var topic = topics[k];
						topic["pId"] = unit.id;
						topic.id = unit.id + '-' + topic.id;
						moduleArray.push(topic);

					}
				}
			}
		} else if (latte.teacher.material.theme == 1) {
			var moduleSeries = modules.moduleSeries;
			for ( var i = 0; i < moduleSeries.length; i++) {
				var module = moduleSeries[i];
				var series = module.series;
				module["pId"] = 0;
				module["open"] = false;
				delete module.units;
				delete module.series;
				moduleArray.push(module);
				for ( var j = 0; j < series.length; j++) {
					var s = series[j];
					s["pId"] = module.id;
					s.id = module.id + '-' + s.id;
					delete s.topics;
					moduleArray.push(s);

				}
			}
		}
		latte.teacher.material.zNodes = moduleArray;
		latte.teacher.material.initTree();
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
							latte.teacher.material.data.searchData.pageNo = 1;
							latte.teacher.material.data.searchData.keyword = encodeURI(encodeURI(util.escapeCode($(this).val())));
						});
		$('#theme').click(latte.teacher.material.selectTheme);
		$('#special').click(latte.teacher.material.selectSpecial);
		$('#phase').on('change','dd',function(){
			latte.teacher.material.data.searchData.pageNo = 1;
			latte.teacher.material.data.searchData.phase = $(this).val();
		});  
		$('#src').on('change','dd',function(){
			latte.teacher.material.data.searchData.pageNo = 1;
			latte.teacher.material.data.searchData.src = $(this).val();
		}); 
		$('#format').on('change','dd',function(){
			latte.teacher.material.data.searchData.pageNo = 1;
			latte.teacher.material.data.searchData.format = util.appFormatSearch($(this).val());;
		});
		$('#btnSearch').click(function() {
			latte.teacher.material.searchResource();
		});
		$('.infoText').keydown(function(e) {
			var event = window.event || e;
			if(event.keyCode == 13){
				latte.teacher.material.searchResource();
			}
		});
		
		$('.opAll').on('click',function(){
			latte.teacher.material.zTree.expandAll(false);
			latte.teacher.material.data.searchData.pageNo=1;
			latte.teacher.material.data.searchData.topicId=-1;
			latte.teacher.material.data.searchData.seriesid=-1;
			latte.teacher.material.searchResource();
		});
		$('.nataDetail>div>dl').on('click','a',latte.teacher.material.sort);
		
		latte.teacher.material.sort(true);
	},
	searchResource : function() {
		var url = ctx + "/teacher/material/retrieve";
		var data = latte.teacher.material.data.searchData;
		data.keyword = $('.infoText').val();
		$.ajax({
			type : "get",
			cache : false,
			url : url,
			dataType : 'json',
			data : data,
			success : latte.teacher.material.initPageResource,
			error : function() {
				 
			}
		});
	},
	initPageResource : function(data) {
		if (!data.success) {
			util.dialog.messageDialog('查询出错');
			return;
		}

		latte.teacher.material.data.resourceList = {};
		for ( var index in data.list) {
			var resource = data.list[index];
			latte.teacher.material.data.resourceList[resource.id] = resource;
		}

		data['ctx'] = ctx;// 上下文,模板中有超链接时需要使用
		data['static_ctx'] = static_ctx;// 静态内容上下文
		var html = latte.teacher.material.data.resourceTpl.render(data);
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
								latte.teacher.material.data.searchData.pageNo = pageNo;
								if (latte.teacher.material.instance_resource == null)
									latte.teacher.material.instance_resource = this;
								latte.teacher.material.searchResource();
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
					latte.teacher.material.data.searchData.topicId = '-1';
					latte.teacher.material.data.searchData.seriesid = '-1';
					return false;
				} else {
					// console.log(arguments);//点击叶子节点事件
					var topicId = arguments[1].id;
					if (topicId.indexOf("-") >= 0) {
						if (latte.teacher.material.theme == 0) {
							latte.teacher.material.data.searchData.seriesid = '-1';
							latte.teacher.material.data.searchData.topicId = topicId
									.substr(topicId.lastIndexOf("-") + 1);
						} else if (latte.teacher.material.theme == 1) {
							latte.teacher.material.data.searchData.seriesid = topicId
									.substr(topicId.lastIndexOf("-") + 1);
							latte.teacher.material.data.searchData.topicId = '-1';
						}
					}
					latte.teacher.material.data.searchData.pageNo = 1;
					latte.teacher.material.data.searchData.desc=false;
					latte.teacher.material.searchResource();
					return true;

				}
			}
		}
	},
	initTree : function() {// 初始化树功能，折叠展开点击事件
		var t = $("#tree");
		t = $.fn.zTree.init(t, latte.teacher.material.setting,
				latte.teacher.material.zNodes);
		latte.teacher.material.zTree = $.fn.zTree.getZTreeObj("tree");
		latte.teacher.material.zTree
				.selectNode(latte.teacher.material.zTree.getNodeByParam("id",
						101));
		
		
		$('.treeOper .unfold').click(function(){
			latte.teacher.material.zTree.expandAll(true);
		});
			
		$('.treeOper .shrink').click(function(){
			latte.teacher.material.zTree.expandAll(false);
		});

	},
	selectTheme : function(){
		var $li = $('#theme').parent('li'); 
		$li.addClass('current').siblings('li').removeClass('current');
		latte.teacher.material.theme = 0;
		latte.teacher.material.handleTopic(latte.teacher.material.topicData);
	},
	selectSpecial : function(){
		var $li = $('#special').parent('li'); 
		$li.addClass('current').siblings('li').removeClass('current');
		latte.teacher.material.theme = 1;
		latte.teacher.material.handleTopic(latte.teacher.material.topicData);
	},
	sort : function(init){//init 为默认排序项
		 
		var $obj;
		if(init == true){
			$obj = $('#default');
		}else{
			$obj = $(this);
		}
		var id=$obj.attr("id");
		
		if($obj.hasClass('current')){
			if(id!="default"){
				var $array = $(this).find('em');
				if($array.hasClass('up')){
					$array.removeClass('up').addClass('down').text('↓');//降序
					latte.teacher.material.data.searchData.desc = true;
				}else{
					$array.removeClass('down').addClass('up').text('↑');//升序
					latte.teacher.material.data.searchData.desc = !latte.teacher.material.data.searchData.desc;
				}
			}
		}
		else{
			$obj.addClass('current').addClass('down').siblings('span').removeClass('current');
			latte.teacher.material.data.searchData.desc = true;
		} 
		latte.teacher.material.data.searchData.order = $obj.attr("id");//查询
		latte.teacher.material.searchResource();
	}
};
