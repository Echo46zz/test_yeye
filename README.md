# 个人摄影作品网站

这是一个极简画廊风的个人摄影作品网站第一版，使用 HTML、CSS 和少量 JavaScript 构建。

## 本地预览

可以直接在浏览器中打开 `index.html`，或在当前目录运行：

```bash
python3 -m http.server 8000
```

然后访问 `http://localhost:8000`。预览结束后在终端按 `Ctrl+C` 关闭服务。

## 替换照片

当前画廊使用 CSS 渐变占位图。替换真实照片时，可以按 `index.html` 中的注释，将 `.photo-placeholder` 替换为：

```html
<img src="./assets/photo-01.jpg" alt="照片描述">
```

建议将真实作品放在 `assets/` 目录下，并为每张照片写清楚 `alt` 描述。

## Vercel

项目已包含 `vercel.json`，可作为静态站部署到 Vercel。本阶段没有执行部署、登录或上线操作。