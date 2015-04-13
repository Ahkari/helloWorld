/**
 * 首页业务逻辑
 * Created by jingdai on 2014/11/19.
 */
define(function (require) {
    var common = require('app/common'),
    template = "<li class='clear ell' id='bid_<%bid%>'><a class='db font-gray' href='"+ctx+"pages/novel/info.jsp?bid=<%bid%>&isShare="+common.isShare+"'><img id='img_<%bid%>' class='img-cover fl' src='"+ctx+"imgs/cover-default.png' data-src='<%smallCoverLogo%>' onerror='this.src=\""+ctx+"imgs/cover-default.png\"' /><h3 class='font-black ell'><%bookName%></h3><p>作者：<%authorName%></p><p class='ell'><%bookIntro%></p><i class='ln-icon-normal icon-like'></i><%likeTimes%>&nbsp;<i class='ln-icon-normal icon-hits'></i><%readTimes%></a></li>",
   
    controller = require('./controller/novel'),
    novel = new controller(template);
    /*获取列表数据*/
    novel.getTopList({pageIndex: 1,pageSize: 10},function(data){
    	novel.setModel(data.result);
    	novel.render($("#novel_list"));
    	common.setCovers($("#novel_list"));
    },function(err){
    	novel.model = "加载数据失败，点击重试";
    });
       
    //键盘换行事件
    var keydown = function (ev){
    	var e = ev || window.event;
    	if(!!e.keyCode && e.keyCode == 13){
    		go2Search();
    	}else if(!!e.which && e.which == 13){
    		go2Search();
    	}
    },
    focus = function(){
    	if($(this).val() != ""){
			$(".icon-clear").show();
		}
    },
    //取消搜索
    cancelSearch = function (){
    	window.scrollTo(0,0);
    	
    	$(".ln-genre").toggle();
    	$(".search-wrap").toggle();
    	$(".ln-head").toggleClass("search");
    	
		$("#search").hide();
		$("#main").show();
		
		$("#search_list").hide();
		$("#novel_list").show();
		
		common.load.hide();
    },
    //重置搜索
    resetSearch = function (){
		if($("#search_input").val().trim()==""){
			$("#search").show();
			$("#main").hide();
			$(".icon-clear").hide();
			common.load.hide();
			
			getLastSearch();
		}else{ 
			$(".icon-clear").show();
		}
	},
	//清空搜索
	clearSearch = function(){
		$("#search_input").val("");
		resetSearch();
	},
	//绑定搜索历史点击事件
	bindHistoryClick = function(dom){
		dom.find(".search-item").bind("click",function(){
    		$("#search_input").val($(this).text());
    		$(".icon-clear").show();
    		go2Search();
    	});
	},
    //获取热门搜索
    getHotSearch = function(){
    	novel.getHotSearchList({dataCount:10},function(data){
    		var template = "<li class='search-item'><a href='javascript:'><%searchWord%></a></li>";
    		novel.setModel(data.result,template);
    		novel.render($("#hot_list"));
    		bindHistoryClick($("#hot_list"));
    	});
    },    
    //清除搜索历史
    clearLastSearch = function (){
    	common.cookie.clear("searchWord");
    	getLastSearch();
    },
    //获取最近搜索
    getLastSearch = function (){
    	var template = "<li class='search-item'><a href='javascript:'>{value}</li></a>",html="",
    	cookies = common.cookie.get("searchWord");
    	if(cookies.trim() == ""){
    		html = template.replace("{value}", "<span class='font-gray'>没有搜索历史记录</span>");
        	$("#last_list").html(html);
    	}else{
	    	var searchWords = cookies.split("|");
	    	for(var i= searchWords.length - 1;i >= 0;i--){
	    		if(searchWords[i] != ""){
	    			searchWords[i] = unescape(searchWords[i]);	
	    			html += template.replace("{value}",searchWords[i].replace(/</gm,"&lt;").replace(/>/gm,"&gt;"));
	    		}
			}
	    	html+="<li class='search-item tc clearHistory'><a class='font-gray' href='javascript:'>清除搜索历史</a></li>";

	    	$("#last_list").html(html);
	    	bindHistoryClick($("#last_list"));
    	}
    	$("#last_list .clearHistory").off("click").bind("click",clearLastSearch);
    },   
    
    //切换最近搜索、热门搜索
    toggleTab = function (){
    	if(!$(this).hasClass("selected")){    
			$("#nav_list .nav-li").toggleClass("selected");
			$(".ln-search-list").toggle();			
			$(".ln-search-list").toggleClass("current");
			if($("#last_list").hasClass("current")){
				getLastSearch();
			}
    	}
    },
    
    //显示推荐搜索
    toggleSearch = function (){
    	window.scrollTo(0,0);
    	
    	$(".ln-genre").toggle();
    	$(".search-wrap").toggle();
    	$(".list-wrap").toggle();
    	$(".ln-head").toggleClass("search");
    	
    	$("#search_input").val("");
    	$("#search_input").focus();
    	$(".icon-clear").hide();
    	    	

    	if($("#hot_list").children().length == 0){    		
    		getHotSearch();
    	}
    	if($("#last_list").hasClass("current")){
    		getLastSearch();
    	}    	
    },
    //搜索结果请求
    go2Search = function (){
    	if($("#search_input").val().trim()==""){
    		return;
    	}		
    	var param = {
			searchWord:$("#search_input").val().trim(),
			pageIndex: 1,
			pageSize: 10
    	};
    	var word = escape(param.searchWord);
		common.cookie.stack("searchWord",word,null,10);
    	novel.getSearchList(param,function(data){
    		//已取消搜索 或者 搜索文本框为空时，不显示搜索结果
    		if(!$(".ln-head").hasClass("search") || $("#search_input").val().trim()=="" ){
    			return;
    		}
    		$("#search_input").blur();
    		novel.setModel(data.result);
    		$("#search_list").empty();
    		if(novel.model == ""){
    			$("#search_list").prepend("<li class='font-gray nodata tc'>没有查询到数据</li>");
    			common.load.hide();
    		}else{    			
	    		novel.render($("#search_list"));
	    		common.setCovers($("#search_list"));
    		}
    		
    		$("#main").show();
    		$("#novel_list").hide();
    		$("#search_list").show();
    		$("#search").hide();    		
    	});
    },
    recordPage = function(){
 	      record_parm = {
 	   	       "type":"首页",
 	   	       "action":'show'
          };
 	      common.recordPage(record_parm);
    };
	/*绑定事件*/
    bindEvent = function(){    	
    	$("#placeholder").bind("click",toggleSearch);	//点击搜索
    	$("#search_btn").bind("click",cancelSearch);	//取消搜索
    	$(".icon-clear").bind("click",clearSearch);
    	$("#search_input").bind("keydown",keydown);	//按键事件
    	$("#search_input").bind("input",focus);
    	$("#search_input").bind("change",resetSearch).bind("keyup",resetSearch);	//搜索框清空，切换至最近、热门搜索
    	$("#nav_list .nav-li").bind("click",toggleTab);
    	$("#link").bind("click",function(){
    		 $("#link").attr("href",$("#link").attr("href")+common.isShare);
    	});
    	recordPage();//页面统计
    };
        
    /*页面加载成功*/
    $(function(){
    	//微信初始化
    	requestWeixinSignature(novel,"");
    	bindEvent();
	});
});