var Paper = {
    loadPaper: function () {
        $.get("http://localhost:8080/paper/test?path=/Users/lianghongyun/Documents/temp/noriental/635233310567533458/").done(function (data) {
            $("#container").empty();
            Paper.parsePaperJson(data, $("#container"));
        });
    },
    parsePaperJson: function (paperJson, $container) {
        $.each(paperJson.questions, function (idx, itm) {
            switch (itm.questionType) {
                case "选择题":
                    $container.append($("#q_single_type1").render(itm));
                    break;
                case "简答题":
                case "计算题":
                case "填空题":
                case "判断题":
                case "材料题":
                case "实验题":
                case "作图题":
                case "词汇运用":
                case "句型转换":
                case "填空型听力":
                case "填空型完形填空":
                case "信息匹配题":
                case "改错题":
                case "翻译题":
                case "书面表达":
                case "写作题":
                case "选择填空题":
                case "辨析题":
                case "解答题":
                case "连线题":
                case "选择搭配题":
                case "辨析改错题":
                    $container.append($("#q_single_type2").render(itm));
                    break;
                case "优选题":
                    $container.append($("#q_single_type3").render(itm));
                    break;
                case "综合题":
                case "现代文阅读":
                case "短对话选择型听力":
                case "文言文阅读":
                case "组合填空题":
                case "选择型完形填空":
                case "选择型阅读理解":
                case "组合选择题":
                case "探究题":
                case "分析说明题":
                case "组合简答题":
                    $container.append(Paper.parseMultiQuestion(itm));
                    break;
                case "长对话选择型听力":
                    $container.append(Paper.parseSepicalQuestion(itm));
                    break;
            }
        });
    },
    parseSingleQuestion: function (question) {
        switch (question.questionType) {
            case "选择题":
                return $("#q_single_type1").render(question);
            case "简答题":
            case "填空题":
                return $("#q_single_type2").render(question);
        }
    },
    parseMultiQuestion: function (question) {
        var html = $("#q_composite_type1").render(question);
        var subHtml = "";
        if (question.subQuestions) {
            $.each(question.subQuestions, function (idx, itm) {
                subHtml += Paper.parseSingleQuestion(itm);
            });
        }
        return html.replace("<subQuestionContent></subQuestionContent>", subHtml);
    },
    parseSepicalQuestion: function (question) {
        var html = $("#q_composite_type1").render(question);
        var subHtml = "";

        if (question.subQuestions) {
            $.each(question.subQuestions, function (idx, itm) {
                subHtml += Paper.parseMultiQuestion(itm);
            });
        }
        return html.replace("<subQuestionContent></subQuestionContent>", subHtml);

    }
}