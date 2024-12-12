import {useBetween} from '../../use-between';
import get from 'lodash.get';
import set from 'lodash.set';


const useSharedHook = <T>(hook: Function, ...defaults: unknown[]) => {
  if (!get(useSharedHook, 0)) {
    set(useSharedHook, 0, new Map());
  }
  const map = get(useSharedHook, 0);
  if (!map.has(hook)) {
    // console.log('!exist', ...defaults);
    map.set(hook, defaults.length ? () => hook(...defaults) : hook);
  } else {
    // console.log('exist');
  }
  const hookWithDefaults = map.get(hook);
  // console.log('hookWithDefaults', hookWithDefaults);
  return useBetween<T>(hookWithDefaults);
};

export default useSharedHook;
