# Quickdemo

快速分享大模型生成的HTML、Markdown、SVG、Mermaid代码（源自joeseesun的[quickshare](https://github.com/joeseesun/quickshare)项目）

## 安装

### Dokploy
使用Dokploy部署，请参考[Dokploy部署文档](https://docs.dokploy.com/docs/quickstart/deploy-with-dokploy)


## 技术栈（AI分析）

**后端 (Backend)**

1.  **运行时环境:** Node.js
2.  **Web 框架:** Express.js
3.  **模板引擎:** EJS (Embedded JavaScript templates)
4.  **数据库:** SQLite (通过 `sqlite3` 库进行交互)
5.  **会话管理:**
    * `express-session` (核心会话中间件)
    * `session-file-store` (将会话存储在服务器文件系统中)
    * `cookie-parser` (解析请求中的 Cookie)
6.  **API & 中间件:**
    * `body-parser` (解析请求体, 如 JSON, URL-encoded)
    * `cors` (处理跨域资源共享)
    * `morgan` (HTTP 请求日志记录)
    * `crypto-js` (用于生成页面 ID 等哈希值)
7.  **Markdown/Diagram 处理:**
    * `marked` (将 Markdown 转换为 HTML)
    * `mermaid` / `@mermaid-js/mermaid-cli` / `mermaid-render` (渲染 Mermaid 图表)
    * `jsdom` (可能用于在服务器端处理或渲染 DOM 结构)
8.  **配置管理:** `dotenv` (加载 `.env` 文件中的环境变量)

**前端 (Frontend)**

1.  **核心语言:** HTML, CSS, JavaScript (ES6+)
2.  **CSS:**
    * 原生 CSS (使用了 CSS 变量进行主题化)
    * 特定的样式文件 (如 `login.css`, `markdown-bytedance.css`)
3.  **JavaScript 库:**
    * `highlight.js` (用于代码语法高亮)
    * 可能使用了类似 `particles.js` 的库或自定义实现（根据 `particles-config.js` 推断）来实现背景粒子效果。
    * 原生 DOM 操作和 Fetch API (用于页面交互和 API 调用)
4.  **图标:** 可能使用了 Font Awesome (从 CSS 类名如 `fas fa-link` 推断)。

**开发与部署 (Development & Deployment)**

1.  **开发工具:** `nodemon` (用于开发时自动重启服务器)
2.  **包管理:** npm
3.  **容器化:** Docker, Docker Compose (根据 `Dockerfile` 和 `docker-compose.yml`)
4.  **脚本:** Shell Script (如 `start-production.sh`)

**总结:** 这是一个基于 **Node.js** 和 **Express** 的全栈项目，使用 **EJS** 进行服务器端渲染，**SQLite** 作为轻量级数据库，前端则主要利用原生 **HTML/CSS/JavaScript** 配合 **highlight.js** 和可能的粒子效果库实现，并使用 **Docker** 进行容器化部署。