<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<script type="text/x-jsrender" id="question-tpl">
    {@each questions as question,index}
    <div id="qust_?{question.id}" data-qid="?{question.id}" class="question2" >
		<div class="qtitle {@if question.questionType=='格式错误'}bg-error{@/if}" >
			<div class="qindex">?{index|formatIndex}</div>
			<dl class="qtitle-info">
				<dt>题型：</dt>
				<dd style="min-width:80px;">?{question.questionType}</DD>
				<dt>难度：</dt>
				<dd>
					<div class='qdiff'>
						<span></span>
						{@if question.difficulty >1 }
							<span></span>
						{@/if}
						{@if question.difficulty >2 }
						<span></span>
						{@/if}
						{@if question.difficulty >3 }
						<span></span>
						{@/if}
					</div>
				</dd>
				<dt>精品：</dt>
				<dd style="width:40px;">{@if question.highQual }是{@else}否{@/if} </dd>
				<dt>视频：</dt>
				<dd style="width:40px;">{@if question.video }有{@else}无{@/if}</dd>
				<div class='qstatus'>
					{@if question.parentQuestionId == 0}
					<div class="question-option rfloat">
						<span data-id="?{question.id}" class="fav btn18" style="cursor:pointer;">收藏</span>
						<span data-id="?{question.id}" class="ref btn18" style="cursor:pointer;">引用</span>
					</div>
					{@/if}
				</div>
			</dl>
		</div>
		<dl class="qref">
			<dt>掌握层级：</dt>
			<dd style="width:40px;">
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
			</dd>
			<dt>引用次数：</dt>
			<dd style="width:80px;">?{question.countRef}</dd>
			<dt>年份：</dt>
			<dd style="width:40px;">?{question.paperYear}</dd>
			<dd>?{question.paperName}</dd>
		</dl>
		??{question,editable|parseQust}
	</div>
	{@/each}
</script>

<script type="text/x-jsrender" id="subquestion-tpl">
    {@each questions as question,index}
    <div id="qust_?{question.id}" data-qid="?{question.id}" class="subquestion2" >
		<div class="qtitle {@if question.questionType=='格式错误'}bg-error{@/if}" >
			<div class="subqindex" style="color:#000000;">
				{@if question.questionType=='英语听力特殊题型'}听力{@else}小题{@/if}
				??{index|formatIndex}
			</div>
			<dl class="qtitle-info">
				<dt>题型：</dt> <dd style="min-width:80px;">?{question.questionType}</DD>
			</dl>
		</div>
		??{question,editable|parseQust}
	</div>
	{@/each}
</script>


<script type="text/x-jsrender" id="q_single_type1">
	{@if qBody}
	<dl class="qbody">
		<dd><img src="?{qBody}"/></dd>
	</dl>
	{@/if}
	{@if qOptions}
	<dl class="qbody">
		<dd><img src="?{qOptions}"/></dd>
	</dl>
	{@/if}
	{@if qAnswer}
	<dl class="qcontent">
		<dt>答案：</<dt>
		<dd><img src="?{qAnswer}"/></dd>
	</dl>
	{@/if}
	{@if qAnalysis}
	<dl class="qcontent">
		<dt>解析：</dt>
		<dd><img src="?{qAnalysis}"/></dd>
	</dl>
	{@/if}

	{@if parentQuestionId == 0}
	<span class="replace-for-topic" style="display:none;"></span><span class="replace-for-series" style="display:none;"></span>
	{@/if}

	{@if audio}
	<dl class="qcontent">
		<dt>音频：</dt>
		<dd><label url="?{audio}">播放</label></dd>
	</dl>
	{@/if}
	{@if video}
	<dl class="qcontent">
		<dt>视频：</dt>
		<dd><label url="?{video}">播放</label></dd>
	</dl>
	{@/if}
</script>
<script type="text/x-jsrender" id="q_single_type2">
	{@if qBody}
	<dl class="qbody">
		<dd><img src="?{qBody}"/></dd>
	</dl>
	{@/if}
	{@if qAnswer}
	<dl class="qcontent">
		<dt>答案：</dt>
		<dd><img src="?{qAnswer}"/></dd>
	</dl>
	{@/if}
	{@if qAnalysis}
	<dl class="qcontent">
		<dt>解析：</dt>
		<dd><img src="?{qAnalysis}"/></dd>
	</dl>
	{@/if}

	{@if parentQuestionId == 0}
	<span class="replace-for-topic" style="display:none;"></span><span class="replace-for-series" style="display:none;"></span>
	{@/if}

	{@if audio}
	<dl class="qcontent">
		<dt>音频：</dt>
		<dd><label url="?{audio}">播放</label></dd>
	</dl>
	{@/if}
	{@if video}
	<dl class="qcontent">
		<dt>视频：</dt>
		<dd><label url="?{video}">播放</label></dd>
	</dl>
	{@/if}
</script>
<script type="text/x-jsrender" id="q_single_type3">
	{@if qBody}
	<dl class="qbody">
		<dd><img src="?{qBody}"/></dd>
	</dl>
	{@/if}
	{@if qOptions}
	<dl class="qbody">
		<dd><img src="?{qOptions}"/></dd>
	</dl>
	{@/if}
	{@if qAnswer}
	<dl class="qcontent">
		<dt>答案：</dt>
		<dd><img src="?{qAnswer}"/></dd>
	</dl>
	{@/if}
	{@if qAnalysis}
	<dl class="qcontent">
		<dt>解析：</dt>
		<dd><img src="?{qAnalysis}"/></dd>
	</dl>
	{@/if}

	{@if parentQuestionId == 0}
	<span class="replace-for-topic" style="display:none;"></span><span class="replace-for-series" style="display:none;"></span>
	{@/if}

	{@if audio}
	<dl class="qcontent">
		<dt>音频：</dt>
		<dd><label url="?{audio}">播放</label></dd>
	</dl>
	{@/if}
	{@if video}
	<dl class="qcontent">
		<dt>视频：</dt>
		<dd><label url="?{video}">播放</label></dd>
	</dl>
	{@/if}
</script>
<script type="text/x-jsrender" id="q_composite_type1">
	{@if qBody}
	<dl class="qbody">
		<dd><img src="?{qBody}"/></dd>
	</dl>
	{@/if}
	{@if translation}
	<dl class="qcontent">
		<dt>译文：</dt>
		<dd><img src="?{translation}"/></dd>
	</dl>
	{@/if}
	{@if material}
	<dl class="qcontent">
		<dd style="width:98%;"><img src="?{material}"/></dd>
	</dl>
	{@/if}


	{@if parentQuestionId == 0}
	<span class="replace-for-topic" style="display:none;"></span><span class="replace-for-series" style="display:none;"></span>
	{@/if}
	{@if audio}
	<dl class="qcontent">
		<dt>音频：</dt>
		<dd><label url="?{audio}">播放</label></dd>
	</dl>
	{@/if}
	{@if video}
	<dl class="qcontent">
		<dt>视频：</dt>
		<dd><label url="?{video}">播放</label></dd>
	</dl>
	{@/if}

	<dl>
		{@if pindex}
			??{subQuestions,editable,pindex|parseSubQustList}
		{@else}
			??{subQuestions,editable|parseSubQustList}
		{@/if}
	</dl>
</script>

<script type="text/x-jsrender" id="q_error">
	{@if qBody}
	<dl class="qbody">
		<dd><img src="?{qBody}"/></dd>
	</dl>
	{@/if}
	{@if qOptions}
	<dl class="qbody">
		<dd><img src="?{qOptions}"/></dd>
	</dl>
	{@/if}
	{@if qAnswer}
	<dl class="qcontent">
		<dt>答案：</dt>
		<dd><img src="?{qAnswer}"/></dd>
	</dl>
	{@/if}
	{@if xxx}
	<dl qAnalysis="qcontent">
		<dt>解析：</dt>
		<dd><img src="?{qAnalysis}"/></dd>
	</dl>
	{@/if}
	{@if translation}
	<dl class="qcontent">
		<dt>译文：</dt>
		<dd><img src="?{translation}"/></dd>
	</dl>
	{@/if}
	{@if material}
	<dl class="qcontent">
		<dd  style="width:98%;"><img src="?{material}"/></dd>
	</dl>
	{@/if}

	{@if parentQuestionId == 0}
	<span class="replace-for-topic" style="display:none;"></span><span class="replace-for-series" style="display:none;"></span>
	{@/if}

	{@if audio}
	<dl class="qcontent">
		<dt>音频：</dt>
		<dd><label url="?{audio}">播放</label></dd>
	</dl>
	{@/if}
	{@if video}
	<dl class="qcontent">
		<dt>视频：</dt>
		<dd><label url="?{video}">播放</label></dd>
	</dl>
	{@/if}
</script>
