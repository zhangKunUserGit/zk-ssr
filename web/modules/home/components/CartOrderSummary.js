import React from 'react';
import classNames from 'classnames';
import s from '../styles/cartOrderSummary.scss';
import { isPrime } from '../../../utils/site';

export default class CartOrderSummary extends React.Component {
  isPrime = isPrime();
  // 类型检查
  static propTypes = {
    // list: PropTypes.array.isRequired,
    // onChange: PropTypes.func
  };
  // 默认值
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {
      zipCodeErrorMessage: '', // zip code不合法的提示
      summaryInfo: {}
    };
  }

  render() {
    const { subTotal } = this.props;
    return (
      <div className={s.wrap}>
        <div className={s.top}>
          <div className={s.subtotal}>
            <strong>Subtotal: </strong>
            <strong className="text-red">${subTotal}</strong>
          </div>
          <button
            className={classNames([
              'btn btn-max',
              s.checkoutBtn,
              { 'btn-green': this.isPrime, 'btn-red': !this.isPrime }
            ])}
            onClick={this.goShippingAddress}
          >
            <img src={require('../imgs/icon_btn_secure.png')} alt="lock" />
            SECURE CHECKOUT
          </button>
          <div className={s.or}>- OR -</div>
          <button
            className={`btn btn-orange btn-max remove-hover ${s.paypalBtn}`}
            onClick={this.onPayPal}
          >
            Checkout with
            <img src={require('@/assets/imgs/icon_btn_paypal.png')} alt="paypal" />
          </button>
        </div>
      </div>
    );
  }
}
