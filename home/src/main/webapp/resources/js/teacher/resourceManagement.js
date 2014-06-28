$(document).ready(function(){
	$("#parent_input_1").bind("change",refreshSelectOptions);
	$("#parent_addChild_1").bind("click", {id: "parent_1"}, addChildHandler);
	$("#parent_up_1 :first-child").attr("src",$("#context").val() + upImgDisableSrc);
	$("#parent_up_1").bind("click", doNothing);
	$("#parent_down_1 :first-child").attr("src",$("#context").val() + downImgDisableSrc);
	$("#parent_down_1").bind("click", doNothing);
	$("#parent_delete_1").bind("click", {id: "parent_1"}, deleteParentHandler);
	$("#newCategory").bind("click", addParent);
	$("#saveCategories").bind("click", save);
});

var upImgDisableSrc = "/static/img/teacher/resourceManagement/up_disable.png";
var downImgDisableSrc = "/static/img/teacher/resourceManagement/down_disable.png";

var upImgEnableSrc = "/static/img/teacher/resourceManagement/up.png";
var downImgEnableSrc = "/static/img/teacher/resourceManagement/down.png";

var childClip = "<div class=\"category-detail-info\" id=\"child_#replacement#\">" +
					"<div>" +
						"<div class=\"category-child\"><a href=\"#\"><img alt=\"\" src=\"#context#/static/img/teacher/resourceManagement/child.png\"></a></div>" +
						"<input type=\"text\" class=\"category-input-child\" maxlength=\"30\" id=\"child_input_#replacement#\"/>" +
					"</div>" +
					"<div class=\"add-category-blank\"></div>" +
					"<div class=\"up-category\"><a href=\"#\" id=\"child_up_#replacement#\"><img alt=\"\" src=\"#context#/static/img/teacher/resourceManagement/up.png\"></a></div>" +
					"<div class=\"down-category\"><a href=\"#\" id=\"child_down_#replacement#\"><img alt=\"\" src=\"#context#/static/img/teacher/resourceManagement/down.png\"></a></div>" +
					"<div class=\"delete-category\"><a href=\"#\" id=\"child_delete_#replacement#\"><img alt=\"\" src=\"#context#/static/img/teacher/resourceManagement/delete.png\"></a></div>" +
					"<div class=\"change-category\">" +
						"<select id=\"child_select_#replacement#\">" +
						"</select>" +
					"</div>" +
				"</div>";

var parentClip = "<div class=\"category-detail-info\" id=\"parent_#replacement#\">" +
					"<div><input type=\"text\" class=\"category-input\" maxlength=\"30\" id=\"parent_input_#replacement#\"/></div>" +
					"<div class=\"category-parent-blank\"></div>" +
					"<div class=\"add-category\"><a href=\"#\" id=\"parent_addChild_#replacement#\"><img src=\"#context#/static/img/teacher/resourceManagement/add.png\"></a></div>" +
					"<div class=\"up-category\"><a href=\"#\" id=\"parent_up_#replacement#\"><img src=\"#context#/static/img/teacher/resourceManagement/up.png\"></a></div>" +
					"<div class=\"down-category\"><a href=\"#\" id=\"parent_down_#replacement#\"><img src=\"#context#/static/img/teacher/resourceManagement/down.png\"></a></div>" +
					"<div class=\"delete-category\"><a href=\"#\" id=\"parent_delete_#replacement#\"><img src=\"#context#/static/img/teacher/resourceManagement/delete.png\"></a></div>" +
					"<div class=\"change-category-blank\"></div>" +
				"</div>";

function addChild(parentId)
{
	var pid = parentId.substring(7,parentId.length);
	var maxChildIndex = 0;
	var children = $("div[id^='child_" + pid + "_']");
	children.each(function(){
		var idString = $(this).attr("id");
		var cid = idString.substring(idString.lastIndexOf("_") + 1, idString.length);
		if( parseInt(cid) > maxChildIndex )
		{
			maxChildIndex = parseInt(cid);
		}
	});
	var target;
	var replacement = pid + "_" + (maxChildIndex + 1);
	if( children.size() == 0 )
	{
		target = $("#" + parentId);
	}
	else
	{
		target = $("#" + children.last().attr("id"));
	}
	
//	target.after(sectionClip.replace(/\#replacement#/g,replacement).replace("#context#", $("#context").val()));
//	refreshSectionTitles(chapterId);
//	$("#section_" + replacement + "_img").bind("click", {id: "section_" + replacement}, sectionImgHandler);

	target.after(childClip.replace(/\#replacement#/g,replacement).replace(/\#context#/g, $("#context").val()));
	refreshSelectOptions();
	$("#child_up_" + replacement).bind("click", {id: "child_" + replacement}, upChildHandler);
	$("#child_down_" + replacement).bind("click", {id: "child_" + replacement}, downChildHandler);
	$("#child_delete_" + replacement).bind("click", {id: "child_" + replacement}, deleteChildHandler);
//		"<select id=\"child_select_#replacement#\">" +
	refreshChildImg(parentId);
	//TODO 绑事件
}

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
	refreshSelectOptions();
	$("#parent_input_" + replacement).bind("change",refreshSelectOptions);
	$("#parent_addChild_" + replacement).bind("click", {id: "parent_" + replacement}, addChildHandler);
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
	target = $("#" + parentId);
	var pid = parentId.substring(7,parentId.length);
	$("div[id^='child_" + pid + "_']").each(function(){
		$(this).insertAfter(target);
//		target.after($(this));
		target = $(this);
	});
	
	refreshSelectOptions();
	refreshParentImg();
	
}

function upParentHandler(e)
{
	var parentId = e.data.id;
	upParent(parentId);
}

function upChild(childId)
{
	var target = $("#" + childId);
	var pid = childId.substring(6,childId.lastIndexOf("_"));
	$("div[id^='child_" + pid + "_']").each(function(){
		var tempId = $(this).attr("id");
		if( tempId != childId )
		{
			target = $(this);
		}
		else
		{
			return false;
		}
	});
	
	$("#" + childId).insertBefore(target);
	refreshChildImg("parent_" + pid);
}

function upChildHandler(e)
{
	var childId = e.data.id;
	upChild(childId);
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
	
	refreshSelectOptions();
	refreshParentImg();
}

function downParantHandler(e)
{
	var parentId = e.data.id;
	downParant(parentId);
}

function downChild(childId)
{
	var pid = childId.substring(6,childId.lastIndexOf("_"));
	var target = $("#" + childId + " ~ div[id^='child_" + pid + "_']").first();
	$("#" + childId).insertAfter(target);
	refreshChildImg("parent_" + pid);
}

function downChildHandler(e)
{
	var childId = e.data.id;
	downChild(childId);
}

function deleteParent(parentId)
{
	if( !confirm("删除上级分类会同时删除子分类，确定删除吗？") )
	{
		return;
	}
	
	$("#" + parentId).remove();
	var pid = parentId.substring(7,parentId.length);
	$("div[id^='child_" + pid + "_']").remove();
	refreshSelectOptions();
	refreshParentImg();
}

function deleteParentHandler(e)
{
	var parentId = e.data.id;
	deleteParent(parentId);
}

function deleteChild(childId)
{
	var pid = childId.substring(6,childId.lastIndexOf("_"));
	$("#" + childId).remove();
	refreshChildImg("parent_" + pid);
}

function deleteChildHandler(e)
{
	var childId = e.data.id;
	deleteChild(childId);
}

function moveChild(childId,parentId)
{
	
}

function save()
{
	$("input[id^='parent_input_'],input[id^='child_input_']").each(function(){
		var val = $(this).val();
		if( val == null || val == '' )
		{
			alert("请将所有分类名称填写完全");
			return false;
		}
	});
	
	var itemsData = "[";
	var parents = $("input[id^='parent_input_']");
	var sequence = 1;
	parents.each(function(index){
		var parentData = {"name":$(this).val(),"seq":sequence++,"category":1};
		itemsData += JSON.stringify(parentData) + ",";
		var idString = $(this).attr("id");
		var pid = idString.substring(13,idString.length);
		$("input[id^='child_input_" + pid +	"_']").each(function(index){
			var childData = {"name":$(this).val(),"seq":sequence++,"category":2};
			itemsData += JSON.stringify(childData) + ",";
		});
	});
	
	itemsData = itemsData.substring(0, itemsData.length - 1) + "]";
	
	var url = $("#context").val() + "/teacher/resourceManagement/add";
	
//	var data = {
//    	items: eval(itemsData)
//    };
	
	$.ajax({
		url: url,
		type: "post",
//		data: JSON.stringify(data),
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

function changeParent(childId,parentId)
{
	//TODO
//	var parent = $("#" + parentId);
	var child = $("#" + childId);
	addChild(parentId);
	var pid = parentId.substring(7,parentId.length);
	var cid = childId.substring(6, childId.length);
	var newChild = $("div[id^='child_" + pid + "_']").last();
	var inputVal = $("#child_input_" + cid).val();
	var newCid = newChild.attr("id").substring(6,newChild.attr("id").length);
	$("#child_input_" + newCid).val(inputVal);
	child.remove();
	refreshChildImg(parentId);
	var prePid = childId.substring(6,childId.lastIndexOf("_"));
	refreshChildImg("parent_" + prePid);
//	var target;
//	if( parent.children().size() == 0 )
//	{
//		target = parent;
//	}
//	else
//	{
//		target = parent.children().last();
//	}
//	
//	child.insertAfter(target);
	
}

function changeParentHandler(e)
{
	var parentId = $(e.currentTarget).children("option:selected").val();
	var selectId = $(e.currentTarget).attr("id");
	var cid = selectId.substring(13,selectId.length);
	changeParent("child_" + cid,parentId);
}

function refreshSelectOptions()
{
	var options = "";
	$("div[id^='parent_']").each(function(){
		var parentId = $(this).attr("id");
		var pid = parentId.substring(7,parentId.length);
		var parentVal = $("#parent_input_" + pid).val();
		var displayStr = cutstr(parentVal,20);
		if( displayStr != parentVal )
		{
			displayStr += "...";
		}
		options += "<option value='" + parentId + "'>" + displayStr + "</option>";
	});
	
	$("select[id^='child_select_']").each(function(){
		$(this).unbind();
		var selectId = $(this).attr("id");
		var spid = selectId.substring(13,selectId.lastIndexOf("_"));
//		var scid = selectId.substring(selectId.lastIndexOf("_") + 1, selectId.length)
		$(this).html(options);
		$("#" + selectId + " > option[value='parent_" + spid + "']").attr("selected","selected");
//		$(this).unbind();
		var cidStr = selectId.substring(13,selectId.length);
//		$(this).bind("change",{toPid: $(this).children("option:selected").val(),fromCid:"child_" + cidStr}, changeParentHandler);
		$(this).bind("change", changeParentHandler);
	});
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

function refreshChildImg(parentId)
{
	var pid = parentId.substring(7,parentId.length);
	var children = $("div[id^='child_" + pid + "_']");
	if( children.size() == 0 )
	{
		return;
	}
	
	children.each(function(){
		var childId = $(this).attr("id");
		var upLink = $(this).find("a[id^='child_up_']");
		upLink.unbind();
		upLink.bind("click",{id: childId},upChildHandler);
		upLink.children().first().attr("src",$("#context").val() + upImgEnableSrc);
		var downLink = $(this).find("a[id^='child_down_']");
		downLink.unbind();
		downLink.bind("click",{id: childId},downChildHandler);
		downLink.children().first().attr("src",$("#context").val() + downImgEnableSrc);
	});
	
	var upDisable;
	var downDisable;
	upDisable = children.first().find("a[id^='child_up_']");
	upDisable.unbind();
	upDisable.children().first().attr("src",$("#context").val() + upImgDisableSrc);
		
	downDisable = children.last().find("a[id^='child_down_']");
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
