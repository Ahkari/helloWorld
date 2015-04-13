/**
 * 基础控制器类
 * Created by jingdai on 2014/11/19.
 */
define(['app/common'],function (common) {

    function controllerBase(html) {
        this.template = !!html?html:"";
        this.model = "";
    };

    controllerBase.prototype = {
    	/*设置单页面模板*/
        setModel: function (data,template) {
    		this.model = "",html = template == void 0 ? this.template:template;
        	if(!!data){
        		if(Object.prototype.toString.call(data) == '[object Array]'){        			
                    for(var i=0;i<data.length;i++){
                    	data[i]["index"] = i;//添加遍历索引
                        this.model += common.template.set(data[i],html);
                    }
        		}else{
        			this.model =  common.template.set(data,html);
        		}
        	}  	
        },
        /*设置列表模板*/
        setListModel: function(data,template,chapterData){
        	this.model = "",html = template == void 0 ? this.template:template;
            if(!!data && Object.prototype.toString.call(data) == '[object Array]'){ 
            	/*if(chapterData.orderType == 'desc'){
                    for(var i=data.length,j=0;i>0;i--,j++){
                    	data[j]["index"] = i + parseInt(chapterData.pageIndex - 1)*parseInt(chapterData.pageSize);//添加遍历索引
                        this.model += common.template.set(data[j],html);
                    }
            	}else{*/
                    for(var i=0;i<data.length;i++){
                    	//data[i]["index"] = i + parseInt(chapterData.pageIndex)*parseInt(chapterData.pageSize);//添加遍历索引
                        this.model += common.template.set(data[i],html);
                    }
            	//}

            }
        },
        setMarkModel: function(data,template){
        	this.model = "",html = template == void 0 ? this.template:template;
            if(!!data && Object.prototype.toString.call(data) == '[object Array]'){ 
                for(var i=0;i<data.length;i++){
                	data[i]["index"] = parseInt(data[i].chapterIndex);//添加遍历索引
                	data[i]["markindex"] = i + 1;
                	this.model += common.template.set(data[i],html);
                }
            }
        },
        /*渲染模板内容*/
        render: function (bodyDom) {
        	if(this.model == ""){
        		bodyDom.prepend("<div class='tc font-gray nodata'>没有查询到结果</div>");
        	}else{    
        			bodyDom.append(this.model); 
        	}
        	common.error.hide();
        	common.load.hide(); 
        },
        /*渲染模板内容*/
        renderList: function (bodyDom,direction) {
        	if(this.model == ""){
        		//bodyDom.prepend("<div class='tc font-gray nodata'>没有查询到结果</div>");
        	}else{    
        		if(direction == "down"){
        			bodyDom.append(this.model);
        		}else{
        			bodyDom.prepend(this.model);
        		}   
        	}
        	common.error.hide();
        	common.load.hide(); 
        },
        refresh: function(bodyDom){
        	if(this.model == ""){
        		bodyDom.prepend("<div class='tc font-gray nodata'>没有查询到结果</div>");
        	}else{        		
        		bodyDom.html(this.model);
        	}
        	common.error.hide();
        	common.load.hide();
        },
        reload: function(dom,data){
        	if(!!data && Object.prototype.toString.call(data) == '[object Array]'){
            	var list = dom.chirldren();
                for(var i=0;i<list.length;i++){
                	$(list).text(data[$(list).data("bind")]);
                }
            }
        }
    };

    return controllerBase;
});