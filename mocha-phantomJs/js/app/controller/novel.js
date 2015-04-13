/**
 * 小说控制器类
 * Created by jingdai on 2014/11/19.
 */
define(['./base','app/common'], function (Base,common) {
// define(['base','common'], function (Base,common) {
    function ctrl(html){
    	Base.call(this,html);
    };
    /*继承基础控制器*/
    ctrl.prototype = Object.create(Base.prototype);
    var ajaxRequest = function(url,data,callback,error){
    	var options = {
    		url:ctx+url+"?r="+new Date().getTime(),
    		data:data,
    		success: function(data){
    			if(data.errorCode == 3){//获取用户信息失败时，提示关注
    				shareSetting();
    			}
    			callback(data);
    		}
    	};
    	if(!!error){
    		options = $.extend({},options,{error: error});
    	}
    	common.ajax(options);
    },
    shareSetting = function(){
    	if(common.isShare == "true") return;
    	var url = window.location.href;
    	//阅读历史页 未取到用户信息 跳转至主页 提示关注
    	if(url.indexOf("history.jsp")>=0){
    		window.location.href = ctx + "pages/index.jsp?isShare=true";
    	}else{
    		//详情页 未取到信息 提示关注
    		if(url.indexOf("info.jsp") >= 0){
    			common.isShare = "true";
    			common.attention.show();
    			return;
    		}
    		// 听书、看书 发送阅读行为 未取到用户信息时 跳转至详情 并提示关注
    		//var bid= common.Request()["bid"];
    		//window.location.href = ctx + "pages/novel/info.jsp?bid="+ bid + "&isShare=true";
    	}    	
    },
    postRequest = function(url,data,callback,error){
    	var options = {
    		url: ctx+url,
    		data:data,
    		success: function(data){
    			if(data.errorCode == 3){
    				shareSetting();
    				return;
    			}
    			callback(data);
    		},
    		error :error
    	};
    	common.post(options);
    },
    requestUrl = {
    	toplist:"novel/getHomeNovelList.do",
    	categorylist: "novel/getNovelCategoryList.do",    	
    	novellist: "novel/getNovelListByTypeID.do",    	
    	searchlist: "novel/searchNovelInfo.do",   	
    	hotlist: "novel/getHotSearchInfo.do",  	
    	chapterlist: "novel/getChapterList.do", 
    	bookBrief: "novel/getBookBriefInfo.do",   	
    	bookDetail: "novel/getBookDetailInfo.do",  	
    	bookText: "novel/getText.do",  	
    	historylist: "user/getUserHistory.do",  	
    	deleteHistory: "user/delUserHistory.do",
    	bookInfoCount:"novel/bookInfoCount.do",
    	setAction:"novel/setAction.do",
    	historyRecord:"user/userHistoryRec.do",
    	bookmarklist:"user/getUserBookMark.do",
    	setBookmark:"user/addUserBookMark.do",
    	deleteBookmark:"user/delUserBookMark.do",
    	weixin:"pageSignature.do",
    	audioInfo:"novel/getAudioInfo.do",
    	sourceInfo:"novel/getAllSourceInfo.do"
    };
    
    /*请求首页小说列表*/
    ctrl.prototype.getTopList = function(data, callback) {   
       ajaxRequest(requestUrl["toplist"],data,callback);
    };
    
    /*请求小说分类*/
    ctrl.prototype.getCategoryList = function(data,callback){
    	ajaxRequest(requestUrl["categorylist"],data,callback);
    };
    
    /*请求某分类下小说列表*/
    ctrl.prototype.getNovelListByCategory = function(data,callback){
    	ajaxRequest(requestUrl["novellist"],data,callback);
    };
    
    /*请求搜索结果列表*/   
    ctrl.prototype.getSearchList = function(data,callback){
    	ajaxRequest(requestUrl["searchlist"],data,callback);
    };
    
    /*请求热门搜索列表*/   
    ctrl.prototype.getHotSearchList = function(data,callback){
    	ajaxRequest(requestUrl["hotlist"],data,callback);
    };
    
	/*请求小说章节信息*/   
    ctrl.prototype.getChapterList = function(data,callback){
    	ajaxRequest(requestUrl["chapterlist"],data,callback);
    };
	/*请求小说书籍信息*/    
    ctrl.prototype.getBookBriefInfo = function(data,callback){
    	ajaxRequest(requestUrl["bookBrief"],data,callback);
    };
    
    /*请求小说简介详情*/
    ctrl.prototype.getDetail = function(data,callback){
    	ajaxRequest(requestUrl["bookDetail"],data,callback);
    };
    
    /*请求小说正文*/
    ctrl.prototype.getText = function(data,callback,error){ 
    	ajaxRequest(requestUrl["bookText"], data, callback, error);
    };
    
    /*请求阅读历史*/
    ctrl.prototype.getHistoryList = function(data,callback){
    	ajaxRequest(requestUrl["historylist"],data,callback);
    };
    
    /*删除阅读历史*/
    ctrl.prototype.deleteHistory = function(data,callback,error){
    	postRequest(requestUrl["deleteHistory"], data, callback);
    };
    /*点赞*/
    ctrl.prototype.setLike = function(data,callback){
    	var param = { countName:"likeTimes", countAction:"add"};
    	postRequest(requestUrl["bookInfoCount"], $.extend({},param,data), callback);
    };
    /*增加阅读次数*/
    ctrl.prototype.setRead = function(data,callback){
    	var param = { countName:"readTimes", countAction:"add"};
    	postRequest(requestUrl["bookInfoCount"], $.extend({},param,data), callback);
    };
    /*提交用户阅读记录*/
    ctrl.prototype.setAction = function(data,callback){
    	postRequest(requestUrl["setAction"], data, callback);
    };
    /*提交用户阅读行为（听/看）记录*/
    ctrl.prototype.setHistory = function(data,callback){
    	postRequest(requestUrl["historyRecord"], data, callback);
    };
    
    /*请求书签列表*/
    ctrl.prototype.getBookmarkList = function(data,callback){
    	ajaxRequest(requestUrl["bookmarklist"],data,callback);
    };
    
    /*设置书签*/
    ctrl.prototype.setBookmark = function(data,callback){
    	postRequest(requestUrl["setBookmark"], data, callback);
    };
    
    /*删除书签*/
    ctrl.prototype.deleteBookmark = function(data,callback){
    	postRequest(requestUrl["deleteBookmark"], data, callback);
    };
    
    /*获取微信签名等参数*/
    ctrl.prototype.getWeixin = function(data,callback){
    	postRequest(requestUrl["weixin"], data, callback);
    };
    
    /*请求音频地址列表*/   
    ctrl.prototype.getAudioInfo = function(data,callback){
    	ajaxRequest(requestUrl["audioInfo"],data,callback);
    };
    
    /*请求所有源信息*/
    ctrl.prototype.getSourceInfo = function(data,callback){
    	ajaxRequest(requestUrl["sourceInfo"],data,callback);
    };
    
    return ctrl;
});