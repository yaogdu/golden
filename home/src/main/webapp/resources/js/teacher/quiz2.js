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
