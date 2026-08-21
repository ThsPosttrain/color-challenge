# 颜色挑战 / 我眼中的同花顺

这是一个可直接部署到 GitHub Pages 的静态网站。

## 替换照片

打开 `data/colors.js`，找到 `window.COLOR_CHALLENGE_DATA.images`，将每种颜色对应的数组替换成图片路径即可。当前图片按颜色放在 `data/黑/黑1.jpg`、`data/白/白1.jpg` 这样的目录中，每个颜色使用 1 到 9 的编号。

每种颜色最多展示 9 张图片。不足 9 张时，网站会自动显示彩色占位卡片。

## 修改拍摄者署名

在 `data/colors.js` 的 `photographers` 配置中修改每种颜色对应的两位拍摄者，页面会在颜色标题下方显示“照片主要由……拍摄”。

## 本地预览

在当前目录启动任意静态文件服务器，例如：

```bash
python -m http.server 8000
```

然后打开 `http://localhost:8000/`。

## GitHub Pages

将本目录推送到 GitHub 仓库，在仓库 Settings → Pages 中选择对应分支和根目录即可。网站只依赖静态 HTML、CSS、JavaScript 和图片，不需要数据库或服务器后端。
