window.__ModuleLoader__.load({
	id: "dsh-agents-viz",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region src/client/AgentTeamsPanel.tsx
		const MODELS = [
			"DeepSeek-V3",
			"DeepSeek-R1",
			"GPT-4o",
			"Claude-Sonnet",
			"Gemini-2.0",
			"Kimi",
			"通义千问"
		];
		/** 由 index.ts 注入：读取 DSH Harness 本机配置的模型目录（provider/group → models）。 */
		let __modelLoader = null;
		function setModelLoader(fn) {
			__modelLoader = fn;
		}
		function getModelLoader() {
			return __modelLoader;
		}
		const INITIAL_AGENTS = [
			{
				id: "lead",
				name: "队长",
				role: "team-lead",
				status: "idle",
				progress: 0,
				color: "#b8651b",
				duty: "拆解任务、派单调度、汇总成果",
				model: "DeepSeek-V3"
			},
			{
				id: "backend",
				name: "后端",
				role: "backend-dev",
				status: "idle",
				progress: 0,
				color: "#c4792c",
				duty: "后端 API 与数据模型实现",
				model: "DeepSeek-V3"
			},
			{
				id: "frontend",
				name: "前端",
				role: "frontend-dev",
				status: "idle",
				progress: 0,
				color: "#cf8c3a",
				duty: "前端页面与交互实现",
				model: "GPT-4o"
			},
			{
				id: "qa",
				name: "QA",
				role: "qa-engineer",
				status: "idle",
				progress: 0,
				color: "#a25a2c",
				duty: "测试用例编写与质量验证",
				model: "Claude-Sonnet"
			},
			{
				id: "review",
				name: "评审",
				role: "reviewer",
				status: "idle",
				progress: 0,
				color: "#d68a3c",
				duty: "代码审查与质量把关",
				model: "DeepSeek-R1"
			},
			{
				id: "design",
				name: "设计",
				role: "ui-designer",
				status: "idle",
				progress: 0,
				color: "#8f5a30",
				duty: "界面视觉与体验设计",
				model: "Kimi"
			}
		];
		const ICON = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="3.2"/><circle cx="5.5" cy="16.5" r="2.6"/><circle cx="18.5" cy="16.5" r="2.6"/><path d="M12 10.2v3M7.5 14.2l1.8 1.5M16.5 14.2l-1.8 1.5"/></svg>`;
		function now() {
			return (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", {
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit"
			});
		}
		function PanelIcon({ size, active }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				style: {
					display: "grid",
					placeItems: "center",
					width: size,
					height: size,
					color: active ? "#b8651b" : "currentColor"
				},
				dangerouslySetInnerHTML: { __html: ICON }
			});
		}
		/** 卡通机器人头像（纯 SVG，彩色圆底 + 天线/大眼/表情，随角色配色） */
		function Avatar({ color, size = 36 }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "av-av",
				style: {
					background: color,
					width: size,
					height: size
				},
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
					viewBox: "0 0 24 24",
					width: size * .62,
					height: size * .62,
					fill: "none",
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
							d: "M12 2.5v2M12 2.5h-2.7M12 2.5h2.7",
							stroke: "rgba(255,255,255,.95)",
							strokeWidth: "1.5",
							strokeLinecap: "round"
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
							x: "4.8",
							y: "5",
							width: "14.4",
							height: "12.6",
							rx: "4.6",
							fill: "rgba(255,255,255,.96)"
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
							d: "M4.8 9.4H3.4v3.4h1.4M19.2 9.4h1.4v3.4h-1.4",
							stroke: "rgba(255,255,255,.9)",
							strokeWidth: "1.7",
							strokeLinecap: "round"
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("ellipse", {
							cx: "9.3",
							cy: "10.6",
							rx: "1.8",
							ry: "2.1",
							fill: color
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
							cx: "8.75",
							cy: "9.7",
							r: "0.6",
							fill: "#fff"
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("ellipse", {
							cx: "14.7",
							cy: "10.6",
							rx: "1.8",
							ry: "2.1",
							fill: color
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
							cx: "14.15",
							cy: "9.7",
							r: "0.6",
							fill: "#fff"
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
							d: "M9.5 15.4h5",
							stroke: color,
							strokeWidth: "1.3",
							strokeLinecap: "round"
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
							cx: "7.4",
							cy: "15.4",
							r: "0.7",
							fill: "rgba(255,255,255,.7)"
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
							cx: "16.6",
							cy: "15.4",
							r: "0.7",
							fill: "rgba(255,255,255,.7)"
						})
					]
				})
			});
		}
		function Board() {
			const [agents, setAgents] = (0, react.useState)(INITIAL_AGENTS);
			const [tasks, setTasks] = (0, react.useState)([]);
			const [feed, setFeed] = (0, react.useState)([{
				from: "系统",
				text: "Live 模式已接入：看板将实时反映你在本对话中派发的 Agent 团队进度。",
				time: now(),
				system: true
			}, {
				from: "队长",
				text: "团队就绪，等待你提问 → 我拆解并派发队友",
				time: now()
			}]);
			const [question, setQuestion] = (0, react.useState)("");
			const [running, setRunning] = (0, react.useState)(false);
			const [speed, setSpeed] = (0, react.useState)(1);
			const [editing, setEditing] = (0, react.useState)(null);
			const [harnessModels, setHarnessModels] = (0, react.useState)(null);
			const timers = (0, react.useRef)([]);
			(0, react.useEffect)(() => {
				let alive = true;
				const loader = getModelLoader();
				if (loader) loader().then((opts) => {
					if (alive && opts && opts.length) setHarnessModels(opts);
				}).catch(() => {});
				return () => {
					alive = false;
				};
			}, []);
			(0, react.useEffect)(() => () => {
				timers.current.forEach((t) => {
					clearTimeout(t);
					clearInterval(t);
				});
			}, []);
			function push(from, text, system) {
				setFeed((f) => [...f, {
					from,
					text,
					time: now(),
					system
				}].slice(-50));
			}
			function autoDispatch(q) {
				const text = q.trim();
				if (text === "" || running) return;
				setRunning(true);
				setTasks([]);
				setAgents(INITIAL_AGENTS.map((a) => ({ ...a })));
				push("队长", `收到任务「${text}」，拆解为 5 个子任务并按依赖分层派发`);
				[
					{
						assignee: "后端",
						title: "后端实现：FastAPI + 数据模型",
						level: 1,
						deps: []
					},
					{
						assignee: "前端",
						title: "前端实现：React + 界面搭建",
						level: 1,
						deps: []
					},
					{
						assignee: "设计",
						title: "界面视觉与交互设计",
						level: 2,
						deps: ["#2"]
					},
					{
						assignee: "QA",
						title: "QA 阶段：端到端验证与缺陷报告",
						level: 2,
						deps: ["#1", "#2"]
					},
					{
						assignee: "评审",
						title: "评审：代码质量 + 无障碍收尾",
						level: 3,
						deps: ["#4"]
					}
				].forEach((job, i) => {
					const id = `#${i + 1}`;
					const base = i === 0 ? 300 : i === 1 ? 900 : i === 2 ? 1800 : i === 3 ? 2200 : 3e3;
					timers.current.push(window.setTimeout(() => {
						setTasks((prev) => [...prev, {
							id,
							title: job.title,
							assignee: job.assignee,
							status: "doing",
							deps: job.deps,
							level: job.level
						}]);
						setAgents((prev) => prev.map((a) => a.name === job.assignee ? {
							...a,
							status: "run",
							progress: 8
						} : a));
						push(job.assignee, `开始处理「${job.title}」`);
						let p = 8;
						const iv = window.setInterval(() => {
							p += 16 * speed;
							if (p >= 100) {
								window.clearInterval(iv);
								setAgents((prev) => prev.map((a) => a.name === job.assignee ? {
									...a,
									status: "done",
									progress: 100
								} : a));
								setTasks((prev) => prev.map((t) => t.id === id ? {
									...t,
									status: "done"
								} : t));
								push(job.assignee, `完成「${job.title}」`);
							} else setAgents((prev) => prev.map((a) => a.name === job.assignee ? {
								...a,
								progress: p
							} : a));
						}, 260 / speed);
						timers.current.push(iv);
					}, base));
				});
				timers.current.push(window.setTimeout(() => {
					push("队长", "5 个子任务已全部完成，汇总成果中");
					setRunning(false);
				}, 3e3 + 1300 / speed + 400));
			}
			function reset() {
				timers.current.forEach((t) => {
					clearTimeout(t);
					clearInterval(t);
				});
				timers.current = [];
				setTasks([]);
				setAgents(INITIAL_AGENTS.map((a) => ({ ...a })));
				setRunning(false);
				setFeed([{
					from: "系统",
					text: "Live 模式已接入：看板将实时反映你在本对话中派发的 Agent 团队进度。",
					time: now(),
					system: true
				}, {
					from: "队长",
					text: "团队就绪，等待你提问 → 我拆解并派发队友",
					time: now()
				}]);
			}
			function openEdit(m) {
				setEditing({ ...m });
			}
			function saveEdit() {
				if (!editing) return;
				setAgents((prev) => prev.map((a) => a.id === editing.id ? {
					...a,
					name: editing.name.trim() || a.name,
					role: editing.role.trim() || a.role,
					duty: editing.duty.trim() || a.duty,
					model: editing.model
				} : a));
				push("队长", `已更新「${editing.role}」的职责与大模型配置`);
				setEditing(null);
			}
			/** 大模型选项 = Harness 本机模型（若拿到）∪ 内置常用模型；每个 Agent 当作独立项目，自由选用。 */
			const modelOptions = harnessModels && harnessModels.length ? [...harnessModels, ...MODELS.filter((md) => !harnessModels.some((h) => h.value === md)).map((md) => ({
				label: md,
				value: md
			}))] : MODELS.map((md) => ({
				label: md,
				value: md
			}));
			const doneCount = tasks.filter((t) => t.status === "done").length;
			const runningCount = tasks.filter((t) => t.status === "doing").length;
			const todoCount = tasks.filter((t) => t.status === "todo").length;
			agents.filter((a) => a.status === "done").length;
			const lead = agents[0];
			const members = agents.slice(1);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "av-wrap",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("style", { children: `
        .av-wrap{--accent:#b8651b;--accent-soft:#f6ece0;--bg:#f5f5f7;--card:#ffffff;--line:#e6e6ea;--ink:#1f2328;--sub:#6b7280;--ok:#2f8f5b;--run:#b8651b;
          font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Microsoft YaHei',sans-serif;background:var(--bg);color:var(--ink);
          height:100%;min-height:0;overflow:auto;padding:14px;box-sizing:border-box;font-size:13px;position:relative}
        /* 头部 */
        .av-hd{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px;flex-wrap:wrap}
        .av-hd h3{margin:0;font-size:15px;font-weight:700;display:flex;align-items:center;gap:8px}
        .av-hd h3 i{display:grid;place-items:center;width:26px;height:26px;border-radius:8px;background:var(--accent);color:#fff;font-style:normal;flex:none}
        .av-team{display:flex;align-items:center;gap:6px;font-size:12px}
        .av-team b{font-weight:600}
        .av-exp{font-size:10px;padding:2px 8px;border-radius:20px;background:var(--accent-soft);color:var(--accent);white-space:nowrap}
        /* 统计 */
        .av-stats{display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap}
        .av-stat{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:6px 11px;text-align:center;min-width:52px;flex:1}
        .av-stat b{display:block;font-size:16px;line-height:1.1}
        .av-stat span{font-size:10px;color:var(--sub)}
        .av-stat[data-k=run]{border-left:3px solid var(--accent)}
        .av-stat[data-k=ok]{border-left:3px solid var(--ok)}
        .av-stat[data-k=block]{border-left:3px solid #d23c3c}
        /* 操作条 */
        .av-ops{display:flex;align-items:center;gap:8px;margin-bottom:12px;flex-wrap:wrap}
        .av-btn{display:inline-flex;align-items:center;gap:5px;border:1px solid var(--line);background:var(--card);border-radius:8px;padding:5px 11px;font-size:12px;color:var(--ink);cursor:pointer}
        .av-btn.primary{background:var(--accent);border-color:var(--accent);color:#fff;font-weight:600}
        .av-spd{display:inline-flex;align-items:center;gap:3px;margin-left:auto}
        .av-spd button{border:1px solid var(--line);background:var(--card);border-radius:6px;font-size:10px;padding:3px 7px;color:var(--sub);cursor:pointer}
        .av-spd button.on{background:var(--accent);border-color:var(--accent);color:#fff}
        /* 编队 */
        .av-formation{margin-bottom:12px}
        .av-form-cap{font-size:11px;color:var(--sub);margin-bottom:6px;display:flex;align-items:center;gap:6px}
        .av-lead-card{display:flex;align-items:center;gap:13px;background:var(--card);border:1px solid var(--line);border-left:3px solid var(--accent);border-radius:12px;padding:12px 14px;margin-bottom:8px}
        .av-lead-card .av-meta{flex:1;min-width:0}
        .av-lead-card .av-role{font-size:10px;color:var(--sub);letter-spacing:.2px}
        .av-lead-card .av-name{font-weight:700;font-size:15px;line-height:1.3}
        .av-chip{font-size:10px;padding:2px 8px;border-radius:20px;background:var(--accent-soft);color:var(--accent);white-space:nowrap;display:inline-block;margin-top:5px}
        .av-chip-model{background:#eef0f3;color:#6b7280;margin-left:4px}
        .av-lead .av-num{text-align:center;min-width:52px}
        .av-lead .av-num b{display:block;font-size:17px}
        .av-lead .av-num span{font-size:10px;color:var(--sub)}
        .av-members{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}
        @media(min-width:520px){.av-members{grid-template-columns:repeat(3,1fr)}}
        .av-agent{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:10px}
        .av-agent[data-s=run]{border-color:var(--accent);box-shadow:0 0 0 1px var(--accent)}
        .av-agent[data-s=done]{border-color:#cfe7d8}
        .av-ahd{display:flex;align-items:center;gap:9px;margin-bottom:8px}
        .av-ameta{min-width:0}
        .av-ameta .av-role{font-size:9px;color:var(--sub);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
        .av-ameta .av-aname{font-weight:700;font-size:13px;line-height:1.3}
        .av-atags{display:flex;align-items:center;justify-content:space-between;gap:6px;margin-bottom:7px}
        .av-st{font-size:9px;padding:1px 8px;border-radius:10px;white-space:nowrap}
        .av-st.idle{background:#eef0f3;color:#6b7280}
        .av-st.run{background:var(--accent-soft);color:var(--accent)}
        .av-st.ok{background:#e7f4ec;color:var(--ok)}
        .av-cnt{font-size:10px;color:var(--sub)}
        .av-amodel{display:flex;align-items:center;gap:4px;font-size:10px;color:var(--sub);margin-bottom:7px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
        .av-bar{height:5px;border-radius:3px;background:#ececf0;overflow:hidden}
        .av-bar i{display:block;height:100%;background:linear-gradient(90deg,#b8651b,#d68a3c);border-radius:3px;transition:width .25s}
        .av-av{flex:none;border-radius:50%;display:grid;place-items:center;overflow:hidden}
        .av-edit{flex:none;display:grid;place-items:center;width:24px;height:24px;border:1px solid var(--line);background:var(--bg);border-radius:6px;color:var(--sub);cursor:pointer;margin-left:auto}
        .av-edit:hover{color:var(--accent);border-color:var(--accent)}
        /* 编辑面板 */
        .av-modal{position:absolute;inset:0;background:rgba(31,35,40,.45);display:flex;align-items:center;justify-content:center;z-index:50}
        .av-edit-panel{width:min(330px,92%);background:var(--card);border:1px solid var(--line);border-radius:14px;padding:16px;box-shadow:0 10px 40px rgba(0,0,0,.15);box-sizing:border-box}
        .av-edit-hd{display:flex;align-items:center;gap:10px;margin-bottom:6px}
        .av-edit-title{font-weight:700;font-size:14px}
        .av-edit-sub{font-size:11px;color:var(--sub)}
        .av-edit-x{flex:none;margin-left:auto;display:grid;place-items:center;width:24px;height:24px;border:0;background:var(--bg);border-radius:6px;color:var(--sub);cursor:pointer}
        .av-fld{display:block;font-size:11px;color:var(--sub);margin:10px 0 4px}
        .av-inp{width:100%;box-sizing:border-box;border:1px solid var(--line);border-radius:8px;padding:7px 9px;font-size:13px;background:#fff;color:var(--ink);outline:none}
        .av-inp:focus{border-color:var(--accent)}
        .av-txt{width:100%;box-sizing:border-box;border:1px solid var(--line);border-radius:8px;padding:7px 9px;font-size:13px;background:#fff;color:var(--ink);outline:none;font-family:inherit;resize:vertical}
        .av-txt:focus{border-color:var(--accent)}
        .av-edit-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:16px}
        .av-edit-actions .av-btn.primary{margin-left:0}
        /* 共享任务列表 按依赖分层 */
        .av-layers{display:grid;grid-template-columns:1fr;gap:8px;margin-bottom:12px}
        @media(min-width:560px){.av-layers{grid-template-columns:repeat(3,1fr)}}
        .av-col{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:10px}
        .av-col h5{margin:0 0 8px;font-size:12px;display:flex;align-items:center;gap:6px;color:var(--sub)}
        .av-col h5 b{font-size:11px;color:var(--ink)}
        .av-col h5 span{font-size:10px;color:#c0c4cc;font-weight:400}
        .av-tk{font-size:12px;padding:7px 9px;border:1px solid var(--line);border-radius:8px;margin-bottom:6px;background:var(--bg)}
        .av-tk[data-s=done]{opacity:.72}
        .av-tk[data-s=run]{border-color:var(--accent)}
        .av-tk[data-s=block]{border-left:2px solid #d23c3c}
        .av-tk .av-tk-id{font-size:10px;color:var(--sub);font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
        .av-tk .av-tk-t{font-weight:600;margin:2px 0 3px}
        .av-tk .av-tk-a{font-size:10px;color:var(--sub);display:flex;align-items:center;justify-content:space-between;gap:4px}
        .av-tk .av-dep{font-size:9px;color:#c0c4cc;margin-top:2px}
        .av-st-tag{font-size:9px;padding:1px 6px;border-radius:10px;background:var(--accent-soft);color:var(--accent);white-space:nowrap}
        .av-st-tag.ok{background:#e7f4ec;color:var(--ok)}
        .av-st-tag.block{background:#fbecec;color:#d23c3c}
        .av-empty{color:var(--sub);font-size:11px;text-align:center;padding:8px 0}
        /* 主体布局：左看板 + 右通讯 */
        .av-body{display:flex;gap:12px;align-items:flex-start}
        .av-left{flex:1;min-width:0}
        .av-feed{width:100%;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:10px;box-sizing:border-box}
        @media(min-width:760px){.av-feed{width:250px;flex:none}}
        .av-feed h5{margin:0 0 8px;font-size:12px;color:var(--sub);display:flex;align-items:center;gap:6px;justify-content:space-between}
        .av-feed h5 .av-fcount{font-size:10px;color:#c0c4cc}
        .av-feed .av-fil{display:flex;gap:4px}
        .av-feed .av-fil span{font-size:10px;color:var(--sub);cursor:pointer;padding:1px 6px;border-radius:6px}
        .av-feed .av-fil span.on{background:var(--accent-soft);color:var(--accent)}
        .av-msg{display:flex;gap:8px;margin-bottom:8px;font-size:12px;line-height:1.5}
        .av-msg[data-sys]{background:var(--bg);border:1px dashed var(--line);border-radius:8px;padding:5px 7px;color:var(--sub);font-size:11px}
        .av-feed .av-who{flex:none;font-weight:700;color:var(--accent)}
        .av-feed .av-when{flex:none;font-size:10px;color:#c0c4cc;margin-left:auto}
        /* 输入 */
        .av-ask{display:flex;gap:8px;margin-top:12px}
        .av-ask input{flex:1;min-width:0;border:1px solid var(--line);border-radius:10px;padding:9px 12px;font-size:13px;background:#fff;color:var(--ink);outline:none}
        .av-ask input:focus{border-color:var(--accent)}
        .av-ask button{border:0;border-radius:10px;background:var(--accent);color:#fff;font-weight:600;font-size:13px;padding:0 18px;cursor:pointer}
        .av-ask button:disabled{opacity:.5;cursor:default}
      ` }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "av-hd",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("h3", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { dangerouslySetInnerHTML: { __html: ICON } }), " AGENT TEAMS · 共享任务列表"] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "av-team",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: "tally-squad" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "av-exp",
								children: "实验特性"
							})]
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "av-stats",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "av-stat",
								"data-k": "run",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("b", { children: [
									doneCount + runningCount,
									"/",
									6
								] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "并行执行" })]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "av-stat",
								"data-k": "ok",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: doneCount }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "完成" })]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "av-stat",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: runningCount }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "进行中" })]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "av-stat",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: todoCount }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "待领" })]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "av-stat",
								"data-k": "block",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: "0" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "阻塞" })]
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "av-ops",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
								className: "av-btn primary",
								disabled: running,
								onClick: () => {
									if (question.trim()) autoDispatch(question);
									else autoDispatch("做一个电商首页");
								},
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
									viewBox: "0 0 24 24",
									width: "13",
									height: "13",
									fill: "currentColor",
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M7 4.5v15l13-7.5z" })
								}), " 播放"]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								className: "av-btn",
								onClick: () => push("队长", "已创建新任务，等待分配"),
								children: "+ 新建任务"
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								className: "av-btn",
								onClick: reset,
								children: "重置数据"
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "av-spd",
								children: [
									.5,
									1,
									2,
									4
								].map((s) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									className: speed === s ? "on" : "",
									onClick: () => setSpeed(s),
									children: [s, "×"]
								}, s))
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "av-formation",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "av-form-cap",
								children: "编队一 · 队长居中，成员在下"
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "av-lead-card",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Avatar, {
										color: lead.color,
										size: 46
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "av-meta",
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
												className: "av-role",
												children: lead.role
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
												className: "av-name",
												children: lead.name
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: "av-chip",
												children: "待命 · 等待你提问 → 我拆解并派发队友"
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
												className: "av-chip av-chip-model",
												children: ["模型 · ", lead.model]
											})
										]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "av-num",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("b", { children: [
											doneCount,
											"/",
											tasks.length
										] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "交付" })]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										className: "av-edit",
										onClick: () => openEdit(lead),
										title: `编辑 ${lead.role}（职责 / 大模型）`,
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
											viewBox: "0 0 24 24",
											width: "13",
											height: "13",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "1.8",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M12 20h9" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" })]
										})
									})
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "av-members",
								children: members.map((m) => {
									const st = m.status === "done" ? {
										t: "完成",
										c: "ok"
									} : m.status === "run" ? {
										t: "执行中",
										c: "run"
									} : {
										t: "待命",
										c: "idle"
									};
									const cnt = tasks.filter((t) => t.assignee === m.name).length;
									return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "av-agent",
										"data-s": m.status,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: "av-ahd",
												children: [
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Avatar, {
														color: m.color,
														size: 40
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
														className: "av-ameta",
														children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
															className: "av-role",
															children: m.role
														}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
															className: "av-aname",
															children: m.name
														})]
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
														className: "av-edit",
														onClick: () => openEdit(m),
														title: `编辑 ${m.role}（职责 / 大模型）`,
														children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
															viewBox: "0 0 24 24",
															width: "13",
															height: "13",
															fill: "none",
															stroke: "currentColor",
															strokeWidth: "1.8",
															strokeLinecap: "round",
															strokeLinejoin: "round",
															children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M12 20h9" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" })]
														})
													})
												]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: "av-atags",
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: "av-st " + st.c,
													children: st.t
												}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
													className: "av-cnt",
													children: [cnt, " 项任务"]
												})]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: "av-amodel",
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
													viewBox: "0 0 24 24",
													width: "11",
													height: "11",
													fill: "none",
													stroke: "currentColor",
													strokeWidth: "1.8",
													strokeLinecap: "round",
													strokeLinejoin: "round",
													children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M21 11.5a8.4 8.4 0 0 1-8.5 8.5 8.5 8.5 0 0 1-7.5-4.5c1-1 1.5-2 1.5-3.5S5 9 4 8A8.5 8.5 0 0 1 12.5 3a8.4 8.4 0 0 1 8.5 8.5z" })
												}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: m.model })]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
												className: "av-bar",
												children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { style: { width: `${m.progress}%` } })
											})
										]
									}, m.id);
								})
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "av-body",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "av-left",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "av-layers",
								children: [
									{
										title: "无依赖·可立即领",
										note: "左 → 右 可并行",
										level: 1
									},
									{
										title: "第2层",
										note: "依赖基础层",
										level: 2
									},
									{
										title: "收尾",
										note: "依赖前两层",
										level: 3
									}
								].map((ly) => {
									const items = tasks.filter((t) => t.level === ly.level);
									return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "av-col",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("h5", { children: [
											ly.title,
											" ",
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: ly.note }),
											" ",
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("b", { children: [
												"(",
												items.length,
												")"
											] })
										] }), items.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
											className: "av-empty",
											children: "等待任务入列"
										}) : items.map((t) => {
											const st = t.status === "done" ? {
												tag: "完成",
												cls: "ok"
											} : t.status === "doing" ? {
												tag: "执行中",
												cls: ""
											} : {
												tag: "待领",
												cls: ""
											};
											return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: "av-tk",
												"data-s": t.status,
												children: [
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
														className: "av-tk-id",
														children: t.id
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
														className: "av-tk-t",
														children: t.title
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
														className: "av-tk-a",
														children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t.assignee }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
															className: "av-st-tag " + st.cls,
															children: st.tag
														})]
													}),
													t.deps.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
														className: "av-dep",
														children: ["依赖 ", t.deps.join(" ")]
													})
												]
											}, t.id);
										})]
									}, ly.level);
								})
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "av-ask",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
									value: question,
									placeholder: "输入一个任务，回车自动拆解派发…",
									onChange: (e) => setQuestion(e.target.value),
									onKeyDown: (e) => {
										if (e.key === "Enter") autoDispatch(question);
									}
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									disabled: running,
									onClick: () => autoDispatch(question),
									children: running ? "派发中" : "派发"
								})]
							})]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "av-feed",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("h5", { children: [
								"通讯 ",
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: "av-fcount",
									children: [feed.length, " 条"]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: "av-fil",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "on",
										children: "全部"
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "指令" })]
								})
							] }), feed.map((m, i) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "av-msg",
								"data-sys": m.system ? "" : void 0,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "av-who",
										children: m.from
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										style: {
											flex: 1,
											minWidth: 0
										},
										children: m.text
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "av-when",
										children: m.time
									})
								]
							}, i))]
						})]
					}),
					editing && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "av-modal",
						onClick: () => setEditing(null),
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "av-edit-panel",
							onClick: (e) => e.stopPropagation(),
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "av-edit-hd",
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Avatar, {
											color: editing.color,
											size: 34
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: "av-edit-title",
											children: ["编辑 ", editing.role]
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
											className: "av-edit-sub",
											children: "配置这个 Agent 的职责与所用大模型"
										})] }),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											className: "av-edit-x",
											onClick: () => setEditing(null),
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
												viewBox: "0 0 24 24",
												width: "14",
												height: "14",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "1.8",
												strokeLinecap: "round",
												children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M6 6l12 12M18 6L6 18" })
											})
										})
									]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
									className: "av-fld",
									children: "名称"
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
									className: "av-inp",
									value: editing.name,
									onChange: (e) => setEditing({
										...editing,
										name: e.target.value
									})
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
									className: "av-fld",
									children: "角色 ID"
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
									className: "av-inp",
									value: editing.role,
									onChange: (e) => setEditing({
										...editing,
										role: e.target.value
									})
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
									className: "av-fld",
									children: "职责（它是干什么的）"
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
									className: "av-txt",
									rows: 3,
									value: editing.duty,
									onChange: (e) => setEditing({
										...editing,
										duty: e.target.value
									})
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
									className: "av-fld",
									children: ["使用的大模型 ", harnessModels && harnessModels.length ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("em", {
										style: {
											fontStyle: "normal",
											color: "#b0b4bd",
											fontSize: 10
										},
										children: "· 已并入 Harness 本机模型"
									}) : null]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("select", {
									className: "av-inp",
									value: editing.model,
									onChange: (e) => setEditing({
										...editing,
										model: e.target.value
									}),
									children: modelOptions.map((md) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
										value: md.value,
										children: md.label
									}, md.value))
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "av-edit-actions",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										className: "av-btn",
										onClick: () => setEditing(null),
										children: "取消"
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										className: "av-btn primary",
										onClick: saveEdit,
										children: "保存"
									})]
								})
							]
						})
					})
				]
			});
		}
		function AgentTeamsPanel({ size = 16, active = false }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PanelIcon, {
				size,
				active
			});
		}
		/** 主区域面板：始终渲染完整看板（由 main slot 在 activePanelId 命中时展示）。 */
		function AgentTeamsMain() {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Board, {});
		}
		//#endregion
		//#region src/client/index.ts
		const inject = [
			"slots",
			"layout",
			"locale",
			"sessions",
			"remote",
			"remote.session"
		];
		/**
		* 在 DSH 侧栏注册「Agent Teams」全局面板。
		* 侧栏出现一个可视化入口；点开后显示编队 + 任务看板 + 通讯流，
		* 并支持提问后自动拆解派发给子 Agent 实时推进。
		*/
		function apply(ctx) {
			setModelLoader(async () => {
				try {
					const resp = await ctx.remote?.session?.modelCatalog?.();
					if (!resp || resp.ok === false) return [];
					const groups = resp.value && resp.value.groups || [];
					const opts = [];
					for (const g of groups) for (const m of g.models || []) opts.push({
						label: `${g.name || g.id} · ${m.name || m.id}`,
						value: `${g.id}/${m.id}`
					});
					return opts;
				} catch {
					return [];
				}
			});
			ctx.slots.inject("sidebar.panellist", () => ctx.slots.register({
				name: "sidebar.panellist",
				id: "agents-viz",
				order: 200,
				label: () => "Agent Teams"
			}, AgentTeamsPanel));
			ctx.slots.inject("main", () => ctx.slots.register({
				name: "main",
				key: "agents-viz",
				order: 1,
				label: () => "Agent Teams"
			}, AgentTeamsMain));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
