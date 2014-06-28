latte.quiz = {
	data : {
		questionTpl : null,
		q_single_type1 : null,
		q_single_type2 : null,
		q_single_type3 : null,
		q_composite_type1 : null,
		q_error : null
	},
	init : function(){
		latte.quiz.data.questionTpl = juicer($('#question-tpl').html());
		latte.quiz.data.q_single_type1 = juicer($('#q_single_type1').html());
		latte.quiz.data.q_single_type2 = juicer($('#q_single_type2').html());
		latte.quiz.data.q_single_type3 = juicer($('#q_single_type3').html());
		latte.quiz.data.q_composite_type1 = juicer($('#q_composite_type1').html());
		latte.quiz.data.q_error = juicer($('#q_error').html());
	},
    parseQust: function (question) {
        switch (question.questionType) {
            case "选择题":
            case "单项选择":
            case "双选题":
            case "不定项选择题":
            case "多选题":
            	return latte.quiz.data.q_single_type1.render(question);
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
                return latte.quiz.data.q_single_type2.render(question);
            case "优选题":
            	return latte.quiz.data.q_single_type3.render(question);
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
            	return latte.quiz.data.q_composite_type1.render(question);
            case "英语听力特殊题型":
            	return latte.quiz.data.q_composite_type1.render(question);
            case "格式错误":
                return latte.quiz.data.q_error.render(question);
        }
    }
};

juicer.register('formatIndex',util.formatIndex);
juicer.register('parseQust',latte.quiz.parseQust);
