'use strict';

const url = require('url');

hexo.extend.filter.register('before_post_render', function(data){
    // 当前文档对应页面的绝对路径，类似 /path/to/file/fliename/
    var page_path = url.parse(data.permalink).pathname;
    // 匹配 []() 形式，但链接中包含 :// 的不匹配，来排除超链接
    data.content = data.content.replace(/\[([^\[\]]*)\]\((?!\S+:\/\/)(\S*)\)/g,
        function(match_str, label, path){
            // 去掉 .md 后缀
            path = path.replace(/(\S+)\.md$/, "$1");
            // \ 替换为 /，否则生成的链接不对
            path = path.replace(/\\/g, "/");
            // 以当前 md 文件路径为参考，hexo 以 asset 文件夹为参考，所以加 ../
            // 加 page_path 使用绝对路径避免在首页预览时链接错误
            var new_str = "[" + label + "](" + page_path + "../" + path + ")";
            console.debug("[CHANGE] " + match_str + " -> " + new_str);
            return new_str;
        });

    return data;
});