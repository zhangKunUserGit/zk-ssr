import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class RenderRoutes extends React.Component {
  // 类型检查
  static propTypes = {
    routes: PropTypes.array.isRequired,
    extraProps: PropTypes.object,
    switchProps: PropTypes.object
  };
  // 默认值
  static defaultProps = {
    extraProps: {},
    switchProps: {}
  };
  render() {
    const { routes, extraProps = {}, switchProps = {} } = this.props;
    return routes ? (
      <Switch {...switchProps}>
        {routes.map((route, i) => (
          <Route
            key={route.key || i}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={props => <route.component {...props} {...extraProps} route={route} />}
          />
        ))}
      </Switch>
    ) : null;
  }
}
