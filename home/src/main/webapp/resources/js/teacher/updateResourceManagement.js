$(document).ready(function(){
	$(".category-detail-info").each(function(){
		var parentId = $(this).attr("id");
		var pid = parentId.substring(7,parentId.length);
		$("#parent_up_" + pid).bind("click", {id: "parent_" + pid}, upParentHandler);
		$("#parent_down_" + pid).bind("click", {id: "parent_" + pid}, downParantHandler);
		$("#parent_delete_" + pid).bind("click", {id: "parent_" + pid}, deleteParentHandler);
		refreshParentImg();
	});
	$("#newCategory").bind("click", addParent);
	$("#saveCategories").bind("click", save);
});

var upImgDisableSrc = "/static/img/teacher/resourceManagement/up_disable.png";
var downImgDisableSrc = "/static/img/teacher/resourceManagement/down_disable.png";

var upImgEnableSrc = "/static/img/teacher/resourceManagement/up.png";
var downImgEnableSrc = "/static/img/teacher/resourceManagement/down.png";

var parentClip = "<div class=\"category-detail-info\" id=\"parent_#replacement#\">" +
					"<div><input type=\"text\" class=\"category-input\" maxlength=\"30\" id=\"parent_input_#replacement#\"/></div>" +
					"<div class=\"up-category\"><a href=\"#\" id=\"parent_up_#replacement#\"><img src=\"#context#/static/img/teacher/resourceManagement/up.png\"></a></div>" +
					"<div class=\"down-category\"><a href=\"#\" id=\"parent_down_#replacement#\"><img src=\"#context#/static/img/teacher/resourceManagement/down.png\"></a></div>" +
					"<div class=\"delete-category\"><a href=\"#\" id=\"parent_delete_#replacement#\"><img src=\"#context#/static/img/teacher/resourceManagement/delete.png\"></a></div>" +
				"</div>";


function addChildHandler(e)
{
	var parentId = e.data.id;
	addChild(parentId);
}

function addParent()
{
	var maxParentIndex = 0;
	$("div[id^='parent_']").each(function(){
		var parentId = $(this).attr("id");
		var pid = parentId.substring(7,parentId.length);
		if( parseInt(pid) > maxParentIndex )
		{
			maxParentIndex = parseInt(pid);
		}
	});
	var target;
	var replacement = maxParentIndex + 1;
	
	if( $("div[id^='parent_']").size() == 0 )
	{
		target = $(".category-detail-title");
	}
	else
	{
		target = $("div .category-detail-info").last();
	}
	target.after(parentClip.replace(/\#replacement#/g,replacement).replace(/\#context#/g, $("#context").val()));
	$("#parent_up_" + replacement).bind("click", {id: "parent_" + replacement}, upParentHandler);
	$("#parent_down_" + replacement).bind("click", {id: "parent_" + replacement}, downParantHandler);
	$("#parent_delete_" + replacement).bind("click", {id: "parent_" + replacement}, deleteParentHandler);
	refreshParentImg();
}

function upParent(parentId)
{
	var target = $("#" + parentId);
	$("div[id^='parent_']").each(function(){
		var tempId = $(this).attr("id");
		if( tempId != parentId )
		{
			target = $(this);
		}
		else
		{
			return false;
		}
	});
	$("#" + parentId).insertBefore(target);
	
	refreshParentImg();
	
}

function upParentHandler(e)
{
	var parentId = e.data.id;
	upParent(parentId);
}

function downParant(parentId)
{
	var target = $("#" + parentId + " ~ div[id^='parent_']").first();
	$("#" + parentId).insertAfter(target);
	target = $("#" + parentId);
	var pid = parentId.substring(7,parentId.length);
	$("div[id^='child_" + pid + "_']").each(function(){
		$(this).insertAfter(target);
		target = $(this);
	});
	refreshParentImg();
}

function downParantHandler(e)
{
	var parentId = e.data.id;
	downParant(parentId);
}

function deleteParent(parentId)
{
	if( !confirm("删除分类会同时删除已归类的资源关系，确定吗？") )
	{
		return false;
	}
	$("#" + parentId).remove();
	refreshParentImg();
}

function deleteParentHandler(e)
{
	var parentId = e.data.id;
	deleteParent(parentId);
}

function save()
{
	var flag = true;
	$("input[id^='parent_input_']").each(function(){
		var val = $(this).val();
		if( val == null || val == '' )
		{
//			alert("请将所有分类名称填写完全");
			flag = false;
			return false;
		}
	});
	
	if( !flag )
	{
		alert("请将所有分类名称填写完全");
		return;
	}
	
	var itemsData = "[";
	var parents = $("input[id^='parent_input_']");
	var sequence = 1;
	parents.each(function(index){
		var inputId = $(this).attr("id");
		var pid = inputId.substring(13,inputId.length);
		var dbId;
		if( $("#ct_id_" + pid).size() == 0 )
		{
			dbId = 0;
		}
		else
		{
			dbId = $("#ct_id_" + pid).val();
		}
		var parentData = {"name":$(this).val(),"seq":sequence++,"category":1,id:dbId};
		itemsData += JSON.stringify(parentData) + ",";
	});
	
	itemsData = itemsData.substring(0, itemsData.length - 1) + "]";
	
	var url = $("#context").val() + "/teacher/resourceManagement/update";
	
	$.ajax({
		url: url,
		type: "post",
		data: itemsData,
		dataType: "json",
		contentType: 'application/json;charset=UTF-8',
		success: function(data){
			if( data.result == true )
			{
				alert("保存成功");
//				window.location.href = $("#context").val() + "/courseTemplate/view";
				return true;
			}
			else
			{
				alert("保持失败");
				return false;
			}
		}
	});
}

function doNothing()
{
}

function refreshParentImg()
{
	var parents = $("div[id^='parent_']");
	if( parents.size() == 0 )
	{
		return;
	}
	
	parents.each(function(){
		var parentId = $(this).attr("id");
		var upLink = $(this).find("a[id^='parent_up_']");
		upLink.unbind();
		upLink.bind("click",{id: parentId},upParentHandler);
		upLink.children().first().attr("src",$("#context").val() + upImgEnableSrc);
		var downLink = $(this).find("a[id^='parent_down_']");
		downLink.unbind();
		downLink.bind("click",{id: parentId},downParantHandler);
		downLink.children().first().attr("src",$("#context").val() + downImgEnableSrc);
	});
	
	var upDisable;
	var downDisable;
	upDisable = parents.first().find("a[id^='parent_up_']");
	upDisable.unbind();
	upDisable.children().first().attr("src",$("#context").val() + upImgDisableSrc);
		
	downDisable = parents.last().find("a[id^='parent_down_']");
	downDisable.unbind();
	downDisable.children().first().attr("src",$("#context").val() + downImgDisableSrc);
	
}

function cutstr(str,len) 
{ 
    var str_length = 0; 
    var str_len = 0; 
    str_cut = new String(); 
    str_len = str.length; 
    for(var i = 0; i < str_len; i++) 
    { 
        a = str.charAt(i); 
        str_length++; 
        if(escape(a).length > 4) 
        { 
            //中文字符的长度经编码之后大于4 
            str_length++; 
        } 
        str_cut = str_cut.concat(a); 
        if(str_length>=len) 
        { 
            str_cut = str_cut.concat("..."); 
            return str_cut; 
        } 
    } 
    //如果给定字符串小于指定长度，则返回源字符串； 
    if(str_length < len){ 
        return  str; 
    } 
}
