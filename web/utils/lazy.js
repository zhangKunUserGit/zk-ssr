import React from 'react';
import Loadable from 'react-loadable';
import LoadingBar from '@/components/base/LoadingBar';

export default (url, hiddenLoading) =>
  Loadable({
    loader: () => import(`@/${url}.js`),
    loading(props) {
      if (props.error) {
        throw props.error;
      }
      if (!hiddenLoading) {
        return <LoadingBar />;
      }
      return '';
    }
  });
