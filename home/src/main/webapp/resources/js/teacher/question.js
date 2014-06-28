latte.teacher.question = {
	data : {
		searchData : {
			resource : null,//题目来源
			questionType : null,// 题目类型
			topicId :null,//主体id
			paperName : null,//查询关键字
			sort : 'default',// 排序
			grade : $('#grade').val(),
			subject : $('#subject').val(),
			page : 0,
			limit : 5,
			desc : false
		}
	},
	dataList:[]
    ,
	init : function() {
		quiz.init();//初始化题目模板
		latte.teacher.question.initSrc();
		latte.teacher.question.initTab();
		latte.teacher.question.sort(true);
		$('#search_panel').on('click','dd',function(){
			$(this).siblings('dd').removeClass('current');
			$(this).addClass('current');
		});
		$('#topic').on('click','dd',latte.teacher.question.searchResource);
		$('#btn_search').click(latte.teacher.question.searchResource);
		$('#resource_list').on('click','span.fav',function(){
			var $obj = $(this);
			var questionId = $(this).attr('data-id');
			$obj.attr('disabled','disabled');
			$.ajax({
				type : 'post',
				url : ctx + '/qust/quizLog',
				dataType: "json",
				contentType: 'application/json;charset=UTF-8',
				data : JSON.stringify({questionId:questionId,operation:'2'}),
				success : function(data){
					$obj.after('<span>已收藏</span>');
					$obj.remove();
				},
				error : function() {
					$obj.removeAttr('disabled');
					util.dialog.errorDialog('发生错误!');
				}
			});
		});
		$('#resource_list').on('click','span.ref',function(){
			
			var questionId = $(this).attr('data-id');
			
			var returnObj={};
			var contentList = latte.teacher.question.dataList;
			for (var i = 0; i < contentList.length; i++) {
				if(contentList[i].id ==questionId ){
					returnObj = contentList[i];
					break;
				}
			}
			
			if(top){
				(function (method, p) {
					if ($("#quote_iframe").length === 0) {
			            $("<iframe>").attr({
			                id: "quote_iframe"
			            }).css("display", "none").appendTo(document.body);
					}
					
		            $("<form>").attr({
		                method: "POST",
		                action: whiteboard_host,
		                target: "quote_iframe"
		            }).css("display", "none").append([_ipt("method", method), _ipt("p", JSON.stringify(p))]).appendTo(document.body).submit();
		            
		            function _ipt(n, v) {
		                return $("<input>").attr({
		                    name: n,
		                    value: v
		                })[0];
		            }
		        })("compQuestionBank", returnObj);
			}
			
			var $obj = $(this);
			
			$obj.attr('disabled','disabled');
			$.ajax({
				type : 'post',
				url : ctx + '/qust/quizLog',
				dataType: "json",
				contentType: 'application/json;charset=UTF-8',
				data : JSON.stringify({questionId:questionId,operation:'2'}),
				success : function(data){
					
				},
				error : function() {
					$obj.removeAttr('disabled');
					util.dialog.errorDialog('发生错误!');
				}
			});
		});
	},
	initSrc : function() {//初始化(查询)来源,题型,主题
		$.ajax({
			type : 'get',
			async:false,
			contentType : 'application/json',
			url : ctx + '/qust/topic?topicId='+$('#topicId').val(),
			dataType : 'json',
			success : latte.teacher.question.handleInit,
			error : function() {
				util.dialog.errorDialog('查询主题出错!');
			}
		});
	},
	handleInit : function(data) {//初始化(渲染)来源,格式,主题
		var result = JSON.parse(JSON.stringify(data));
		ht = '<dt>主题：</dt><dd val=\'-1\' class=\'current\'>全部</dd>';
		for (var i = 0; i < result.length; i++) {
			var t = result[i];
			ht += '<dd val="' + t.id + '">' + t.name + '</dd>';
		}
		$('#topic').html(ht);
	},
	/* init ends */
	initTab : function() {// 初始化顶部tab标签
		$('.TabTit li').click(function() {
			$(this).siblings('li').removeClass('current');
			$(this).addClass('current');

			if($(this).attr('id') == 'all_question'){
				$('#topic').hide();
				$('#search_key').show();
			}else{
				$('#topic').show();
				$('#search_key').hide();
				latte.teacher.question.searchResource();
				
			}
		});
		$('.sort-panel').on('click', '.sort-option', latte.teacher.question.sort);
	},
	searchResource : function() {//查询
		var url = ctx + '/qust/search';
		latte.teacher.question.data.searchData.page = 0;
		$.ajax({
			type : 'get',
			cache : false,
			url : url,
			dataType : 'json',
			data : latte.teacher.question._getSearchData(),
			success : latte.teacher.question.initPageResource,
			error : function() {
				util.dialog.errorDialog('发生错误!');
			}
		});
	},
	initPageResource : function(data) {//初始化分页
		
		latte.teacher.question.dataList=data.content;
		
		if (!data.currentPage) {
			util.dialog.messageDialog('查询出错');
			return;
		}
		data['ctx'] = ctx;// 上下文,模板中有超链接时需要使用
		data['static_ctx'] = static_ctx;// 静态内容上下文
		var html = quiz.data.questionTpl.render({questions:data.content});
		$('#resource_list').html(html);
		var totalPage = data.totalPage;
		var totalcount = data.totalCount;
		if (totalPage <= 1) {
			$('#pagebar').html('');
		}
		if (totalPage >= 2) {
			$(function() {
				$.fn.jpagebar({
					renderTo : $('#pagebar'),
					totalpage : totalPage,
					totalcount : totalcount,
					pagebarCssName : 'pagination2',
					currentPage : data.currentPage,
					onClickPage : function(pageNo) {
						$.fn.setCurrentPage(this, pageNo);
						latte.teacher.question.data.searchData.pageNo = pageNo;
						if (latte.teacher.question.instance_resource == null)
							latte.teacher.question.instance_resource = this;
						var url = ctx + '/qust/search';
						latte.teacher.question.data.searchData.page = pageNo;
						$.ajax({
							type : 'get',
							cache : false,
							url : url,
							dataType : 'json',
							data : latte.teacher.question._getSearchData(),
							success : function(data){
								data['ctx'] = ctx;// 上下文,模板中有超链接时需要使用
								data['static_ctx'] = static_ctx;// 静态内容上下文
								var html = quiz.data.questionTpl.render({questions:data.content});
								$('#resource_list').html(html);
							},
							error : function() {
								util.dialog.errorDialog('发生错误!');
							}
						});
					}
				});
			});
		}
	},
	sort : function(init) {// init 为默认排序项
		var $obj = init == true ? $obj = $('#default') : $(this);
		latte.teacher.question.data.searchData.sort = $obj.attr('sort');
		var id = $obj.attr('id');
		if ($obj.hasClass('current')) {
			if (id != 'default') {
				var $array = $(this).find('em');
				if ($array.hasClass('up')) {
					$array.removeClass('up').addClass('down').text('↓');// 降序
					latte.teacher.question.data.searchData.desc = true;
				} else {
					$array.removeClass('down').addClass('up').text('↑');// 升序
					latte.teacher.question.data.searchData.desc = !latte.teacher.question.data.searchData.desc;
				}
			}
		} else {
			$obj.addClass('current').addClass('down').siblings('span').removeClass('current');
			latte.teacher.question.data.searchData.desc = true;
		}
		latte.teacher.question.data.searchData.order = $obj.attr('id');// 查询
		latte.teacher.question.searchResource();
	},
	_getSearchData : function(){
		latte.teacher.question.data.searchData.resource = $('#src dd.current').attr('val');
		latte.teacher.question.data.searchData.questionType = $('#type dd.current').attr('val');
		latte.teacher.question.data.searchData.topicId = $('#topic dd.current').attr('val');
		latte.teacher.question.data.searchData.paperName = $('#paper_name').val()==true ?$('#paper_name').val():-1;
		if(latte.teacher.question.data.searchData.topicId==-1){
			
			latte.teacher.question.data.searchData.topicId=$('#topicId').val();
			
		}
		var data = {};
		for(var key in latte.teacher.question.data.searchData){
			if(latte.teacher.question.data.searchData[key] != -1 && latte.teacher.question.data.searchData[key] !== ''){
				data[key] = latte.teacher.question.data.searchData[key];
			}
		}
		return data;
	}
};

var quiz = {
		data : {
			questionTpl : null,
			subQuestionTpl : null,
			q_single_type1 : null,
			q_single_type2 : null,
			q_single_type3 : null,
			q_composite_type1 : null,
			q_error : null
		},
		init : function(){
			quiz.data.questionTpl = juicer($('#question-tpl').html());
			quiz.data.subQuestionTpl = juicer($('#subquestion-tpl').html());
			quiz.data.q_single_type1 = juicer($('#q_single_type1').html());
			quiz.data.q_single_type2 = juicer($('#q_single_type2').html());
			quiz.data.q_single_type3 = juicer($('#q_single_type3').html());
			quiz.data.q_composite_type1 = juicer($('#q_composite_type1').html());
			quiz.data.q_error = juicer($('#q_error').html());
		},
	    parseQust: function (question,editable,pindex) {
	    	question.editable = editable;
	    	if(pindex || pindex == 0){
	    		question.pindex = parseInt(pindex) + 1;
	    	}
	        switch (question.questionType) {
	            case "选择题":
	            case "单项选择":
	            case "双选题":
	            case "不定项选择题":
	            case "多选题":
	            case "音标（语音）":
	            	return quiz.data.q_single_type1.render(question);
	            case "简答题":
	            case "判断题":
	            case "实验题":
	            case "作图题":
	            case "计算题":
	            case "其他":
	            case "填空题":
	            case "词汇运用":
	            case "句型转换":
	            case "填空型听力":
	            case "填空型完形填空":
	            case "信息匹配题":
	            case "填空型阅读理解":
	            case "改错题":
	            case "翻译题":
	            case "书面表达":
	            case "辨析改错题":
	            case "连线题":
	            case "材料题":
	            case "写作题":
	            case "判断题说明题":
	            case "论述题":
	            case "辨析题":
	            case "解答题":
	            case "实验探究题":
	            case "问答题":
	            case "信息综合题":
	            case "选择搭配题":
	            case "选择填空题":
	            case "词汇（运用）":
	            case "字母题":
	            case "排序题":
	            case "连词成句":
	                return quiz.data.q_single_type2.render(question);
	            case "优选题":
	            	return quiz.data.q_single_type3.render(question);
	            case "现代文阅读":
	            case "文言文阅读题":
	            case "组合选择题":
	            case "组合填空题":
	            case "综合题":
	            case "组合简答题":
	            case "短对话选择型听力":
	            case "选择型完形填空":
	            case "选择型阅读理解":
	            case "探究题":
	            case "现代文阅读题":
	            case "分析说明题":
	            case "长对话选择型听力":
	            	return quiz.data.q_composite_type1.render(question);
	            case "英语听力特殊题型":
	            	return quiz.data.q_composite_type1.render(question);
	            case "格式错误":
	                return quiz.data.q_error.render(question);
	        }
	    },
	    parseSubQustList : function(questions,editable,pindex) {
	    	var data = {questions:questions,editable:editable};
	    	if(pindex)
	    		data.pindex =pindex;
			return quiz.data.subQuestionTpl.render(data);
		}
	};

	juicer.register('formatIndex',util.formatIndex);
	juicer.register('parseSubQustList',quiz.parseSubQustList);
	juicer.register('parseQust',quiz.parseQust);

