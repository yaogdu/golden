$(document).ready(function(){
	$("#hd_menu_system").attr("class","current");
	$("#lmenu_3").attr("class","current");
	$("#chapter_show_1").hide();
	$("#sectionLeft_show_1_1").hide();
	$("#sectionRight_show_1_1").hide();
	$("#ChapterLinks").hide();
	$("#SectionLinks").hide();
	$("#ttt").bind("click", {id: "chapter_1"}, add);
	$("#chapter_img_1").bind("click",{id: "1"}, showChapterMenu);
	$("#section_img_1_1").bind("click",{id: "1_1"}, showSectionMenu);
//	$("#chapter_img_1").bind("click", showChapterMenu);
	$("#ChapterLinks").bind("mouseleave", function () { $("#ChapterLinks").hide(); });
	$("#SectionLinks").bind("mouseleave", function () { $("#SectionLinks").hide(); });
//	var tempId = "chapter_3334";
//	alert(tempId.substring(8,tempId.length));
	
//	var sid = "324_123";
//	alert(sid.substring(0,sid.indexOf("_")));
	
//	var ee = "chapter_input_123";
//	alert(ee.substring(14,ee.length));
	
});
/*
var chapterClip2 =  "<li id=\"chapter_#cid#\" class=\"treeLi\">" + 
						"<div id=\"chapter_modify_#cid#\" class=\"tree1Node tree1Node02\">" + 
							"<div class=\"tree1Info\">" + 
							"<a href=\"javascript:void(0);\" class=\"tree1Aarrow\">&nbsp;</a>" + 
							"<span class=\"tree1NodeFolder\"></span>" + 
							"<div class=\"tree1NodeName\"><span id=\"chapter_title_#cid#\">第一章</span></div>" + 
							"<input id=\"chapter_input_#cid#\" type=\"text\"  value=\"\" class=\"inputText\" maxlength=\"30\"/>" + 
						    "<div class=\"BtnWrap\">" + 
						      	"<div class=\"BtnBlue23\">" + 
						       		"<a class=\"btnSave\" href=\"javascript:void(0)\" onclick=\"saveChapter(#cid#);\"><span>确定</span></a>" + 
						      	"</div>" + 
						      	"<div class=\"BtnGray23\">" + 
						       		"<a class=\"btnSave\" href=\"javascript:void(0)\" onclick=\"cancelSaveChapter(#cid#);\"><span>取消</span></a>" + 
						      	"</div>" + 
						    "</div>" + 
							"</div>" + 
						"</div>" + 
						"<div id=\"chapter_show_#cid#\" class=\"tree1Node\">" + 
							"<div class=\"tree1Info\">" + 
									"<a href=\"javascript:void(0);\" class=\"tree1Aarrow\">&nbsp;</a>" + 
									"<span class=\"tree1NodeFolder\"></span>" + 
								"<div class=\"tree1NodeName\"><span id=\"chapter_title_#cid#\">第一章</span><span id=\"chapter_input_value_#cid#\"></span></div>" + 
							"</div>" + 
							"<div class=\"treeShow\">" + 
							  	"<a id=\"chapter_img_#cid#\" href=\"javascript:void(0);\" class=\"showIco\" onclick=\"showChapterMenu(#cid#);\"></a>" + 
							"</div>" + 
						"</div>" + 
						"<div class=\"tree1Box\">" + 
							"<ul class=\"treeUl\">" + 
						  	"<li id=\"sectionLeft_#sid#\" class=\"treeLi\">" + 
							    "<div id=\"sectionLeft_modify_#sid#\" class=\"tree1Node tree1Node02\">" + 
							      	"<div class=\"tree1Info\">" + 
							      		"<span class=\"tree1NodeIndent\">" + 
							          		"<b class=\"tree1NodeLine3\"></b>" + 
							        	"</span>" + 
							        	"<a href=\"javascript:void(0);\" class=\"tree1Active\">&nbsp;</a>" + 
							        	"<span class=\"tree1NodeFolder\"></span>" + 
							        	"<div class=\"tree1NodeName\"><span id=\"sectionLeft_title_#sid#\">第一节</span></div>" + 
							        	"<input id=\"sectionLeft_input_#sid#\" type=\"text\" value=\"\" class=\"inputText\" maxlength=\"30\"/>" + 
								        "<div class=\"BtnWrap\">" + 
								          	"<div class=\"BtnBlue23\">" + 
								           		"<a class=\"btnSave\" href=\"javascript:void(0)\" onclick=\"saveSection('#sid#')\"><span>确定</span></a>" + 
								          	"</div>" + 
								          	"<div class=\"BtnGray23\">" + 
								           	"<a class=\"btnSave\" href=\"javascript:void(0)\" onclick=\"cancelSaveSection('#sid#')\"><span>取消</span></a>" + 
								          	"</div>" + 
								        "</div>" + 
							      	"</div>" + 
							    "</div>" + 
							    "<div id=\"sectionLeft_show_#sid#\" class=\"tree1Node\">" + 
							     	"<div class=\"tree1Info\">" + 
							       	"<span class=\"tree1NodeIndent\">" + 
							         	"<b class=\"tree1NodeLine3\"></b>" + 
							       	"</span>" + 
							       	"<a id=\"section_img_#sid#\" href=\"javascript:void(0);\" class=\"showIco\" onclick=\"showSectionMenu('#sid#');\">&nbsp;</a>" + 
							       	"<span class=\"tree1NodeFolder\"></span>" + 
							       	"<div class=\"tree1NodeName\"><span id=\"sectionLeft_title_#sid#\">第一节</span><span id=\"section_input_value_#sid#\"></span></div>" + 
							     	"</div>" + 
							   "</div>" + 
						  	"</li>" + 
						"</ul>" + 
						"<ul class=\"treeUl treeUl01\">" + 
						  	"<li id=\"sectionRight_#sid#\" class=\"treeLi\">" + 
							    "<div id=\"sectionRight_empty_#sid#\" class=\"tree1Node\">" + 
							    "</div>" + 
							    "<div id=\"sectionRight_show_#sid#\" class=\"tree1Node\">" + 
						          	"<div class=\"tree1Info\">" + 
						            	"<a class=\"treeIco\" href=\"javascript:void(0);\"></a>" + 
						            	"<span class=\"tree1NodeFolder\"></span>" + 
						            	"<a id=\"sectionRight_r_#sid#\" class=\"tree1NodeName\" href=\"javascript:void(0);\"></a>" + 
						          	"</div>" + 
						    	"</div>" + 
						  	"</li>" + 
						"</ul>" + 
						"</div>" + 
						"</li>";
*/
var chapterClip =  "<li id=\"chapter_#cid#\" class=\"treeLi\">" + 

						"<div id=\"chapter_modify_#cid#\" class=\"tree1Node tree1Node02\">" + 
							"<div class=\"tree1Info\">" + 
							"<a href=\"javascript:void(0);\" class=\"tree1Aarrow\">&nbsp;</a>" + 
							"<span class=\"tree1NodeFolder\"></span>" + 
							"<div class=\"tree1NodeName\"><span id=\"chapter_title_#cid#\">第一章</span></div>" + 
							"<input id=\"chapter_input_#cid#\" type=\"text\"  value=\"请填写\" class=\"inputText\" maxlength=\"30\"/>" + 
						    "<div class=\"BtnWrap\">" + 
						      	"<div class=\"BtnBlue23\">" + 
						       		"<a class=\"btnSave\" href=\"javascript:void(0)\" onclick=\"saveChapter('#cid#');\"><span>确定</span></a>" + 
						      	"</div>" + 
						      	"<div class=\"BtnGray23\">" + 
						       		"<a class=\"btnSave\" href=\"javascript:void(0)\" onclick=\"cancelSaveChapter('#cid#');\"><span>取消</span></a>" + 
						      	"</div>" + 
						    "</div>" + 
							"</div>" + 
						"</div>" + 
						
						"<div id=\"chapter_show_#cid#\" class=\"tree1Node\">" + 
							"<div class=\"tree1Info\">" + 
									"<a href=\"javascript:void(0);\" class=\"tree1Aarrow\">&nbsp;</a>" + 
									"<span class=\"tree1NodeFolder\"></span>" + 
								"<div class=\"tree1NodeName\"><span id=\"chapter_title2_#cid#\">第一章</span>&nbsp;<span id=\"chapter_input_value_#cid#\">请填写</span></div>" + 
							"</div>" + 
							"<div class=\"treeShow\">" + 
							  	"<a id=\"chapter_img_#cid#\" href=\"javascript:void(0);\" class=\"showIco\"></a>" + 
							"</div>" + 
						"</div>" + 
						
						"<div class=\"tree1Box\">" + 
							"<ul id=\"lefts_#cid#\" class=\"treeUl\">" + 
						  	
							"</ul>" + 
							"<ul id=\"rights_#cid#\" class=\"treeUl treeUl01\">" + 
							  	
							"</ul>" + 
						"</div>" + 
					"</li>";



var sectionLeftClip =  "<li id=\"sectionLeft_#sid#\" class=\"treeLi\">" + 

							"<div id=\"sectionLeft_modify_#sid#\" class=\"tree1Node tree1Node02\">" + 
								"<div class=\"tree1Info\">" + 
									"<span class=\"tree1NodeIndent\">" + 
							  		"<b class=\"tree1NodeLine3\"></b>" + 
									"</span>" + 
									"<a href=\"javascript:void(0);\" class=\"tree1Active\">&nbsp;</a>" + 
									"<span class=\"tree1NodeFolder\"></span>" + 
									"<div class=\"tree1NodeName\"><span id=\"sectionLeft_title_#sid#\">第一节</span>&nbsp;</div>" + 
									"<input id=\"sectionLeft_input_#sid#\" type=\"text\" value=\"请填写\" class=\"inputText\" maxlength=\"30\"/>" + 
								    "<div class=\"BtnWrap\">" + 
								      	"<div class=\"BtnBlue23\">" + 
								       		"<a class=\"btnSave\" href=\"javascript:void(0)\" onclick=\"saveSection('#sid#')\"><span>确定</span></a>" + 
								      	"</div>" + 
								      	"<div class=\"BtnGray23\">" + 
								       	"<a class=\"btnSave\" href=\"javascript:void(0)\" onclick=\"cancelSaveSection('#sid#')\"><span>取消</span></a>" + 
								      	"</div>" + 
								    "</div>" + 
								"</div>" + 
							"</div>" + 
						
							"<div id=\"sectionLeft_show_#sid#\" class=\"tree1Node\">" + 
								"<div class=\"tree1Info\">" + 
									"<span class=\"tree1NodeIndent\">" + 
								 	"<b class=\"tree1NodeLine3\"></b>" + 
									"</span>" + 
									"<a href=\"javascript:void(0);\" class=\"showIco\" >&nbsp;</a>" + 
									"<span class=\"tree1NodeFolder\">&nbsp;</span>" + 
									"<div class=\"tree1NodeName\"><span id=\"sectionLeft_title2_#sid#\">第一节</span>&nbsp;<span id=\"section_input_value_#sid#\">请填写</span></div>" + 
								"</div>" + 
								"<div class=\"treeShow\">" +
                            		"<a class=\"showIco\" id=\"section_img_#sid#\" href=\"javascript:void(0);\"></a>" +
                            	"</div>" +
							"</div>" + 
						"</li>";

var sectionRightClip = "<li id=\"sectionRight_#sid#\" class=\"treeLi\">" + 

							"<div id=\"sectionRight_empty_#sid#\" class=\"tree1Node\">" + 
							"</div>" + 
							
							"<div id=\"sectionRight_show_#sid#\" class=\"tree1Node\">" + 
							  	"<div class=\"tree1Info\">" + 
							    	"<a class=\"treeIco\" href=\"javascript:void(0);\"></a>" + 
							    	"<span class=\"tree1NodeFolder\"></span>" + 
							    	"<a id=\"sectionRight_r_#sid#\" class=\"tree1NodeName\" href=\"javascript:void(0);\" target=\"_blank\"></a>" + 
							  	"</div>" + 
							"</div>" + 
							
						"</li>";

function add(e)
{
	var left = $(this).position().left;
	var top = $(this).position().top;
	
//	var chapter = chapterClip2.replace(/\#cid#/g,"2");
//	$("#chapter_base").after(chapter);
	$("#ChapterLinks").css("position","absolute");
	$("#ChapterLinks").css("left",left+20);
	$("#ChapterLinks").css("top",top);
	$("#ChapterLinks").show();
	
	console.log($("#ChapterLinks").offset().left);
	console.log($("#ChapterLinks").offset().top);
	console.log($("#ChapterLinks").position().left);
	console.log($("#ChapterLinks").position().top);
	
}

function add2()
{
	var sectionLeft = sectionLeftClip.replace(/\#sid#/g,"2_1");
	$("#lefts_2").append(sectionLeft);
	var sectionRight = sectionRightClip.replace(/\#sid#/g,"2_1");
	$("#rights_2").append(sectionRight);
}

function add3()
{
	$("#aaa").show();
}

function Chinese(num)  //将阿拉伯数字翻译成中文的大写数字
{
    var AA = new Array("零","一","二","三","四","五","六","七","八","九");
    var BB = new Array("","十","百","千","万","亿","点","");
   
    var a = (""+ num).replace(/(^0*)/g, "").split("."), k = 0, re = "";

    for(var i=a[0].length-1; i>=0; i--)
    {
        switch(k)
        {
            case 0 : re = BB[7] + re; break;
            case 4 : if(!new RegExp("0{4}//d{"+ (a[0].length-i-1) +"}$").test(a[0]))
                     re = BB[4] + re; break;
            case 8 : re = BB[5] + re; BB[7] = BB[5]; k = 0; break;
        }
        if(k%4 == 2 && a[0].charAt(i+2) != 0 && a[0].charAt(i+1) == 0) re = AA[0] + re;
        if(a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k%4] + re; k++;
    }

    if(a.length>1) //加上小数部分(如果有小数部分)
    {
        re += BB[6];
        for(var i=0; i<a[1].length; i++) re += AA[a[1].charAt(i)];
    }
    
    if( re.indexOf("一十") == 0 )
    {
    	re = re.replace("一十","十");
    }
    
    return re;
}

function refreshChapterTitles()
{
	var spans = $("span[id^='chapter_title_']");
	spans.each(function(index){
		$(this).html("第" + Chinese(index + 1) +"章");
	});
	var spans2 = $("span[id^='chapter_title2_']");
	spans2.each(function(index){
		$(this).html("第" + Chinese(index + 1) +"章");
	});
}

function refreshSectionTitles(cid)
{
	var spans = $("span[id^='sectionLeft_title_" + cid + "_']");
	spans.each(function(index){
		$(this).html("第" + Chinese(index + 1) +"节");
	});
	var spans2 = $("span[id^='sectionLeft_title2_" + cid + "_']");
	spans2.each(function(index){
		$(this).html("第" + Chinese(index + 1) +"节");
	});
}

function showChapterMenu(e,cid)
{
	var left = $(this).position().left;
	var top = $(this).position().top;
	console.log(left);
	console.log(top);
//	console.log(e.pageX);
//	console.log(e.pageY);
	$("#ChapterLinks").css("position","absolute");
	$("#ChapterLinks").css("left",left + 5);
	$("#ChapterLinks").css("top",top + 5);
	$("#ChapterLinks").show();
	
	console.log($("#ChapterLinks").offset().left);
	console.log($("#ChapterLinks").offset().top);
	console.log($("#ChapterLinks").position().left);
	console.log($("#ChapterLinks").position().top);
	
	$("#addChildSectionLink").unbind();
	$("#addChapterPreviousLink").unbind();
	$("#addChapterNextLink").unbind();
	$("#deleteChapterLink").unbind();
	$("#renameChapterLink").unbind();
	
	$("#addChildSectionLink").bind("click", {id: e.data.id}, addChildSectionHandler);
	$("#addChapterPreviousLink").bind("click", {id: e.data.id}, addChapterPreviousHandler);
	$("#addChapterNextLink").bind("click", {id: e.data.id}, addChapterNextHandler);
	$("#deleteChapterLink").bind("click", {id: e.data.id}, deleteChapterHandler);
	$("#renameChapterLink").bind("click", {id: e.data.id}, renameChapterHandler);
}

function showSectionMenu(e,sid)
{
	var left = $(this).position().left;
	var top = $(this).position().top;
	
	$("#SectionLinks").css("position","absolute");
	$("#SectionLinks").css("left",left+20);
	$("#SectionLinks").css("top",top);
	$("#SectionLinks").show();
	
	$("#addSectionPreviousLink").unbind();
	$("#addSectionNextLink").unbind();
	$("#deleteSectionLink").unbind();
	$("#renameSectionLink").unbind();
	
	$("#addSectionPreviousLink").bind("click", {id: e.data.id}, addSectionPreviousHandler);
	$("#addSectionNextLink").bind("click", {id: e.data.id}, addSectionNextHandler);
	$("#deleteSectionLink").bind("click", {id: e.data.id}, deleteSectionHandler);
	$("#renameSectionLink").bind("click", {id: e.data.id}, renameSectionHandler);
}

function addChapterPrevious(cid)
{
	var maxChapterIndex = 1;
	var chapters = $("li[id^='chapter_']");
	chapters.each(function(){
		var tempId = $(this).attr("id");
		if( parseInt(tempId.substring(8,tempId.length)) > maxChapterIndex )
		{
			maxChapterIndex = parseInt(tempId.substring(8,tempId.length));
		}
	});
	var target = $("#chapter_" + cid);
	var replacement = maxChapterIndex + 1;
	target.before(chapterClip.replace(/\#cid#/g,replacement));
	$("#chapter_show_" + replacement).hide();
	$("#chapter_img_" + replacement).bind("click",{id: replacement}, showChapterMenu);
	refreshChapterTitles();
}

function addChapterPreviousHandler(e)
{
	var cid = e.data.id;
	addChapterPrevious(cid);
	$("#ChapterLinks").hide();
}

function addChapterNext(cid)
{
	var maxChapterIndex = 1;
	var chapters = $("li[id^='chapter_']");
	chapters.each(function(){
		var tempId = $(this).attr("id");
		if( parseInt(tempId.substring(8,tempId.length)) > maxChapterIndex )
		{
			maxChapterIndex = parseInt(tempId.substring(8,tempId.length));
		}
	});
	var replacement = maxChapterIndex + 1;
	$("#chapter_" + cid).after(chapterClip.replace(/\#cid#/g,replacement));
	$("#chapter_show_" + replacement).hide();
	$("#chapter_img_" + replacement).bind("click",{id: replacement}, showChapterMenu);
	refreshChapterTitles();
}

function addChapterNextHandler(e)
{
	var cid = e.data.id;
	addChapterNext(cid);
	$("#ChapterLinks").hide();
}

function addChildSection(cid)
{
	var maxSectionIndex = 1;
	var sections = $("li[id^='sectionLeft_" + cid + "_']");
	sections.each(function(){
		var sectionId = $(this).attr("id");
		if( parseInt(sectionId.substring(sectionId.lastIndexOf("_") + 1, sectionId.length)) > maxSectionIndex )
		{
			maxSectionIndex = parseInt(sectionId.substring(sectionId.lastIndexOf("_") + 1, sectionId.length));
		}
	});
	var replacement = cid + "_" + (maxSectionIndex + 1);
	
	if( sections.size() == 0 )
	{
		$("#lefts_" + cid).append(sectionLeftClip.replace(/\#sid#/g,replacement));
		$("#sectionLeft_show_" + replacement).hide();
		$("#rights_" + cid).append(sectionRightClip.replace(/\#sid#/g,replacement));
		$("#sectionRight_show_" + replacement).hide();
	}
	else
	{
		$("li[id^='sectionLeft_" + cid + "_']").last().after(sectionLeftClip.replace(/\#sid#/g,replacement));
		$("#sectionLeft_show_" + replacement).hide();
		$("li[id^='sectionRight_" + cid + "_']").last().after(sectionRightClip.replace(/\#sid#/g,replacement));
		$("#sectionRight_show_" + replacement).hide();
	}
	
	$("#section_img_" + replacement).bind("click",{id: replacement}, showSectionMenu);
	refreshSectionTitles(cid);
}

function addChildSectionHandler(e)
{
	var cid = e.data.id;
	addChildSection(cid);
	$("#ChapterLinks").hide();
}

function deleteChapter(cid)
{
	var chapters = $("li[id^='chapter_']");
	if( chapters.size() <= 1 )
	{
		util.dialog.messageDialog('至少保留一章');
		return;
	}
	
	art.dialog({
		lock: true,
	    opacity: 0.5,	// 透明度
		width:240,
		height:120,
		top : 200,
        id : "delete_dialog",
        title : '确认删除',
        content : '<div>删除章会删除该章下面的节，确定吗？</div>',
        okValue : '确定',
        ok : function() {
        	$("#chapter_" + cid).remove();
        	refreshChapterTitles();
        },
        cancelValue : '返回',
        cancel : function() {
        },
        init: function() {
            $("a.aui_close").remove();
        },
        esc: false
    });
}

function deleteChapterHandler(e)
{
	var cid = e.data.id;
	deleteChapter(cid);
	$("#ChapterLinks").hide();
}

function renameChapter(cid)
{
	
	var value = $.trim($("#chapter_input_value_" + cid).html());
	$("#chapter_input_" + cid).val(value);
	$("#chapter_show_" + cid).hide();
	$("#chapter_modify_" + cid).show();
}

function renameChapterHandler(e)
{
	var cid = e.data.id;
	renameChapter(cid);
	$("#ChapterLinks").hide();
}

function addSectionPrevious(sid)
{
	var cid = sid.substring(0,sid.indexOf("_"));
	var maxSectionIndex = 1;
	var sections = $("li[id^='sectionLeft_" + cid + "']");
	sections.each(function(){
		var ssId = $(this).attr("id");
		if( parseInt(ssId.substring(ssId.lastIndexOf("_") + 1, ssId.length)) > maxSectionIndex )
		{
			maxSectionIndex = parseInt(ssId.substring(ssId.lastIndexOf("_") + 1, ssId.length));
		}
	});
	var replacement = cid + "_" + (maxSectionIndex + 1);
	$("#sectionLeft_" + sid).before(sectionLeftClip.replace(/\#sid#/g,replacement));
	$("#sectionLeft_show_" + replacement).hide();
	$("#sectionRight_" + sid).before(sectionRightClip.replace(/\#sid#/g,replacement));
	$("#sectionRight_show_" + replacement).hide();
	$("#section_img_" + replacement).bind("click",{id: replacement}, showSectionMenu);
	refreshSectionTitles(cid);
}

function addSectionPreviousHandler(e)
{
	var sid = e.data.id;
	addSectionPrevious(sid);
	$("#SectionLinks").hide();
}

function addSectionNext(sid)
{
	var cid = sid.substring(0,sid.indexOf("_"));
	var maxSectionIndex = 1;
	var sections = $("li[id^='sectionLeft_" + cid + "']");
	sections.each(function(){
		var ssId = $(this).attr("id");
		if( parseInt(ssId.substring(ssId.lastIndexOf("_") + 1, ssId.length)) > maxSectionIndex )
		{
			maxSectionIndex = parseInt(ssId.substring(ssId.lastIndexOf("_") + 1, ssId.length));
		}
	});
	
	var replacement = cid + "_" + (maxSectionIndex + 1);
	$("#sectionLeft_" + sid).after(sectionLeftClip.replace(/\#sid#/g,replacement));
	$("#sectionLeft_show_" + replacement).hide();
	$("#sectionRight_" + sid).after(sectionRightClip.replace(/\#sid#/g,replacement));
	$("#sectionRight_show_" + replacement).hide();
	$("#section_img_" + replacement).bind("click",{id: replacement}, showSectionMenu);
	refreshSectionTitles(cid);
}

function addSectionNextHandler(e)
{
	var sid = e.data.id;
	addSectionNext(sid);
	$("#SectionLinks").hide();
}

function deleteSection(sid)
{
	art.dialog({
		lock: true,
	    opacity: 0.5,	// 透明度
		width:240,
		height:120,
		top : 200,
        id : "delete_dialog",
        title : '确认删除',
        content : '<div>确认删除该节？</div>',
        okValue : '确定',
        ok : function() {
        	$("#sectionLeft_" + sid).remove();
        	$("#sectionRight_" + sid).remove();
        	var cid = sid.substring(0,sid.indexOf("_"));
        	refreshSectionTitles(cid);
        },
        cancelValue : '返回',
        cancel : function() {
        },
        init: function() {
            $("a.aui_close").remove();
        },
        esc: false
    });
}

function deleteSectionHandler(e)
{
	var sid = e.data.id;
	deleteSection(sid);
	$("#SectionLinks").hide();
}

function renameSection(sid)
{
	var value = $.trim($("#section_input_value_" + sid).html());
	$("#section_input_" + sid).val(value);
	$("#sectionLeft_show_" + sid).hide();
	$("#sectionLeft_modify_" + sid).show();
}

function renameSectionHandler(e)
{
	var sid = e.data.id;
	renameSection(sid);
	$("#SectionLinks").hide();
}

function saveTemplate()
{
	if( $("div:visible[id^='sectionLeft_modify_']").size() > 0 
			||  $("div:visible[id^='chapter_modify_']").size() > 0 )
	{
		util.dialog.messageDialog('请将未填完的章节信息填写完毕或者取消编辑');
		return false;
	}
	
	var itemsData = "[";
	var chapters = $("input[id^='chapter_input_']");
	var sequence = 1;
	chapters.each(function(index){
		var chapterData = {"name":$(this).val(),"seq":sequence++,"category":1,"courseTemplateId":$("#courseTemplateId").val()};
		itemsData += JSON.stringify(chapterData) + ",";
		var idString = $(this).attr("id");
		var cid = idString.substring(14,idString.length);
		$("input[id^='sectionLeft_input_" + cid + "_']").each(function(index){
			var sectionData = {"name":$(this).val(),"seq":sequence++,"category":2,"courseTemplateId":$("#courseTemplateId").val()};
			itemsData += JSON.stringify(sectionData) + ",";
		});
	});
	
	itemsData = itemsData.substring(0, itemsData.length - 1) + "]";
	
	var url = $("#context").val() + "/school/ct/add";
	
	
	
	art.dialog({
		lock: true,
	    opacity: 0.5,	// 透明度
		width:240,
		height:120,
		top : 200,
        id : "save_dialog",
        title : '确认取消',
        content : '<div>确认已设置完成？</br><input id="chk" type="checkbox" value="1"/>启用模板</div>',
        okValue : '确定',
        ok : function() {
        	var data = {
        		id: $("#courseTemplateId").val(),
        		status: document.getElementById("chk").checked?1:2,
    	    	items: eval(itemsData)
    	    };
        	$.ajax({
        		url: url,
        		type: "post",
        		data: JSON.stringify(data),
        		dataType: "json",
        		contentType: 'application/json;charset=UTF-8',
        		success: function(data){
        			if( data.result == true )
        			{
        				util.dialog.messageAndRelocation('设置完成！',$("#context").val() + "/school/ct/toListPage");
        				return true;
        			}
        			else
        			{
        				util.dialog.messageDialog(data.message);
        				return false;
        			}
        		},
        		error: function(XMLHttpRequest, textStatus){
        			util.dialog.messageDialog("请求异常：" + XMLHttpRequest.statusText + "|" 
        					+ XMLHttpRequest.status + "。请稍后重试或者联系技术支持。");
        			return false;
        		}
        	});
        },
        cancelValue : '取消',
        cancel : function() {
        },
        init: function() {
            $("a.aui_close").remove();
        },
        esc: false
    });
}

function saveChapter(cid)
{
	var value = $.trim($("#chapter_input_" + cid).val());
	if( value == null || value == '' )
	{
		util.dialog.messageDialog('章的名称不能为空');
		return;
	}
	$("#chapter_show_" + cid).show();
	$("#chapter_modify_" + cid).hide();
	$("#chapter_input_value_" + cid).html(value);
}

function cancelSaveChapter(cid)
{
	$("#chapter_show_" + cid).show();
	$("#chapter_modify_" + cid).hide();
	$("#chapter_input_" + cid).val($("#chapter_input_value_" + cid).html());
}

function saveSection(sid)
{
	var value = $.trim($("#sectionLeft_input_" + sid).val());
	if( value == null || value == '' )
	{
		util.dialog.messageDialog('节的名称不能为空');
		return;
	}
	$("#sectionLeft_show_" + sid).show();
	$("#sectionLeft_modify_" + sid).hide();
	$("#section_input_value_" + sid).html(value);
	
	$.ajax({
		url: $("#context").val() + "/school/data/findSingleRecommend?resourceName=" + encodeURI(encodeURI(value)),
		type: "post",
		dataType: "json",
		contentType: 'application/json;charset=UTF-8',
		success: function(data){
			if( data.result != 0 )
			{
				$("#sectionRight_empty_" + sid).hide();
				$("#sectionRight_show_" + sid).show();
				$("#sectionRight_r_" + sid).html(value);
				$("#sectionRight_r_" + sid).attr("href",data.url);
				return true;
			}
			else
			{
				$("#sectionRight_empty_" + sid).show();
				$("#sectionRight_show_" + sid).hide();
				return false;
			}
		}
	});
}

function cancelSaveSection(sid)
{
	$("#sectionLeft_show_" + sid).show();
	$("#sectionLeft_modify_" + sid).hide();
	$("#sectionLeft_input_" + sid).val($("#section_input_value_" + sid).html());
}

function back()
{
	art.dialog({
		lock: true,
	    opacity: 0.5,	// 透明度
		width:240,
		height:120,
		top : 200,
        id : "back_dialog",
        title : '确认取消',
        content : '<div>确认取消此次设置？',
        okValue : '确定',
        ok : function() {
        	window.location.href = $("#context").val() + "/school/ct/toListPage";
        },
        cancelValue : '取消',
        cancel : function() {
        },
        init: function() {
            $("a.aui_close").remove();
        },
        esc: false
    });
}
