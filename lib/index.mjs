//#region src/index.ts
/**
* Agent Teams 可视化插件 —— Host（服务端）入口。
* 本插件主要工作在客户端侧栏；这里只登记最小宿主生命周期。
*/
function apply(ctx) {
	ctx.logger.info("[dsh-agents-viz] Agent Teams 可视化插件已加载。");
}
//#endregion
export { apply };
