// 声明 docsify 插件
var myDocsifyPlugin = function(hook, vm) {
	
	// 钩子函数：解析之前执行
	hook.beforeEach(function(content) {
		try{
			// 功能 1，替换全局变量 
			content = content.replace(/\$\{sa.top.version\}/g, window.saTokenTopVersion);
			
			// 添加 [toc] 标记
			content = content.replace(/\[\[toc\]\]/g, '<div class="toc-box"></div>');
			
		}catch(e){
			// 
		}
		return content;
	});
	
	// 钩子函数：每次路由切换时，解析内容之后执行 
	hook.afterEach(function(html) {
		
		// 功能 2，文章底部添加仓库地址  
		var url = 'https://gitee.com/dromara/sa-token/tree/dev/sa-token-doc/doc/' + vm.route.file;
		var url2 = 'https://github.com/dromara/sa-token/tree/dev/sa-token-doc/doc/' + vm.route.file;
		var footer = [
			'<br/><br/><br/><br/><br/><br/><br/><hr/>',
			'<footer>',
			'<span>发现错误？ 您可以在 <a href="' + url + '" target="_blank">Gitee</a> 或 <a href="' + url2 +
			'" target="_blank">GitHub</a> 帮助我们完善此页文档！</span>',
			'或 <a href="https://jq.qq.com/?_wv=1027&k=b759RZrL" target="_blank">加入QQ群</a> 交流反馈',
			'</footer>'
		].join('');
		return html + footer;
	});
	
	// 每钩子函数：次路由切换时数据全部加载完成后调用，没有参数。
	hook.doneEach(function() {
		
		// 功能3，给代码盒子，添加行数样式 
		$('pre code').each(function(){
			var lines = $(this).text().split('\n').length;
			var $numbering = $('<ul/>').addClass('code-line-box');
			$(this)
				.addClass('has-numbering')
				.parent()
				.append($numbering);
			for(i=1;i<=lines;i++){
				$numbering.append($('<li/>').text(i));
			}
		});
		
		// 功能4，添加 toc 目录 
		var dStr = "";
		$('#main h2, #main h3, #main h4, #main h5, #main h6').each(function() {
			// dStr += '<li>';
			
			$('.toc-box').append('<li class="toc-' + this.localName + '">' + this.innerHTML + '</li>');
			
			// $('.toc-box').append(this.outerHTML);
			
			
			// dStr += '<li>' + $(this).text() + '</li>';
			// console.log(this);
			// console.log(dStr);
			
			
			// dStr += '</li>';
		});
		// $('.toc-box').html(dStr);
		
		
	});
	
	// 钩子函数：初始化并第一次加载完成数据后调用，没有参数。
	hook.ready(function() {
	});
	
}