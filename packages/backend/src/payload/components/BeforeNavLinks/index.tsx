import React from 'react';
import {useHistory} from 'react-router-dom';

import {useLocale} from '@stigma-io/payload/dist/admin/components/utilities/Locale';

const BeforeNavLinks: React.FC = () => {
  const history = useHistory();
  const _locale = useLocale();
  const [locale] = React.useState(_locale);
  React.useEffect(() => {
    if (_locale !== locale) {
      console.log('_locale', _locale, locale, history);
      history.go(0);
    }
  }, [_locale]);
  return null;
};

export default BeforeNavLinks;
