import React, {memo} from 'react';

export const MemoComponent = (Component) => memo(() => {
  return (
    <Component/>
  );
});
