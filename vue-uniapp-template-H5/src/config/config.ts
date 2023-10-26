// charts图表颜色组
export const CHARTS_COLOR_GROUP = [
	'rgb(14, 109, 250)',
	'rgb(19, 194, 194)',
	'rgb(250, 173, 20)',
	'rgb(82, 196, 26)',
	'rgb(24, 144, 255)',
	'rgb(219, 26, 219)',
	'rgb(250, 140, 22)',
	'rgb(160, 217, 17)',
	'rgb(114, 46, 209)',
	'rgb(235, 47, 150)',
	'rgb(249, 219, 21)',
	'rgb(250, 84, 28)',
];
// 能源类型对应颜色
export const CHARTS_ENERGY_COLOR_MAP = new Map<string, string>([
	['01000', 'rgb(14, 109, 250)'], // 电
	['02000', 'rgb(19, 194, 194)'], // 水
	['03000', 'rgb(250, 173, 20)'], // 燃气
	['14000', 'rgb(250, 140, 22)'], // 市政热水
	['20000', 'rgb(250, 84, 28)'], // 蒸汽
]);
/**
 * 图表中能源类型对应颜色
 * @param {string} code
 * @returns {string}
 */
export const mapEnergyColorByCode = (code: string): string => {
	return CHARTS_ENERGY_COLOR_MAP?.has(code) ? CHARTS_ENERGY_COLOR_MAP.get(code) ?? 'rgb(114, 46, 209)' : 'rgb(114, 46, 209)';
};
