/**
 * 公共方法对象
 * Created by jingdai on 2014/11/19.
 */
define(['zepto'],function(){     
    // 参数
    var _params = {
        ajaxDefalut: {
            type: "get",
            error: function(request, errorType, error) {
            	common.load.hide();
                window.console.log && window.console.log(request + "," + errorType + "," + error);
            },
            dataType: "json",
            timeout: 30000,
            contentType: 'application/json',
            beforeSend: function(request) {},
            complete: function() {},
            success: function(data) {}
        }
    },
        common = {
    		isShare: false,
    		attention: {
    			isExist: false,
    			show: function(){
    				this.isExist = true;
    				var html = "<div class='ln-attention'><div class='desc'><i class='icon-logo'></i><h4>用微信看书、听书</h4><p>点击关注，下次接着阅读</p></div><a href='http://mp.weixin.qq.com/s?__biz=MzA5NzA1MTY3NQ==&mid=201999638&idx=1&sn=d9f9972f72ffa2aafaa6c2066fee8599#rd' class='fr ln-btn-min tc'>关注</a></div>";
    				$("body").prepend(html);
    			},
    			tips: function(){
    				if($("body").find("#att_tips").length!=0){
    					$("#att_tips").show();
    				}else{
	    				var html = "<div id='att_tips' class='attention-tips'></div>";
	    				$("body").prepend($(html).bind("click",function(){
	    					$(this).hide();
	    				}));    					
    				}
    			}
    		},
            // $.ajax封装
            ajax: function (options) {
                var option = $.extend({}, _params.ajaxDefalut,options);
            	if(option.type == "get"){
            		this.error.hide();
                    this.load.show();
            	}
                $.ajax(option);
            },
            post: function(options){
            	$.ajaxSettings.error = options.error ? options.error : function(err){
            		console.log(err.statusText);
            	};
            	$.post(options.url,options.data,options.success);
            },
            template: {
                reg: new RegExp(/<%(\w+)%>*/gm),
                set: function(data,html){
                	//模板添加三元运算(true?1:2)
                	html = html.replace(/<%(\w+)\?(\w+|[\u4E00-\u9FA5]+|\s):(\w+|[\u4E00-\u9FA5]+|\s)%>*/gm,function(match,$1,$2,$3){
                		if(!!data[$1]){
                			return $2;
                		}
                		return $3;
                	});
                   return html.replace(this.reg,function(match,$1){
                	   if(data[$1] != void 0){
                		   if(typeof(data[$1]) == "string")
                			   return data[$1].replace(/<script>/gm,"&lt;script&gt;");//过滤数据内容含标签符号<、>
                		   return data[$1];
                	   }
                        return "";
                    });
                }
            },
            alert: (function(){
            	var _id = "tips_"+new Date().getTime(),
            	_text = "提示文字",
            	$load = _id ? $("#" + _id) : $("#tips_"+new Date().getTime());
            	return function(text){
            		var _selector = "#" + _id;
            		if($("body").find(_selector).length == 0){
            			var txt = !!text?text: _text;
            			var load = "<div id=" + _id + " class='ln-loading ln-alert tc'><span>" + txt + "</span></div>";
            			$("body").prepend(load);
            			$load = $(_selector);
            		}else{
            			$load.find("span").html(text);
            		}
            		$load.show();
            		setTimeout(function(){
            			$load.hide();
            		},1500);
            	};
            })(),
            confirm: function(text,okFun,cancelFun){
            	var _text = !!text?text:"确定吗？",
    			html = "<div id='btn_confirm' class='ln-loading ln-confirm tc'><p>"+_text+"</p><div class='btns-wrap'><a id='btn_ok' class='ln-btn listen' href='javascript:'>确定</a><a id='btn_cancel' class='ln-btn read' href='javascript:'>取消</a></div></div>";
            	$("body").prepend(html);
            	$("#btn_ok").on("click", function(){
            		$("#btn_confirm").hide();
            		okFun();
        		});
            	$("#btn_cancel").on("click", function(){
            		$("#btn_confirm").hide();
            		cancelFun();
            	});
            },
            load:{
            	_id: "loading",
            	_text:"加载中...",
            	$load: this._id ? $("#" + this._id) : $("#loading"),
            	show: function(){
            		var _selector = "#" + this._id;
            		if($("body").find(_selector).length == 0){
            			var load = "<div id=" + this._id + " class='ln-loading tc'>" + this._text + "</div>";
            			$("body").prepend(load);
            			this.$load = $(_selector);
            		}
            		$("#loading").show();
            	},
            	hide: function(){
            		if(this.$load.length >0){
            			$("#loading").hide();
            		}
            	}
            },
            error: {
            	_id:"retry",
            	_text:"文本和人品加载失败<br/>点击重试",
            	$error: this._id ? $("#" + this._id) : $("#retry"),
            	show: function(){
    	    		common.load.hide();
            		var _selector = "#" + this._id;
            		if($("body").find(_selector).length == 0){            			
	            		var err = "<div id='" + this._id + "' class='ln-error font-gray tc'>"+ this._text +"</div>";
	                	$("body").prepend(err);
	                	this.$error = $(_selector);
            		}else{
            			this.$error.html(this._text);
            		}
                	this.$error.show();
                	$("body").addClass("error ovh");
            	},
            	hide: function(){
            		if(this.$error.length>0){
            			this.$error.hide();
            			$("body").removeClass("error ovh");
            		}
            	},
            	//列表请求失败 追加失败信息，绑定点击重试回调
            	list: function(dom,click){
    				common.load.hide();
            		this._id = "data_err",this._text="加载数据失败，请点击重试！";
    				var _selector = "#" + this._id,_dom=dom.length>0?dom:$("body");
            		if(_dom.find(_selector).length == 0){            			
	            		var err = "<div id='" + this._id + "' class='ln-error-data font-gray tc'>"+ this._text +"</div>";
	            		_dom.append(err);
	                	this.$error = $(_selector);
            		}else{
            			this.$error.html(this._text);
            		}
                	this.$error.show();
            		this.$error.on("click",click);
            	}
            },
            cookie: {
            	//新增键值
            	add: function(key,value,expiresDays){
            		var cookieStr = key + "=" + value;
        			expiresDays = !!expiresDays?expiresDays:7;
        			if(!!expiresDays && expiresDays > 0){ 
        				var date = new Date(); 
        				date.setTime(date.getTime() + expiresDays*3600*1000*24);
        				cookieStr = cookieStr + "; expires="+date.toGMTString(); 
    				} 
        			document.cookie = cookieStr;
            	},
            	//追加某键的值
            	stack: function(key,value,expiresDays,maxLength){
            		if(this.contains(key)){
            			var oldValue = this.get(key),oldArray = oldValue.split("|");
            			if($.inArray(value,oldArray) == -1){
            				if(maxLength != void 0 && oldArray.length >= maxLength){
            					oldValue = oldValue.replace(oldArray.shift()+"|","");
            				}
            				document.cookie = key + "=" + oldValue+"|"+ value;
            			}            			
            		}else{
            			this.add(key,value,expiresDays);
            		}
            	},
            	//替换某键的值
            	set: function(key,value,expiresDays){
            		if(this.contains(key)){
            			var oldValue = this.get(key);
            			if(value != oldValue){
            				document.cookie = key + "=" + value;
            			}            			
            		}else{
            			this.add(key,value,expiresDays);
            		}         		
            	},
            	//获取某键的值
            	get: function(key){
            		if (document.cookie.length>0){
            			var c_start=document.cookie.indexOf(key + "=");
            				if (c_start!=-1){
            					c_start=c_start + key.length+1;
            					c_end=document.cookie.indexOf(";",c_start);
            					if (c_end==-1) c_end=document.cookie.length;
            					var result = document.cookie.substring(c_start,c_end);
            					return result;
        					};
            		}
            		return "";
            	},
            	contains: function(key){
            		if (document.cookie.length > 0){
            			var c_start = document.cookie.indexOf(key + "=");
            			if(c_start != -1)
            				return true;
            		}
            		return false;
            	},
            	clear: function(key){
            		if(this.contains(key)){
            			var cookieStr = this.get(key);
            			var date = new Date(); 
        				date.setTime(date.getTime()-1);
        				cookieStr = cookieStr + "; expires="+date.toGMTString();
            			document.cookie = key + "=" + cookieStr;
            		}
            	}
            },
            Request: function () {
        	   var url = location.search; //获取url中"?"符后的字串
        	   var theRequest = new Object();
        	   if (url.indexOf("?") != -1) {
        	      var str = url.substr(1);
        	      strs = str.split("&");
        	      for(var i = 0; i < strs.length; i ++) {
        	         theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
        	      }
        	   }
        	   return theRequest;
        	},
        	/*设置封面*/
            setCovers : function (dom){
            	var parent = !!dom?dom:$("body");
            	parent.find(".img-cover").each(function(){
            		if($(this).data("src")!=""){
            			var img = new Image();
            			img.dataset.img= $(this).attr("id");
            			img.onload = function(){
                			$("#"+$(this).data("img")).attr("src",$(this).attr("src"));
            			};
            			img.src = $(this).data("src");
            		}
            	});
            },
        	/*页面统计*/
            recordPage : function (parm_send){
         	     var parm = {
         	     		  "business": "悦听悦读",
         	     		  "reqsrc":"pingqianH5"
         	     };
                 if(typeof iflytekRecordToolsInit === "function"){
                     iflytekRecordToolsInit(parm);
                 }
                 iflytekRecordToolsSendData(parm_send);
            },
            /*按钮统计*/
            recordButton : function(){
                var record_parm_send={
                   "type":"按钮统计",
                   "action":'show'
                };
                iflytekRecordToolsSendData(record_parm_send);
            }
        };

    (function(){
    	var request = common.Request();
    	common.isShare = !!request["isShare"]?request["isShare"]:false;
    	if(common.isShare == "true"){
			common.attention.show();
		}
    })();
    return common;
});