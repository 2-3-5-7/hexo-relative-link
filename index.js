'use strict';

const url = require('url');
const {slugize, decodeURL} = require('hexo-util');

hexo.extend.filter.register('before_post_render', function(post){
    // 当前文档对应页面的绝对路径，类似 /path/to/file/fliename/
    let cur_pagepath = url.parse(post.permalink).pathname;
    // 校准相对路径，hexo 以 asset 文件夹为参考，所以加 ../
    // \ 替换为 /
    let corr_rel_path = path => path ? '../' + path.replace(/\\/g, '/') : '';

    // 匹配 []() 形式，但链接中包含 :// 的不匹配，来排除超链接
    post.content = post.content.replace(/\[([^\[\]]*)\]\((?!\S+:\/\/)(\S*)\)/g,
        function(match_str, label, rel_path) {
            let is_mdlink = false;
            rel_path = rel_path.replace(/((\S+)\.md)$|((\S+)\.md)?(#(.*))$/, (_0, _1, md_path1, _3, md_path2, _5, fragment) => {
                is_mdlink = true;
                let md_path = md_path1 ?? md_path2 ?? '';
                if (md_path)
                    md_path = corr_rel_path(md_path) + '/';  // hexo 的 post url 以 / 结尾

                // url fragment 部分按 hexo-renderer-marked 的方法 slugize 后作为 "anchorId"
                // decodeURL 解决 obsidian 的空格用 %20 表示的问题
                return md_path + (fragment ? '#' + slugize(decodeURL(fragment)) : '')
            });
            if (!is_mdlink)
                rel_path = corr_rel_path(rel_path);

            let new_str = `[${label}](${cur_pagepath}${rel_path})`;
            // console.debug("[CHANGE] " + match_str + " -> " + new_str);
            return new_str;
        });

    return post;
});
