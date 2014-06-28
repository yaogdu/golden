<%@ page language="java" contentType="text/html; charset=utf-8"
        pageEncoding="utf-8"%><%@include file="/WEB-INF/pages/commons/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <meta name="generator"
    content="HTML Tidy for HTML5 (experimental) for Windows https://github.com/w3c/tidy-html5/tree/c63cc39" />
    <%@include file="/WEB-INF/pages/commons/meta.jsp"%>
    <link href="${static_ctx}/static/css/lib/zTreeStyle/zTreeStyle.css" rel="stylesheet" type="text/css" media="all" />
    <link href="${static_ctx}/static/css/pagebar.css" rel="stylesheet" type="text/css" media="all" />
    <title>素材</title>
  </head>
  <body>
  <div class="mainIndex">
    <!-- left sidebar start -->
    <div class="mainConWrap">
      <div class="mainCon mainCon01">
        <div class="conNataWrap">
          <div class="conNata">
            <div class="nataSelect">
              <div class="nataHead">
                <h3 class="nataTitle">素材</h3>
                <div class="search">
                <input type="hidden" id="topic_name" value="${topic }" name="" /> 
                <input type="hidden" id="series_name" value="${series }" name="" /> 
                <input type="text" value="" name="" class="infoText" />
                <div class="BtnGray23">
                  <a href="javascript:void(0)" class="btnSave" id="btnSearch" name="btnSearch">
                    <span>搜索</span>
                  </a>
                </div></div>
              </div>
              <div class="nataList">
                <div class="ListBox">
                  <dl id="src" class="ListLine">
                    <dt>来源：</dt>
                    <dd class="current">全部</dd>
                    <dd>平台</dd>
                  </dl>
                  <dl id="format" class="ListLine">
                    <dt>格式：</dt>
                    <dd class="current">全部</dd>
                    <dd>PPT</dd>
                    <dd>WORD</dd>
                  </dl>
                  <dl id="topic" class="ListLine">
                    <dt>主题：</dt>
                    <dd class="current">全部</dd>
                    <dd>平台</dd>
                  </dl>
                  <dl id="series" class="ListLine">
                    <dt>专题：</dt>
                    <dd class="current">全部</dd>
                    <dd>PPT</dd>
                    <dd>WORD</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="nataDetail">
              <div class="nataFilter">
                <dl class="filter">
                  <dt>排序：</dt>
                  <dd>
                    <a id="ref" href="javascript:void(0);" class="sort" name="ref">引用数量</a>
                  </dd>
                  <dd>
                    <a id="fav" href="javascript:void(0);" class="sort" name="fav">收藏</a>
                  </dd>
                  <dd>
                    <a id="score" href="javascript:void(0);" class="sort" name="score">好评度</a>
                  </dd>
                </dl>
              </div>
              <div id="clip_list" class="nataSortList">
                <div id="resource_list" class="resource-list"></div>
                <div id="pagebar" class="pagebar"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script type="text/template" id="resource-tpl">
  {@each list as resource}
		<div class="sortListBox">
		<em class="ico-?{resource.resourceFormat} res-mag-ico"></em>
		<div class="sortList">
			<div class="sortTitle" data-id=?{resource.id} style="float:left;width:70%;height:24px;"><a  href="javascript:void(0);">??{resource.resourceName}</a></div>
			<div class="BtnWrap">
				<div class="BtnOrange24">
					<a data-id=?{resource.id} id="btnFav" class="btnSave" href="javascript:void(0)">收藏</a> &nbsp;&nbsp;
					<a data-id=?{resource.id} id="btnRef" class="btnSave" href="javascript:void(0)">引用</a>
				</div>
			</div>
			<div style="clear:both;"></div>
			<div class="sortCon">
				<div class="sortBox">
				<div class="stLine"> 
					<label>大小：</label>
					<div class="stInfo"><b>?{resource.fileSize|fileSizeFormat}</b></div>
				</div>
				 <div class="stLine">
					<label>来源：</label>
					<div class="stInfo">?{resource.src|srcCode}</div>
				</div>
				</div>
				<div class="sortBox">
				<div class="stLine"> 
					<label>收藏：</label>
					<div class="stInfo"><b>?{resource.fav}</b></div>
				</div>
				<div class="stLine">
					<label>提交人：</label>
					<div class="stInfo">?{resource.userName}</div>
				</div>
				</div>	
				<div class="sortBox">
				<div class="stLine"> 
					<label>下载：</label>
					<div class="stInfo"><b>?{resource.dnd}</b></div>
				</div>
				<div class="stLine">
					<label>好评：</label>
					<div class="stInfo">
					<div class="starIco">
						??{resource.score|formatscore}
					</div>	
					</div>
				</div>
				</div>	
				<div class="sortBox">
				<div class="stLine"> 
					<label>提交时间：</label>
					<div class="stInfo">??{resource.submitTime|timeFormat}</div>
				</div>
				</div>
			</div>
		</div>
	</div>
	{@/each}
	</script>
  <%@include file="review/reviewClip.jsp"%>
  <script type="text/javascript" src="${static_ctx}/static/js/lib/jquery.ztree.all-3.5.min.js"></script> 
  <script type="text/javascript" src="${static_ctx}/static/js/lib/jquery.pagebar.js"></script> 
  <script type="text/javascript" src="${static_ctx}/static/js/teacher/resource/clip.js"></script> 
  <script type="text/javascript">
	var whiteboard_host = '${param.url}';
	$(document).ready(function() {
		latte.teacher.clip.init();
	});
        
</script></body>
</html>
