# hexo-relative-link

## 1 Problem Solved

I use typora/obsidian + dropbox to maintain my notes, and part of the notes are published by hexo (using `mklink /J _posts ..\..\Dropbox\blog` to create a symbolic link), so that I don’t need to maintain a separate blog.

Md files will refer to other md files, pictures, pdf, etc. The reference link uses the relative path, but the relative path of the hexo link is calculated based on the location of the asset folder (the same name as the md file), and the link in the md file is based on the current file path, so we need to add `../` before the original link for correction.

## 2 Examples

| original link in md file                            | modified link by hexo-relative-link                          | modified content                                   |
| --------------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------- |
| `![picture_asset](postA/pic.png)`                   | `![picture_asset](/path/postA/../postA/pic.png)`             | add `/path/postA/../`                              |
| `[other_posts](postB.md)`                           | `[other_posts](/path/postA/../postB)`                        | add `/path/postA/../`<br />remove the ending `.md` |
| `[other_posts_asset](postB\aaa.pdf)`                | `[other_posts_asset](/path/postA/../postB/aaa.pdf)`          | add `/path/postA/../`<br />`\` replaced with `/`   |
| `[anchor_links](#1.1 heading)`                      | `[anchor_links](/path/postA/#1-1-heading)`                   | slugize(`#1.1 heading`)                            |
| `[other_posts_with_anchor](postB.md#1.1%20heading)` | `[other_posts_with_anchor](/path/postA/../postB/#-1-1-heading)` | slugize(decodeURL(`#1.1%20heading`))               |

## 3 Usage

1. Configure the `hexo-asset-folder: true` in the blog directory `_config.yml` file
2. install
   ```bash
   $ npm install hexo-relative-link
   ```

3. Configure typora picture settings to use relative paths first, and then drag files, pictures to typora to automatically generate links, this link can be directly published to the hexo blog without modification ^_^
4. Optional

	- To be able to reference other posts and their asset files, set `permalink: :title/` in `_config.yml` (Not needed if only referencing posts' own resources)
	- To automatically generate title and categories, I recommend using [hexo-auto-category](https://www.npmjs.com/package/hexo-auto-category) and [hexo-filename-title](https://www.npmjs.com/package/hexo-filename-title)
	- If you use Obsidian, disable `Use [[Wikilinks]]` to always use markdown link

## 4 Special Cases

Even if the link appears in the code block, it will be replaced too. You can add one or more spaces before/after the parentheses to avoid being replaced. Such as

```markdown
[other_post](../path/postA.md)
```

change to

```markdown
[other_post](../path/postA.md )
[other_post]( ../path/postA.md)
[other_post](  ../path/postA.md  )
```

---

# hexo-relative-link

## 1 解决的问题

我用 typora/obsidian + dropbox 维护笔记，其中可公开的笔记使用 hexo 发布（使用 `mklink /J _posts ..\..\Dropbox\blog` 创建符号链接)，这样我就不用再单独维护博客了，博客属于笔记的一部分。

md 文件中会引用其它 md、图片、pdf 等，引用链接使用相对路径，然而 hexo 链接的相对路径以 asset 文件夹（与 md 文件同名）的位置来计算，而 md 文件中的链接以当前文件路径来计算的，所以需要在原链接前加上 `../` 进行修正。

## 2 举例

| 原 md 文件中链接                                    | hexo-relative-link 修改后                                    | 修改内容                                   |
| --------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------ |
| `![picture_asset](postA/pic.png)`                   | `![picture_asset](/path/postA/../postA/pic.png)`             | 添加  `/path/postA/../`                    |
| `[other_posts](postB.md)`                           | `[other_posts](/path/postA/../postB)`                        | 添加 `/path/postA/../`<br />去掉末尾 `.md` |
| `[other_posts_asset](postB\aaa.pdf)`                | `[other_posts_asset](/path/postA/../postB/aaa.pdf)`          | 添加 `/path/postA/../`<br />`\` 替换为 `/` |
| `[anchor_links](#1.1 heading)`                      | `[anchor_links](/path/postA/#1-1-heading)`                   | slugize(`#1.1 heading`)                    |
| `[other_posts_with_anchor](postB.md#1.1%20heading)` | `[other_posts_with_anchor](/path/postA/../postB/#-1-1-heading)` | slugize(decodeURL(`#1.1%20heading`))       |

## 3 使用

1. 配置博客目录 `_config.yml` 文件中的 `hexo-asset-folder: true`
2. 安装
   ```bash
   $ npm install hexo-relative-link
   ```

3. typora 配置图片优先使用相对路径，拖动文件、图片到 typora 就可以自动生成链接，这个链接不用修改就可以直接发布到 hexo 博客了 ^_^
4. 可选

	- 为了能够引用其它文章和它们的资源，需要在 `_config.yml` 设置 `permalink: :title/` （如只引用文章自身的资源则不需要）
	- 为了自动生成 title 和 categories 我推荐插件 [hexo-auto-category](https://www.npmjs.com/package/hexo-auto-category) 和 [hexo-filename-title](https://www.npmjs.com/package/hexo-filename-title)
	- 如果你用 Obsidian，关闭 `Use [[Wikilinks]]` 来始终用 markdown 链接的格式

## 4 特殊情况

即使链接出现在代码块中，也会被替换，此时可以在括号的前后加空格来避免被替换。比如

```markdown
[other_post](../path/postA.md)
```

改为

```markdown
[other_post](../path/postA.md )
[other_post]( ../path/postA.md)
[other_post](  ../path/postA.md  )
```

