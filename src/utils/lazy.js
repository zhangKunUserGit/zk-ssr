import Loadable from 'react-loadable';

export default url =>
  Loadable({
    loader: () => import(`${url}.js`),
    loading(props) {
      if (props.error) {
        throw props.error;
      }
      return 'loading.....';
    }
  });
