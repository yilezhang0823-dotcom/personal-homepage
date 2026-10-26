# 个人主页

纯静态单页：`index.html` + `style.css` + `script.js`，不依赖任何框架或构建工具。

## 本地预览

直接双击 `index.html` 用浏览器打开即可。
（“复制邮箱”按钮需要 https 或 localhost 才能用剪贴板；想在本地测试它，可以在这个目录里运行 `npx serve` 或 `python -m http.server 8000`，再打开 http://localhost:8000。）

## 替换成自己的内容

都在 `index.html` 里，搜索下面这些占位文字替换：

| 占位 | 位置 |
|---|---|
| `你的名字` | 标题、导航左侧、自我介绍、页脚 |
| `YN` | 头像占位里的缩写；要用照片就把 `<span>YN</span>` 换成 `<img src="avatar.jpg" alt="你的名字">`，图片放在同一目录 |
| `一句话简介…`、`这里可以再补充…` | 自我介绍 |
| `项目名称一/二/三`、描述、`https://example.com` | 三张项目卡片 |
| `you@example.com`（两处：链接和复制按钮的 `data-copy`） | 联系方式 |
| `your-username` | GitHub 链接 |

想换主色，改 `style.css` 顶部的 `--accent`（浅色）和深色区块里的 `--accent`。

## 部署到 GitHub Pages

1. 在 GitHub 新建仓库。想用 `https://<用户名>.github.io` 这个根地址，仓库名就叫 `<用户名>.github.io`；叫别的名字则地址是 `https://<用户名>.github.io/<仓库名>/`。
2. 把这个目录里的文件推上去（`index.html` 要在仓库根目录）：
   ```bash
   git init
   git add .
   git commit -m "个人主页"
   git branch -M main
   git remote add origin https://github.com/<用户名>/<仓库名>.git
   git push -u origin main
   ```
3. 仓库页面 → Settings → Pages → Build and deployment：Source 选 **Deploy from a branch**，Branch 选 `main`、目录 `/ (root)`，保存。
4. 等一两分钟，页面顶部会显示网址。

## 部署到 Vercel

**方式一：网页导入（推荐）**

1. 先按上面的步骤把代码推到 GitHub。
2. 登录 https://vercel.com → Add New → Project → 选这个仓库 → Import。
3. Framework Preset 选 **Other**，Build Command 和 Output Directory 留空，点 Deploy。
4. 以后每次 `git push`，Vercel 会自动重新部署。

**方式二：命令行**

```bash
npm i -g vercel
vercel        # 在这个目录里运行，按提示登录和确认，得到预览地址
vercel --prod # 发布到正式地址
```

两种方式都可以在项目设置的 Domains 里绑定自己的域名。
