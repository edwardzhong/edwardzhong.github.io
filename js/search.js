var Content=null;
var changeEvent= 'oninput' in window?'input':'onpropertychange' in window?'propertychange':'keyup';
$('[data-tag=search]').on('click',popupSearch);

function popupSearch(){
	var num=0, size=10,
		results=[],
		body = $(document.body),
		overlay = $('<div class="popup-overlay"></div>'),
		popupTpl=$('<div class="search-popup show">'
			    +'<div class="search-top">'
			    +    '<div class="search-icon"><i class="icon icon-search"></i></div>'
			    +    '<div class="search-close"><i class="icon icon-cancel"></i></div>'
			    +    '<div class="search-input"><input type="text" placeholder="搜索"></div></div>'
			    +'<div class="search-content">'
			    +    '<h3 class="search-tip">没有内容</h3>'
			    +    '<div class="search-result"></div>'
			    +	 '<nav class="search-pagination"></nav>'
			    +'</div></div>');

	body.css('overflow','hidden').append(overlay).append(popupTpl);

	var resultElem=popupTpl.find('.search-result'),
		pageElem=popupTpl.find('.search-pagination'),
		tipElem=popupTpl.find('.search-tip');

	//关闭
	popupTpl.find('.search-close').on('click',closePopup);
	// 输入
	popupTpl.find('input').on(changeEvent,function(){inputChange.call(this); });
	// 点击分页
	popupTpl.find('.search-pagination').on('click','a',function(){pageClick.call(this); });
	
	function closePopup(){
		popupTpl.removeClass('show').addClass('hide');
		setTimeout(function() {
			popupTpl.remove();
			body.css('overflow','');
			overlay.remove();	
		}, 500);
	}

	function pageClick(){
		var type=this.className;
		if(type=='num'){
			num=parseInt($(this).html(),10)-1;
		} else if(type=='prev'){
			num--;
		} else if(type=='next'){
			num++;
		}

		renderSearchResult(results,num,size);
	}

	function inputChange(){
		var val=$.trim($(this).val());
		if(!val){
			results.length=0;
			num=0;
			resultElem.empty();
			tipElem.html('没有内容');
			return;
		}

		var pattern=RegExp(val,'ig'),
			inputTime=new Date(),
			getReplaceStr=function (str){
				return str.replace(pattern,function(a,b,c){ return '<em>'+a+'</em>'; });
			};

		results=[];
		resultElem.empty();
		loadData().done(function(data){
			data.forEach(function(item,i){
				var tags=[],
					tagReg=false,
					titleReg=false,
					obj={};

				$.extend(true, obj, item);
				item.tags.forEach(function(tag,j){tags.push(tag.name); });

				if(tags.length){
					obj.tagStr=tags.join('@#');
					if((tagReg=pattern.test(obj.tagStr))){
						obj.tagStr=getReplaceStr(obj.tagStr);;
					}
				}

				if((titleReg=pattern.test(item.title))){
					obj.titleStr=getReplaceStr(item.title);
				}

				if(titleReg||tagReg){
					results.push(obj);
				}
			});
			if(results.length){
				tipElem.html('找到 <span>'+results.length+'</span> 条相关条目，用了 <span>'+(new Date()-inputTime)+'</span> 毫秒');
				renderSearchResult(results,0,size);
			} else {
				tipElem.html('未发现与 <span>"'+val+'"</span> 相关的内容');
			}
		});
	}

	/**
	 * 分页数据
	 * @param  {[type]} list [description]
	 * @param  {[type]} num  [description]
	 * @param  {[type]} size [description]
	 */
	function renderSearchResult(list,num,size){
		size=size||10;
		var rows=[],
			start=num*size,
			end=(num+1)*size;

		list.slice(start,end).forEach(function(item,i){
			rows.push(getResultRow(item));
		});
		resultElem.html(rows.join(''));
		pageElem.html(getPagination(list.length,num,size));
	}
}

// 加载json数据
function loadData(){
    return $.Deferred(function(deferred){
		if(Content){
			deferred.resolve(Content);
			return;
		}
		$.get('/content.json', function(data) {
			if(data){
				Content=data;
				deferred.resolve(data);
			} else{
				deferred.reject(null);
			}
		});
    });
}

// 搜索结果模版
function getResultRow(obj){
	var d=new Date(obj.date),
		dateStr=d.getFullYear()+'/'+('0'+(d.getMonth()+1)).slice(-2)+'/'+('0'+d.getDate()).slice(-2),
		tpl='<a class="search-link" href="/{path}">'
			+'<p class="search-title">{title}</p>'
			+'<p class="search-info">'
			+'<time>{date}</time>&nbsp;';

	tpl =tpl.replace(/{path}/g,obj.path)
			.replace(/{title}/g,(obj.titleStr||obj.title))
			.replace(/{date}/g,dateStr);

	if(obj.tagStr){
		tpl+='<i class="icon icon-tag"></i>&nbsp;<span>'+obj.tagStr.replace(/@#/g,'</span>&nbsp;<span>')+'</span></p>';
	}

	tpl+='</a>';

	return tpl;
}

/**
 * 生成分页模版
 * @param  {number} total 总记录数
 * @param  {number} size  分页大小
 */
function getPagination(total,num,size){
	if(!total) return '';
	var len=Math.ceil(total/size),
		arr=[];
	if(len<=1) return '';

	for(var i=0;i<len;i++){
		if(i==0&&num!=0){
			arr.push('<a class="prev" href="javascript:;">Prev</a>');
		}
		if(i==num){
			arr.push('<span>'+(i+1)+'</span>');
		} else {
			arr.push('<a class="num" href="javascript:;">'+(i+1)+'</a>');
		}
		if(i==len-1&&num!=len-1){
			arr.push('<a class="next" href="javascript:;">Next</a>');
		}
	}
	return  arr.join('');
}


