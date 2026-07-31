# test_yeye

## 摄影作品网站（林叙 Photography）

纯静态的个人摄影作品集，无需构建工具，直接打开 `index.html` 即可预览。

### 功能

- 全屏 hero 首图与摄影师简介
- 瀑布流作品画廊（20 幅），支持风光 / 人像 / 纪实 / 自然 / 城市静物分类筛选
- 全屏灯箱浏览：点击照片打开，`←` `→` 切换、`Esc` 关闭、支持点击遮罩关闭
- 缩略图懒加载 + 滚动淡入，移动端单列自适应
- 关于我、进行中的系列、联系表单（前端校验后唤起 `mailto:`）

### 本地预览

```bash
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000
```

### 目录结构

```
index.html          页面结构与作品数据（figure 上的 data-* 属性）
styles.css          样式
script.js           筛选、灯箱、滚动淡入、表单
assets/photos/      灯箱使用的大图（1600px）
assets/thumbs/      画廊使用的缩略图（800px）
```

### 替换为真实作品

1. 把大图放入 `assets/photos/`，同名缩略图放入 `assets/thumbs/`（建议 800px 宽）。
2. 在 `index.html` 中复制一个 `figure.photo-card`，修改 `data-category`、`data-full`、`data-title`、`data-meta`、`img` 的 `src` 与 `alt`。
3. 新增分类时，同时在 `.filters` 里加一个 `data-filter` 按钮，值与 `data-category` 一致。

示例照片来自 [Lorem Picsum](https://picsum.photos)，仅用于占位展示，请替换为自己的作品。

## python-calculator

见 [python-calculator/README.md](python-calculator/README.md)。
