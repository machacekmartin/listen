/* eslint-disable prefer-arrow/prefer-arrow-functions */
function useGroupBy<Type extends { [key: string]: any }>(
	array: Type[],
	key: string
): Record<string, Type[]> {
	return array.reduce((groups: Record<string, Type[]>, item) => {
		const val = item[key];
		groups[val] = groups[val] || [];
		groups[val].push(item);
		return groups;
	}, {});
}

export default useGroupBy;
