<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<script type="text/x-jsrender" id="question-tpl">
    {@each content as question,index}
    <div data-qid="?{question.id}" class="qbody2" >
		<div class="qtitle2" style="background:#E0EBF8;" >
			<div class="qindex2">?{index|formatIndex}</div>
			<div style="width:400px;float:left;height:25px;line-height:25px;padding-left:5px;">
				题型：?{question.questionType} 难度：
				<div style="display:inline-block;width:60px;height:7px;">
					<span style="display:inline-block;width:15px;height:7px;background:#98D0F4;float:left;"></span>
					{@if question.difficulty >1 }
						<span style="display:inline-block;width:15px;height:7px;background:#52AFEF;float:left;"></span>
					{@/if}
					{@if question.difficulty >2 }
					<span style="display:inline-block;width:15px;height:7px;background:#0181DD;float:left;"></span>
					{@/if}
					{@if question.difficulty >3 }
					<span style="display:inline-block;width:15px;height:7px;background:blue;float:left;"></span>
					{@/if}
				</div>
				精品：{@if question.highQual }是{@else}否{@/if} 
				视频：{@if question.video }有{@else}无{@/if}
			</div>
			<div style="float:right;width:200px;height:25px;line-height:25px;text-align:right;padding-right:5px;">
				<span data-id="?{question.id}" class="fav" style="cursor:pointer;">收藏</span>
				<span data-id="?{question.id}" class="ref" style="cursor:pointer;">引用</span>
			</div>
		</div>
		<div style="display:inline-block;line-height:20px;padding-left:5px;">
			掌握层级：
			{@if question.mastery ==0  }
			无
			{@/if}
			{@if question.mastery ==1  }
			基本
			{@/if}
			{@if question.mastery ==2  }
			普通
			{@/if}
			{@if question.mastery ==3  }
			熟练
			{@/if}
			{@if question.mastery ==4  }
			精通
			{@/if}
			&nbsp;&nbsp;引用次数：?{question.countRef}&nbsp;&nbsp; 年份：?{question.paperYear} &nbsp;&nbsp;?{question.paperName}
		</div>		
		??{question|parseQust}
	</div>
	{@/each}
</script>

<script type="text/x-jsrender" id="question-detail-tpl">
	<div class="qcontent">
		<label>题干</label>
		<div><img src="?{qBody}"></div>
	</div>
	<div class="qcontent">
		<label>答案</label>
		<div><img src="?{qAnswer}"></div>
	</div>
	<div class="qcontent">
		<label>解析</label>
		<div><img src="?{qAnalysis}"></div>
	</div>
</script>



<script type="text/x-jsrender" id="q_single_type1">
		<div class="qcontent">
			<label>题干</label>
			<div><img src="?{qBody}"></div>
		</div>
		<div class="qcontent">
			<label>选项数</label>
			<div>?{countOptions}</div>
		</div>
		<div class="qcontent">
			<label>选项</label>
			<div><img src="?{qOptions}"></div>
		</div>
		<div class="qcontent">
			<label>答案</label>
			<div><img src="?{qAnswer}"></div>
		</div>
		<div class="qcontent">
			<label>解析</label>
			<div><img src="?{qAnalysis}"></div>
		</div>
</script>
<script type="text/x-jsrender" id="q_single_type2">
        <div class="qcontent">
            <label>题干</label>
            <div><img src="?{qBody}"></div>
        </div>
        <div class="qcontent">
            <label>答案</label>
            <div><img src="?{qAnswer}"></div>
        </div>
        <div class="qcontent">
            <label>解析</label>
            <div><img src="?{qAnalysis}"></div>
   		</div>
</script>
<script type="text/x-jsrender" id="q_single_type3">
        <div class="qcontent">
            <label>题干</label>
            <div><img src="?{qBody}"></div>
        </div>
        <div class="qcontent">
            <label>选项</label>
            <div><img src="?{qOptions}"></div>
        </div>
        <div class="qcontent">
            <label>答案</label>
            <div><img src="?{qAnswer}"></div>
        </div>
        <div class="qcontent">
            <label>解析</label>
            <div><img src="?{qAnalysis}"></div>
       	</div>
</script>
<script type="text/x-jsrender" id="q_composite_type1">
        <div class="qcontent">
            <label>题干</label>
            <div><img src="?{qBody}"></div>
        </div>
        <div class="qcontent">
            <label>译文</label>
            <div><img src="?{translation}"></div>
        </div>
        <div class="qcontent">
            <label>材料</label>
            <div><img src="?{material}"></div>
        </div>
</script>

<script type="text/x-jsrender" id="q_error">
        <div class="qcontent">
            <label>题干</label>
            <div><img src="?{qBody}"></div>
        </div>
        <div class="qcontent">
            <label>选项数</label>
            <div>?{countOptions}</div>
        </div>
        <div class="qcontent">
            <label>选项</label>
            <div><img src="?{qOptions}"></div>
        </div>
        <div class="qcontent">
            <label>答案</label>
            <div><img src="?{qAnswer}"></div>
        </div>
        <div class="qcontent">
            <label>解析</label>
            <div><img src="?{qAnalysis}"></div>
		</div>
      	<div class="qcontent">
			<label>译文</label>
			<div><img src="?{translation}"></div>
     	</div>
       	<div class="qcontent">
			<label>材料</label>
			<div><img src="?{material}"></div>
		</div>
</script>

<script src="${static_ctx}/static/js/teacher/quiz.js"></script>