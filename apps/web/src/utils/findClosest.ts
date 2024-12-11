export function findClosest(
	values: Record<string, unknown>[],
	key: string,
	target: number,
) {
	return values.reduce((best, current) => {
		return Number(current[key]) >= target && (!best || current[key] < best[key])
			? current
			: best;
	}, undefined);
}
