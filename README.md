# dsh-agents-viz

在 DeepSeek Harness (DSH) **侧栏**注入「Agent Teams」可视化面板：
队长 + 5 名成员编队、任务看板、实时通讯流，**输入任务后自动拆解派发给子 Agent 并逐个推进**。

## 功能

- 侧栏出现 **Agent Teams** 入口（`sidebar.panellist` 面板）
- 点开后显示：团队编队（队长 / 后端 / 前端 / QA / 评审 / 设计）
- 任务看板（进行中 / 已完成 / 待办）+ 每个 Agent 进度条 + 在线状态
- 底部输入框：输入任务回车 → 队长拆解为 5 个子任务 → 自动派发 → 逐个执行推进 → 通讯流实时记录

## 安装

### 方式 A：本地目录安装（最快，不需要 GitHub）

```bash
dsh plugin --profile web add /path/to/dsh-agents-viz
```

（把路径换成插件所在的本地目录）

### 方式 B：从 GitHub 安装

把本项目推到你自己的仓库后：

```bash
dsh plugin --profile web add github:<你的用户名>/<仓库名>
```

### 方式 C：npm 包（发布后）

```bash
dsh plugin --profile web add dsh-agents-viz
```

## 使用

1. 安装后**重启 DSH Desktop**
2. 左侧栏会出现一个 **Agent Teams** 入口（一个队形图标）
3. 点开它，底部输入一个任务（如"做一个电商首页"），回车
4. 观察：队长拆解 → 5 名成员依次被派发任务 → 进度推进 → 全部完成后队长汇总

## 结构

```
lib/client.js       客户端 UI（注入 sidebar.panellist 面板）— 已构建
lib/index.mjs       宿主入口 — 已构建
cordis.patch.yml    插件声明
package.json        插件元数据与 dsh.client.inject 声明
```

> 源码在 `src/`；改源码后重新构建：`pnpm build`
