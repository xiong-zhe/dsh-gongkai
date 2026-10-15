window.__ModuleLoader__.load({
	id: "dsh-agents-viz",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region src/client/AgentTeamsPanel.tsx
		const INITIAL_AGENTS = [
			{
				id: "lead",
				name: "队长",
				role: "team-lead",
				status: "idle",
				progress: 0
			},
			{
				id: "backend",
				name: "后端",
				role: "backend-dev",
				status: "idle",
				progress: 0
			},
			{
				id: "frontend",
				name: "前端",
				role: "frontend-dev",
				status: "idle",
				progress: 0
			},
			{
				id: "qa",
				name: "QA",
				role: "qa-engineer",
				status: "idle",
				progress: 0
			},
			{
				id: "review",
				name: "评审",
				role: "reviewer",
				status: "idle",
				progress: 0
			},
			{
				id: "design",
				name: "设计",
				role: "ui-designer",
				status: "idle",
				progress: 0
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
		function Board() {
			const [agents, setAgents] = (0, react.useState)(INITIAL_AGENTS);
			const [tasks, setTasks] = (0, react.useState)([]);
			const [feed, setFeed] = (0, react.useState)([{
				from: "队长",
				text: "团队就绪，等待任务…",
				time: now()
			}]);
			const [question, setQuestion] = (0, react.useState)("");
			const [running, setRunning] = (0, react.useState)(false);
			const timers = (0, react.useRef)([]);
			(0, react.useEffect)(() => () => {
				timers.current.forEach((t) => {
					clearTimeout(t);
					clearInterval(t);
				});
			}, []);
			function push(from, text) {
				setFeed((f) => [...f, {
					from,
					text,
					time: now()
				}].slice(-50));
			}
			function autoDispatch(q) {
				const text = q.trim();
				if (text === "" || running) return;
				setRunning(true);
				setTasks([]);
				setAgents(INITIAL_AGENTS.map((a) => ({ ...a })));
				push("队长", `收到任务「${text}」，拆解为 5 个子任务并分发给团队`);
				const plan = [
					{
						assignee: "后端",
						title: "设计数据模型与后端 API"
					},
					{
						assignee: "前端",
						title: "搭建前端页面与交互"
					},
					{
						assignee: "设计",
						title: "界面视觉与体验设计"
					},
					{
						assignee: "QA",
						title: "编写测试用例并执行"
					},
					{
						assignee: "评审",
						title: "代码审查与质量把关"
					}
				];
				plan.forEach((job, i) => {
					timers.current.push(window.setTimeout(() => {
						setTasks((prev) => [...prev, {
							id: `${i}-${Date.now()}`,
							title: job.title,
							assignee: job.assignee,
							status: "doing"
						}]);
						setAgents((prev) => prev.map((a) => a.name === job.assignee ? {
							...a,
							status: "run",
							progress: 8
						} : a));
						push(job.assignee, `开始处理「${job.title}」`);
						let p = 8;
						const iv = window.setInterval(() => {
							p += 16;
							if (p >= 100) {
								window.clearInterval(iv);
								setAgents((prev) => prev.map((a) => a.name === job.assignee ? {
									...a,
									status: "done",
									progress: 100
								} : a));
								setTasks((prev) => prev.map((t) => t.assignee === job.assignee ? {
									...t,
									status: "done"
								} : t));
								push(job.assignee, `完成「${job.title}」`);
							} else setAgents((prev) => prev.map((a) => a.name === job.assignee ? {
								...a,
								progress: p
							} : a));
						}, 260);
						timers.current.push(iv);
					}, (i + 1) * 700));
				});
				timers.current.push(window.setTimeout(() => {
					push("队长", "5 个子任务已全部完成，汇总成果中");
					setRunning(false);
				}, plan.length * 700 + 1300 + 400));
			}
			const doneCount = tasks.filter((t) => t.status === "done").length;
			const runningCount = tasks.filter((t) => t.status === "doing").length;
			const doneAgents = agents.filter((a) => a.status === "done").length;
			const lead = agents[0];
			const members = agents.slice(1);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "av-wrap",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("style", { children: `
        .av-wrap{--accent:#b8651b;--accent-soft:#f6ece0;--bg:#f5f5f7;--card:#ffffff;--line:#e6e6ea;--ink:#1f2328;--sub:#6b7280;--ok:#2f8f5b;--run:#b8651b;
          font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Microsoft YaHei',sans-serif;background:var(--bg);color:var(--ink);
          height:100%;min-height:0;overflow:auto;padding:14px;box-sizing:border-box;font-size:13px}
        .av-hd{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px}
        .av-hd h3{margin:0;font-size:15px;font-weight:700;display:flex;align-items:center;gap:8px}
        .av-hd h3 i{display:grid;place-items:center;width:26px;height:26px;border-radius:8px;background:var(--accent);color:#fff;font-style:normal}
        .av-stats{display:flex;gap:8px}
        .av-stat{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:6px 10px;text-align:center;min-width:48px}
        .av-stat b{display:block;font-size:16px;line-height:1.1}
        .av-stat span{font-size:10px;color:var(--sub)}
        .av-lead{display:flex;align-items:center;gap:12px;background:var(--card);border:1px solid var(--line);border-left:3px solid var(--accent);border-radius:12px;padding:10px 12px;margin-bottom:10px}
        .av-lead .av-av{width:40px;height:40px;border-radius:50%;background:var(--accent);color:#fff;display:grid;place-items:center;font-weight:700;font-size:16px;flex:none}
        .av-lead .av-meta{flex:1;min-width:0}
        .av-lead .av-name{font-weight:700;font-size:14px}
        .av-lead .av-role{font-size:11px;color:var(--sub)}
        .av-chip{font-size:10px;padding:2px 8px;border-radius:20px;background:var(--accent-soft);color:var(--accent);white-space:nowrap}
        .av-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:10px}
        @media(min-width:520px){.av-grid{grid-template-columns:repeat(3,1fr)}}
        .av-agent{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:9px 10px}
        .av-agent[data-s=run]{border-color:var(--accent);box-shadow:0 0 0 1px var(--accent)}
        .av-agent[data-s=done]{border-color:#cfe7d8}
        .av-agent .av-row{display:flex;align-items:center;justify-content:space-between;gap:6px}
        .av-agent .av-n{font-weight:600;font-size:12px}
        .av-agent .av-r{font-size:10px;color:var(--sub);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
        .av-dot{width:8px;height:8px;border-radius:50%;flex:none}
        .av-dot[data-s=idle]{background:#d1d5db}
        .av-dot[data-s=run]{background:var(--run);animation:avp 1s infinite}
        .av-dot[data-s=done]{background:var(--ok)}
        @keyframes avp{50%{opacity:.4}}
        .av-bar{height:5px;border-radius:3px;background:#ececf0;margin-top:8px;overflow:hidden}
        .av-bar i{display:block;height:100%;background:linear-gradient(90deg,#b8651b,#d68a3c);border-radius:3px;transition:width .25s}
        .av-board{display:grid;grid-template-columns:1fr;gap:8px;margin-bottom:10px}
        @media(min-width:560px){.av-board{grid-template-columns:repeat(3,1fr)}}
        .av-col{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:10px}
        .av-col h5{margin:0 0 8px;font-size:12px;display:flex;align-items:center;gap:6px;color:var(--sub)}
        .av-col h5 b{font-size:11px;color:var(--ink)}
        .av-tk{font-size:12px;padding:7px 9px;border:1px solid var(--line);border-radius:8px;margin-bottom:6px;background:var(--bg)}
        .av-tk[data-s=done]{opacity:.72}
        .av-tk .av-tk-t{font-weight:600;margin-bottom:3px}
        .av-tk .av-tk-a{font-size:10px;color:var(--sub)}
        .av-empty{color:var(--sub);font-size:11px;text-align:center;padding:8px 0}
        .av-feed{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:10px}
        .av-feed h5{margin:0 0 8px;font-size:12px;color:var(--sub);display:flex;align-items:center;gap:6px}
        .av-feed .av-msg{display:flex;gap:8px;margin-bottom:8px;font-size:12px;line-height:1.5}
        .av-feed .av-who{flex:none;font-weight:700;color:var(--accent)}
        .av-feed .av-when{flex:none;font-size:10px;color:#c0c4cc;margin-left:auto}
        .av-ask{display:flex;gap:8px;margin-top:12px}
        .av-ask input{flex:1;min-width:0;border:1px solid var(--line);border-radius:10px;padding:9px 12px;font-size:13px;background:#fff;color:var(--ink);outline:none}
        .av-ask input:focus{border-color:var(--accent)}
        .av-ask button{border:0;border-radius:10px;background:var(--accent);color:#fff;font-weight:600;font-size:13px;padding:0 16px;cursor:pointer}
        .av-ask button:disabled{opacity:.5;cursor:default}
      ` }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "av-hd",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("h3", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { dangerouslySetInnerHTML: { __html: ICON } }), " Agent Teams"] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "av-stats",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "av-stat",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("b", { children: [
										doneCount,
										"/",
										tasks.length || doneCount
									] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "完成" })]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "av-stat",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: runningCount }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "进行中" })]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "av-stat",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("b", { children: [
										doneAgents,
										"/",
										agents.length
									] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "在线" })]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "av-lead",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "av-av",
								children: "长"
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "av-meta",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "av-name",
									children: [
										lead.name,
										" ",
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
											className: "av-role",
											children: ["· ", lead.role]
										})
									]
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									style: { marginTop: 4 },
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "av-chip",
										children: "拆解任务 · 派单调度"
									})
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "av-stat",
								style: { minWidth: 40 },
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("b", { children: [
									doneCount,
									"/",
									tasks.length
								] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "交付" })]
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "av-grid",
						children: members.map((m) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "av-agent",
							"data-s": m.status,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "av-row",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "av-n",
										children: m.name
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "av-dot",
										"data-s": m.status
									})]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "av-row",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "av-r",
										children: m.role
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										style: {
											fontSize: 10,
											color: "var(--sub)"
										},
										children: [tasks.filter((t) => t.assignee === m.name).length, " 任务"]
									})]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: "av-bar",
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { style: { width: `${m.progress}%` } })
								})
							]
						}, m.id))
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "av-board",
						children: [["doing", "done"].map((col) => {
							const label = col === "doing" ? "进行中" : "已完成";
							const items = tasks.filter((t) => t.status === col);
							return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "av-col",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("h5", { children: [
									label,
									" ",
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("b", { children: [
										"(",
										items.length,
										")"
									] })
								] }), items.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: "av-empty",
									children: "暂无"
								}) : items.map((t) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "av-tk",
									"data-s": col,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: "av-tk-t",
										children: t.title
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "av-tk-a",
										children: ["负责人：", t.assignee]
									})]
								}, t.id))]
							}, col);
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "av-col",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("h5", { children: ["待办 ", /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("b", { children: [
								"(",
								tasks.filter((t) => t.status === "todo").length,
								")"
							] })] }), tasks.filter((t) => t.status === "todo").length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "av-empty",
								children: "暂无"
							}) : tasks.filter((t) => t.status === "todo").map((t) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "av-tk",
								"data-s": "todo",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: "av-tk-t",
									children: t.title
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "av-tk-a",
									children: ["负责人：", t.assignee]
								})]
							}, t.id))]
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "av-feed",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h5", { children: "通讯流" }), feed.map((m, i) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "av-msg",
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
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
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
					})
				]
			});
		}
		function AgentTeamsPanel({ size = 16, active = false }) {
			if (!active) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PanelIcon, {
				size,
				active: false
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Board, {});
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
			"locale"
		];
		/**
		* 在 DSH 侧栏注册「Agent Teams」全局面板。
		* 侧栏出现一个可视化入口；点开后显示编队 + 任务看板 + 通讯流，
		* 并支持提问后自动拆解派发给子 Agent 实时推进。
		*/
		function apply(ctx) {
			ctx.slots.inject("sidebar.panellist", () => ctx.slots.register({
				name: "sidebar.panellist",
				id: "agents-viz",
				order: 200,
				label: () => "Agent Teams",
				locale: "agents-viz",
				inject: () => ({})
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
