var PageControl={init:function(a){null!=a&&$.extend($PAGE.params,a),this.goPage(a.currentPage,a.pageSize)},params:{method:"get",form:"#pageForm",template_page:"#template_page",page_datas:"#page_datas",template:"#template",scriptTemplate:null,datas:"#datas",pageSize:5,currentPage:1,totalPage:0},refrech:function(){this.goPage($PAGE.params.currentPage,$PAGE.params.pageSize)},goPrevious:function(){this.params.currentPage>1&&this.goPage(this.params.currentPage-1,this.params.pageSize)},goNext:function(){this.params.currentPage<this.params.totalPage&&this.goPage(this.params.currentPage+1,this.params.pageSize)},goFirst:function(){this.goPage(1,this.params.pageSize)},goLast:function(){this.params.totalPage&&this.params.currentPage!=this.params.totalPage&&this.goPage(this.params.totalPage,this.params.pageSize)},goPage:function(a,b){var c=this.params.path;"post"==this.params.method?this.postSend(c,a,b):"get"==this.params.method&&(c=c+"/"+a+"/"+b,this.getSend(c))},getSend:function(a){var b=this;$.getJSON(a,function(a){0==a.code?(b.showDatas(a),b.showPages(a),b.params.pageLoaded&&b.params.pageLoaded(a)):alert("查询失败！")})},postSend:function(a,b,c){var d=this,e=$(d.params.form).serialize();e+="&currentPage="+b,e+="&pageSize="+c,$.post(a,e,function(a){0==a.code?(d.showDatas(a),d.showPages(a)):alert("查询失败！")},"json")},showPages:function(a){$("[id=readyPage]").remove();var b,c=this,d=c.getPages(a);for(i=0;i<d.length;i++)b=d[i],"S"==b.type?but=$('<span class="ellipsis">…</span>'):(but=$('<a href="#"></a>'),but.text(b.label)),1==b.display&&but.on("click",b.index,function(a){c.goPage(a.data,c.params.pageSize)}),"N"==b.type?but.addClass("page"):"Z"==b.type&&but.addClass("prev"),a.currentPage==b.index&&"N"==b.type&&but.addClass("current"),but.attr("id","readyPage"),but.appendTo(c.params.page_datas);$(c.params.template_page).css("display","none"),$("[id=readyPage]").show()},showDatas:function(a){null!=this.params.scriptTemplate&&this.params.scriptTemplate.length>0?this._scriptTemplateShowDatas(a):this._templateShowDatas(a)},_templateShowDatas:function(a){$("[id=ready]").remove();var b=this;if(null!=a.rows)for(var c=0;c<a.rows.length;c++){var d=$(b.params.template).clone();b.params.rowRenderer&&b.params.rowRenderer(c,d,a.rows[c]),d.attr("id","ready"),d.appendTo(b.params.datas)}$(b.params.template).css("display","none"),b.params.currentPage=a.currentPage,b.params.totalPage=a.totalPage,$("[id=ready]").show(),b.params.pageLoaded&&b.params.pageLoaded(a)},_scriptTemplateShowDatas:function(a){var b=this;$(b.params.datas).empty(),b.params.currentPage=a.currentPage,b.params.totalPage=a.totalPage,seajs.use(["template"],function(c){if(null!=a.rows)for(var d=0;d<a.rows.length;d++){var e=$(c.render(b.params.scriptTemplate,a.rows[d]));b.params.rowRenderer&&b.params.rowRenderer(d,e,a.rows[d]),e.appendTo(b.params.datas)}b.params.pageLoaded&&b.params.pageLoaded(a)})},clearDatas:function(){null!=this.params.scriptTemplate&&this.params.scriptTemplate.length>0?$(this.params.datas).empty():$("[id=ready]").remove(),$("[id=readyPage]").remove()},getPages:function(a){var b,c=[];b=a.hasPrevious?{index:a.currentPage-1,display:!0,label:"上一页",type:"Z"}:{index:1,display:!1,label:"上一页",type:"Z"},c.push(b),b=1==a.currentPage?{index:1,display:!1,label:"1",type:"N"}:{index:1,display:!0,label:"1",type:"N"},c.push(b);var d=0,e=0;if(a.totalPage>2){for(a.currentPage<=5&&a.currentPage>=a.totalPage-4?(d=2,e=a.totalPage>7?a.totalPage-2:a.totalPage-1):a.currentPage<=5&&a.currentPage<=a.totalPage-4?(d=2,e=a.totalPage<=7?a.totalPage-1:6):a.currentPage>=a.totalPage-4?(d=a.totalPage-5==1?"2":a.totalPage-5,e=a.totalPage-1):a.totalPage<=7?(d=2,e=a.totalPage-1):(d=a.currentPage-3>1?a.currentPage-2:2,e=a.currentPage+3<a.totalPage?a.currentPage+2:a.totalPage-1),a.currentPage>5&&a.totalPage>7&&(b={index:i,display:!1,label:"...",type:"S"},c.push(b)),i=d;i<=e;i++)b=a.currentPage==i?{index:i,display:!1,label:i,type:"N"}:{index:i,display:!0,label:i,type:"N"},c.push(b);(a.currentPage<a.totalPage-4&&a.totalPage>7||a.currentPage<=5&&a.currentPage>=a.totalPage-4&&a.totalPage>7)&&(b={index:i,display:!1,label:"...",type:"S"},c.push(b))}return a.totalPage>1&&(b=a.currentPage==a.totalPage?{index:a.totalPage,display:!1,label:a.totalPage,type:"N"}:{index:a.totalPage,display:!0,label:a.totalPage,type:"N"},c.push(b)),b=a.hasNext?{index:a.currentPage+1,display:!0,label:"下一页",type:"Z"}:{index:a.currentPage,display:!1,label:"下一页",type:"Z"},c.push(b),c}};window.PAGE=window.$PAGE=PageControl;