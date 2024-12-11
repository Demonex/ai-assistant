import { useBetween } from "use-between";
import get from "lodash.get";
import set from "lodash.set";

const useSharedHook = <T>(hook: Function, ...defaults: unknown[]) => {
	if (!get(useSharedHook, 0)) {
		set(useSharedHook, 0, new Map());
	}
	const map = get(useSharedHook, 0);
	if (!map.has(hook)) {
		map.set(hook, defaults.length ? () => hook(...defaults) : hook);
	} else {
	}
	const hookWithDefaults = map.get(hook);
	return useBetween<T>(hookWithDefaults);
};

export default useSharedHook;
