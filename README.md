# hexo-relative-link

## Problem

I use typora + dropbox to maintain my notes, and part of the notes are published by hexo (using `mklink /D _posts ..\..\Dropbox\blog` to create a symbolic link), so that I don’t need to maintain a separate blog.

Md files will refer to other md files, pictures, pdf, etc. The reference link uses the relative path, but the relative path of the hexo link is calculated based on the location of the asset folder (the same name as the md file), and the link in the md file is based on the current file path, so we need to add `../` before the original link for correction. This code refers to [hexo-image-link](https://github.com/cocowool/hexo-image-link) , [hexo-asset-link](https://github.com/liolok/hexo-asset-link)

## Examples

| original link in md file            | modified link by hexo-relative-link              | modified content                              |
| ----------------------------------- | ------------------------------------------------ | --------------------------------------------- |
| `![picture_asset](blog/pic.png)`    | `![picture_asset](/path/blog/../blog/pic.png)`   | add /path/blog/../                            |
| `[other_post](../life/internet.md)` | `[other_post](/path/post/../../life/internet)`   | add /path/post/../<br />remove the ending .md |
| `[other_post_asset](play\doc.pdf)`  | `[other_post_asset](/path/post/../play/doc.pdf)` | add /path/post/../<br />`\` replaced with `/` |

## Usage

1. Configure the `hexo-asset-folder: true` in the blog directory _config.yml file

2. install
   ```bash
   $ npm install hexo-relative-link --save
   ```

3. Configure typora picture settings to use relative paths first, and then drag files, pictures to typora to automatically generate links, this link can be directly published to the hexo blog without modification ^_^

## Special cases

Even if the link appears in the code block, it will be replaced too. You can add one or more spaces before/after the parentheses to avoid being replaced. Such as

```markdown
[other_post](../life/internet.md)
```

change to

```markdown
[other_post](../life/internet.md )
[other_post]( ../life/internet.md)
[other_post](  ../life/internet.md  )
```

---

# hexo-relative-link

## 解决的问题

我用 typora + dropbox 维护笔记，其中可公开的笔记使用 hexo 发布（使用 `mklink /D _posts ..\..\Dropbox\blog` 创建符号链接)，这样我就不用再单独维护博客了，博客属于笔记的一部分。

md 文件中会引用其它 md、图片、pdf 等，引用链接使用相对路径，然而 hexo 链接的相对路径以 asset 文件夹（与 md 文件同名）的位置来计算，而 md 文件中的链接以当前文件路径来计算的，所以需要在原链接前加上 `../` 进行修正。此代码参考了 [hexo-image-link](https://github.com/cocowool/hexo-image-link)、[hexo-asset-link](https://github.com/liolok/hexo-asset-link)

## 举例

| 原 md 文件中链接                    | hexo-relative-link 修改后                        | 修改内容                                |
| ----------------------------------- | ------------------------------------------------ | --------------------------------------- |
| `![picture_asset](blog/pic.png)`    | `![picture_asset](/path/blog/../blog/pic.png)`   | 添加 /path/blog/..                      |
| `[other_post](../life/internet.md)` | `[other_post](/path/post/../../life/internet)`   | 添加 /path/post/../<br />去掉末尾 .md   |
| `[other_post_asset](play\doc.pdf)`  | `[other_post_asset](/path/post/../play/doc.pdf)` | 添加 /path/post/../<br />`\` 替换为 `/` |

## 使用

1. 配置博客目录 _config.yml 文件中的 `hexo-asset-folder: true`

2. 安装
   ```bash
   $ npm install hexo-relative-link --save
   ```

3. typora 配置图片优先使用相对路径，拖动文件、图片到 typora 就可以自动生成链接，这个链接不用修改就可以直接发布到 hexo 博客了 ^_^

## 特殊情况

即使链接出现在代码块中，也会被替换，此时可以在括号的前后加空格来避免被替换。比如

```markdown
[other_post](../life/internet.md)
```

改为

```markdown
[other_post](../life/internet.md )
[other_post]( ../life/internet.md)
[other_post](  ../life/internet.md  )
```

