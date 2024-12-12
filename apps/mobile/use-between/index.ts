import { useEffect, useRef } from "react";
import { ReactCurrentDispatcher } from "./lib/react-shared-internals";
import { useForceUpdate } from "./lib/use-force-update";


const notImplemented = (name: string) => () => {
  const msg = `Hook "${name}" no possible to using inside useBetween scope.`;
  console.error(msg);
  throw new Error(msg);
};

const equals = (a: any, b: any) => Object.is(a, b);
const shouldUpdate = (a: any[], b: any[]) => (
  (!a || !b) ||
  (a.length !== b.length) ||
  a.some((dep: any, index: any) => !equals(dep, b[index]))
);

const detectServer = () => typeof window === "undefined";

const instances = new Map<any, any>();

let boxes = [] as any[];
let pointer = 0;
let useEffectQueue = [] as any[];
let useLayoutEffectQueue = [] as any[];
let nextTick = () => {
};

let isServer = detectServer();
let initialData = undefined as any;

const nextBox = (_pointer?) => {
  const index = pointer++;
  return (boxes[index] = boxes[index] || {});
};

const getBox = (index) => {
  return (boxes[index] = boxes[index] || {});
};

const externalDispatcher = (originDispatcher, boxIndex) => {
  return {
    useState(initialState?: any) {
      const box = getBox(boxIndex);
      boxIndex++;
      // console.log(p, pointer, 'useState');
      // console.log('boxes', pointer, boxes);

      if (!box.initialized) {
        // throw new Error('useState');
        console.error("useState", initialState);
      }

      return [box.state, box.set];
    },

    useReducer(reducer: any, initialState?: any, init?: any) {
      const box = getBox(boxIndex);
      boxIndex++;
      // console.log(p, pointer, 'useReducer');
      if (!box.initialized) {
        // throw new Error('useReducer');
        console.error("useReducer", reducer, initialState, init);
      }

      return [box.state, box.dispatch];
    },

    useEffect(fn: any, deps: any[]) {
      if (isServer) return;
      const box = getBox(boxIndex);
      boxIndex++;
      if (!box.initialized) {
        box.deps = deps;
        box.initialized = true;
        useEffectQueue.push([box, deps, fn]);
      } else if (shouldUpdate(box.deps, deps)) {
        box.deps = deps;
        useEffectQueue.push([box, deps, fn]);
      }
    },

    useLayoutEffect(fn: any, deps: any[]) {
      if (isServer) return;
      const box = getBox(boxIndex);
      boxIndex++;
      // console.log(p, pointer, 'useLayoutEffect');
      if (!box.initialized) {
        // throw new Error('useLayoutEffect');
        console.error("useLayoutEffect", fn, deps);
      } /*else if (shouldUpdate(box.deps, deps)) {
      console.warn('useLayoutEffect.deps');
      // box.deps = deps;
      // useLayoutEffectQueue.push([box, deps, fn]);
    }*/
    },

    useCallback(fn: any, deps: any[]) {
      const box = getBox(boxIndex);
      boxIndex++;
      // console.log(p, pointer, 'useCallback');
      if (!box.initialized) {
        // throw new Error('useCallback');
        console.error("useCallback", fn, deps);
      } /*else if (shouldUpdate(box.deps, deps)) {
      console.warn('useCallback.deps');
      // box.deps = deps;
      // box.fn = fn;
    }*/

      return box.fn;
    },

    useMemo(fn: any, deps: any[]) {
      const box = getBox(boxIndex);
      boxIndex++;
      // console.log(p, pointer, 'useMemo', fn, deps);
      if (!box.initialized) {
        // throw new Error('useMemo');
        console.error("useMemo", fn, deps);

      } /*else if (shouldUpdate(box.deps, deps)) {
      console.warn('useMemo.deps');
      // box.deps = deps;
      // box.state = fn();
    }*/

      return box.state;
    },

    useRef(initialValue: any) {
      const box = getBox(boxIndex);
      boxIndex++;
      // console.log(p, pointer, 'useRef');

      if (!box.initialized) {
        console.error("useRef", initialValue);
        // throw new Error('useRef');
      }

      return box.state;
    },

    useImperativeHandle(ref: any, fn: any, deps: any[]) {
      if (isServer) return;
      const box = getBox(boxIndex);
      boxIndex++;
      // console.log(p, pointer, 'useImperativeHandle');

      if (!box.initialized) {
        console.error("useImperativeHandle", ref, fn, deps);
        // throw new Error('useImperativeHandle');
      } /*else if (shouldUpdate(box.deps, deps)) {
      console.warn('useImperativeHandle.deps');
      // box.deps = deps;
      // useLayoutEffectQueue.push([box, deps, () => {
      //   typeof ref === 'function' ? ref(fn()) : ref.current = fn();
      // }]);
    }*/
    },

    useContext(context) {
      const box = getBox(boxIndex);
      boxIndex++;
      // console.log(p, pointer, 'useContext');

      if (!box.initialized) {
        console.error("useContext", context);
        // throw new Error('useContext');
      }

      box.state = originDispatcher.useContext(context);

      return box.state;
    },

    useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?) {
      const box = getBox(boxIndex);
      boxIndex++;
      // console.log(p, pointer, 'useSyncExternalStore');

      if (!box.initialized) {
        console.error("useSyncExternalStore", subscribe, getSnapshot, getServerSnapshot);
        // throw new Error('useSyncExternalStore');
      }

      box.state = originDispatcher.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

      return box.state;
    },

    useInsertionEffect(setup, dependencies?) {
      const box = getBox(boxIndex);
      boxIndex++;
      // console.log(p, pointer, 'useInsertionEffect');

      if (!box.initialized) {
        console.error("useInsertionEffect", setup, dependencies);
        // throw new Error('useInsertionEffect');
      }

      box.state = originDispatcher.useInsertionEffect(setup, dependencies);

      return box.state;
    }
  };
};

const ownDisptacher = (originDispatcher, externals) => ({
  useState(initialState?: any) {
    const box = nextBox();
    const tick = nextTick;

    if (!box.initialized) {
      box.state = typeof initialState === "function" ? initialState() : initialState;
      box.set = (fn: any) => {
        if (typeof fn === "function") {
          return box.set(fn(box.state));
        }
        if (!equals(fn, box.state)) {
          box.state = fn;
          tick();
        }
      };
      box.initialized = true;
    }

    return [box.state, box.set];
  },

  useReducer(reducer: any, initialState?: any, init?: any) {
    const box = nextBox();
    const tick = nextTick;

    // console.log('re', reducer, initialState, init);
    if (!box.initialized) {
      box.state = init ? init(initialState) : initialState;
      box.dispatch = (action: any) => {
        const state = reducer(box.state, action);
        // console.log('dispatch', box.state, action, state);
        if (!equals(state, box.state)) {
          box.state = state;
          tick();
        }
      };
      box.initialized = true;
    }

    return [box.state, box.dispatch];
  },

  useEffect(fn: any, deps: any[]) {
    if (isServer) return;
    const box = nextBox();

    if (!box.initialized) {
      box.deps = deps;
      box.initialized = true;
      useEffectQueue.push([box, deps, fn]);
    } else if (shouldUpdate(box.deps, deps)) {
      box.deps = deps;
      useEffectQueue.push([box, deps, fn]);
    }
  },

  useLayoutEffect(fn: any, deps: any[]) {
    if (isServer) return;
    const box = nextBox();

    if (!box.initialized) {
      box.deps = deps;
      box.initialized = true;
      useLayoutEffectQueue.push([box, deps, fn]);
    } else if (shouldUpdate(box.deps, deps)) {
      box.deps = deps;
      useLayoutEffectQueue.push([box, deps, fn]);
    }
  },

  useCallback(fn: any, deps: any[]) {
    const box = nextBox();

    if (!box.initialized) {
      box.fn = fn;
      box.deps = deps;
      box.initialized = true;
    } else if (shouldUpdate(box.deps, deps)) {
      box.deps = deps;
      box.fn = fn;
    }

    return box.fn;
  },

  useMemo(fn: any, deps: any[]) {
    const box = nextBox();

    if (!box.initialized) {
      box.deps = deps;
      box.state = fn();
      box.initialized = true;
    } else if (shouldUpdate(box.deps, deps)) {
      box.deps = deps;
      box.state = fn();
    }

    return box.state;
  },

  useRef(initialValue: any) {
    const box = nextBox();

    if (!box.initialized) {
      box.state = { current: initialValue };
      box.initialized = true;
    }

    return box.state;
  },

  useImperativeHandle(ref: any, fn: any, deps: any[]) {
    if (isServer) return;
    const box = nextBox();

    if (!box.initialized) {
      box.deps = deps;
      box.initialized = true;
      useLayoutEffectQueue.push([box, deps, () => {
        typeof ref === "function" ? ref(fn()) : ref.current = fn();
      }]);
    } else if (shouldUpdate(box.deps, deps)) {
      box.deps = deps;
      useLayoutEffectQueue.push([box, deps, () => {
        typeof ref === "function" ? ref(fn()) : ref.current = fn();
      }]);
    }
  },

  useContext(context) {
    const box = nextBox();

    if (!box.initialized) {
      box.state = originDispatcher.useContext(context);
      box.initialized = true;
      externals.push([originDispatcher.useContext, [context]]);
    }

    return box.state;
  },

  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?) {
    const box = nextBox();

    if (!box.initialized) {
      box.state = originDispatcher.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
      box.initialized = true;
      externals.push([originDispatcher.useSyncExternalStore, [subscribe, getSnapshot, getServerSnapshot]]);
    }

    return box.state;
  },

  useInsertionEffect(setup, dependencies?) {
    const box = nextBox();

    if (!box.initialized) {
      box.state = originDispatcher.useInsertionEffect(setup, dependencies);
      box.initialized = true;
      externals.push(originDispatcher.useInsertionEffect, [setup, dependencies]);
    }

    return box.state;
  }
});

/*
if (reactDispatcher) {
  console.log('reactDispatcher', Object.keys(reactDispatcher));
  Object.entries(reactDispatcher).forEach(([key, value]) => {
    if (key in ownDisptacher) {
      return;
    }
    ownDisptacher[key] = value;
  });
}*/
/*

[
  'readContext',
  // 'useContext',
  'useDebugValue',
  'useResponder',
  'useDeferredValue',
  'useTransition'
].forEach(key => (ownDisptacher as any)[key] = notImplemented(key));
*/

const factory = (hook: any, options?: any) => {
  const scopedBoxes = [] as any[];
  let syncs = [] as any[];
  let state = undefined as any;
  let unsubs = [] as any[];
  let mocked = false;
  let externals = [] as any[];

  if (options && options.mock) {
    state = options.mock;
    mocked = true;
  }

  const sync = () => {
    syncs.slice().forEach(fn => {
      // console.log('fn', fn);
      fn();
    });
  };

  const tick = () => {
    if (mocked) return;

    const originDispatcher = ReactCurrentDispatcher.current;

    const originState = [
      pointer,
      useEffectQueue,
      useLayoutEffectQueue,
      boxes,
      nextTick
    ] as any;

    let tickAgain = false;
    let tickBody = true;

    pointer = 0;
    useEffectQueue = [];
    useLayoutEffectQueue = [];

    boxes = scopedBoxes;

    nextTick = () => {
      if (tickBody) {
        tickAgain = true;
      } else {
        tick();
      }
    };

    ReactCurrentDispatcher.current = ownDisptacher(originDispatcher, externals) as any;

    state = hook(initialData);

    // console.log('externals', externals);

    [useLayoutEffectQueue, useEffectQueue].forEach(queue => (
      queue.forEach(([box, deps, fn]) => {
        box.deps = deps;
        if (box.unsub) {
          const unsub = box.unsub;
          unsubs = unsubs.filter(fn => fn !== unsub);
          unsub();
        }
        const unsub = fn();
        if (typeof unsub === "function") {
          unsubs.push(unsub);
          box.unsub = unsub;
        } else {
          box.unsub = null;
        }
      })
    ));

    [
      pointer,
      useEffectQueue,
      useLayoutEffectQueue,
      boxes,
      nextTick
    ] = originState;

    ReactCurrentDispatcher.current = originDispatcher;

    tickBody = false;
    if (!tickAgain) {
      sync();
      return;
    }
    tick();
  };

  const externalTick = (_initialData?) => {
    if (mocked) return;

    const originDispatcher = ReactCurrentDispatcher.current;

    const originState = [
      pointer,
      useEffectQueue,
      useLayoutEffectQueue,
      boxes,
      nextTick
    ] as any;

    let tickAgain = false;
    let tickBody = true;

    pointer = 0;
    // useEffectQueue = [];
    // useLayoutEffectQueue = [];

    boxes = scopedBoxes;

    nextTick = () => {
      if (tickBody) {
        // tickAgain = true;
      } else {
        // externalTick();
      }
    };

    ReactCurrentDispatcher.current = externalDispatcher(originDispatcher, pointer) as any;

    // console.log('_initialData', _initialData, pointer);
    state = hook(initialData);
    // console.log('state', state, pointer);

    // console.log('contexts.2', state, externals);

    /*    [useLayoutEffectQueue, useEffectQueue].forEach(queue => (
      queue.forEach(([box, deps, fn]) => {
        box.deps = deps;
        if (box.unsub) {
          const unsub = box.unsub;
          unsubs = unsubs.filter(fn => fn !== unsub);
          unsub();
        }
        const unsub = fn();
        if (typeof unsub === 'function') {
          unsubs.push(unsub);
          box.unsub = unsub;
        } else {
          box.unsub = null;
        }
      })
    ));*/

    [
      pointer,
      useEffectQueue,
      useLayoutEffectQueue,
      boxes,
      nextTick
    ] = originState;

    ReactCurrentDispatcher.current = originDispatcher;

    tickBody = false;
    if (!tickAgain) {
      // TODO check
      // sync();
      return;
    }
    // externalTick();
  };

  const sub = (fn: any) => {
    if (syncs.indexOf(fn) === -1) {
      syncs.push(fn);
    }
  };
  const unsub = (fn: any) => {
    syncs = syncs.filter(f => f !== fn);
  };

  const mock = (obj: any) => {
    mocked = true;
    state = obj;
    sync();
  };
  const unmock = () => {
    mocked = false;
    tick();
  };

  return {
    init: () => tick(),
    get: () => state,
    sub,
    unsub,
    unsubs: () => unsubs,
    mock,
    unmock,
    externals: () => externals,
    externalTick: () => externalTick(state)
  };
};

const getInstance = (hook: any): any => {
  let inst = instances.get(hook);

  if (inst) {
    // console.log('inst', hook);
  }
  if (!inst) {
    // console.log('!inst', hook);
    inst = factory(hook);
    instances.set(hook, inst);
    inst.init();
  } else if (inst.externals().length > 0) {
    // console.log('externals', inst.externals().length, hook);
    inst.externalTick();
  }

  // console.log('externals', inst.externals());

  return inst;
};

type Hook<T> = (initialData?: any) => T

export const useBetween = <T>(hook: Hook<T>): T => {
  const forceUpdate = useForceUpdate();
  const inst = getInstance(hook);
  const externals = inst.externals();

  // console.log('externals', (new Error()).stack.split("\n")[3].trim().split(" ")[1]);

  inst.sub(forceUpdate);
  useEffect(
    () => {
      inst.sub(forceUpdate);
      return () => {
        inst.unsub(forceUpdate);
        if (externals.length) {
          // console.log('freeSpec', inst, hook);
          // freeSpec(inst, hook);
        }
      };
    },
    [inst, forceUpdate]
  );
  return inst.get();
};

export const useInitial = <T = any>(data?: T, server?: boolean) => {
  const ref = useRef<number>();
  if (!ref.current) {
    isServer = typeof server === "undefined" ? detectServer() : server;
    isServer && clear();
    initialData = data;
    ref.current = 1;
  }
};

export const mock = <T>(hook: Hook<T>, state: any): () => void => {
  let inst = instances.get(hook);
  if (inst) inst.mock(state);
  else {
    inst = factory(hook, { mock: state });
    instances.set(hook, inst);
  }
  return inst.unmock;
};

export const get = <T>(hook: Hook<T>): T => getInstance(hook).get();

export const free = function(...hooks: Hook<any>[]): void {
  if (!hooks.length) {
    hooks = [];
    instances.forEach((_instance, hook) => hooks.push(hook));
  }

  let inst;
  hooks.forEach((hook) => (
    (inst = instances.get(hook)) &&
    inst.unsubs().slice().forEach((fn: any) => fn())
  ));
  hooks.forEach((hook) => instances.delete(hook));
};

export const freeSpec = function(inst: any, hook: Hook<any>): void {
  (inst = instances.get(hook)) &&
  inst.unsubs().slice().forEach((fn: any) => fn());
};

export const clear = () => instances.clear();

export const on = <T>(hook: Hook<T>, fn: (state: T) => void): () => void => {
  const inst = getInstance(hook);
  const listener = () => fn(inst.get());
  inst.sub(listener);
  return () => inst.unsub(listener);
};
