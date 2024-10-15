import React, {memo} from 'react';
import {Route, Switch} from 'wouter';
import get from 'lodash.get';
import {ErrorPage} from '../pages/404/Error.js';
import {MemoComponent} from './MemoComponent.js';
import '../index.css';
import {SearchBar} from './Header/components/SearchField/index.js';
import {useSizes} from '../hooks/useSizes.js';

const PagePathsWithComponents: {
  [k: string]: {
    default: any;
  };
} = import.meta.glob('../routes/**/*.ts', {eager: true});

const routes: {
  path?: string
  component: any
}[] = [
  ...Object.keys(PagePathsWithComponents).map((_path: string) => {
    const name = get(_path.match(/\.\.\/routes\/(.*)\.ts$/), 1, '');
    const path = name === 'index' ? '/' : `/${name}`;
    const pathAbsoluteArr = path.replace(/\|/g, '/').split('/').filter((_, index) => index > 0);
    const isSubRoot = pathAbsoluteArr.length > 1 && pathAbsoluteArr.at(-1) === 'index';
    const pathAbsolute = isSubRoot ? pathAbsoluteArr.filter((_, index) => {
      return index < pathAbsoluteArr.length - 1;
    }).join('/') : pathAbsoluteArr.join('/');
    return {
      path: pathAbsolute || '/',
      component: MemoComponent(PagePathsWithComponents[_path].default)
    };
  }),
  {
    component: {
      path: undefined,
      component: MemoComponent(ErrorPage)
    }
  }
];
export const App = memo(() => {
  const {width, height} = useSizes();

  if (width === 0 || height === 0) {
    return null;
  }

  return (
    <>
      {/*<TurnOffDefaultPropsWarning/>*/}
      <Switch>
        {routes.map(({path, component: RouteComp}, index) => {
          return (
            <Route path={path} component={RouteComp as any} key={index}/>
          );
        })}
      </Switch>
      <SearchBar/>
    </>
  );
});

