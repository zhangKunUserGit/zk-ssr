import React from 'react';
import s from '../styles/shoppingCart.module.scss';
// import { getCartDetail } from '../api';
import bindMethodsHoc from '../../../highOrderComponents/bindMethodsHoc';

@bindMethodsHoc(() => {
  return {
    async setPrevState(self) {
      const data = await self.getShoppingDetail();
      return {
        shoppingDetail: data
      };
    },
    async getShoppingDetail() {
      const info = await new Promise(resolve => {
        setTimeout(() => {
          resolve({
            data: { orderItemList: [] }
          });
        }, 1000);
      });
      console.log(info);
      return info.data;
    }
  };
}, s)
export default class ShoppingCart extends React.Component {
  // 判断是否加载了接口
  // 如果已经加载，但是列表是空，那将显示不同的UI
  isLoadedDetail = false;
  searchData = {};
  constructor(props) {
    super(props);
    const data = props.prevState;
    console.log(data);
    this.state = {
      shoppingDetail: data.shoppingDetail
    };
  }
  renderContentWithListLength() {
    const { shoppingDetail } = this.state;
    const { orderItemList } = shoppingDetail;
    if (!orderItemList || !orderItemList.length) {
      return (
        <div className={`${s.left} ${s.emptyWrap}`}>
          <strong className={s.emptyTitle}>Your shopping cart is empty.</strong>
          <ul className={s.emptyTips}>
            <li>
              Please continue shopping on the{' '}
              <a className={s.link} href="/" target="_self">
                AcuraPartsWarehouse.com homepage.
              </a>
            </li>
            <li>
              If you already have an account,{' '}
              <a className={s.link} href="/online/login">
                Sign In
              </a>{' '}
              to see your Cart.
            </li>
            <li>
              If you think this is an error, please visit{' '}
              <a className={s.problemLink} href="/" target="_self">
                shopping cart problems.
              </a>
            </li>
          </ul>
        </div>
      );
    }
    return (
      <React.Fragment>
        <div className={s.left}>
          <a href={this.searchData.previousURL || '/'} className={s.continue}>
            &lt;&lt;&nbsp;Continue Shopping
          </a>
          <p className={s.tipTitle}>We ship most orders in 1-3 business days.</p>
          <p className={s.tipContent}>
            Some parts may need to be ordered from one of Toyota Distribution Centers across the
            country if our local Toyota Distribution Center is out of stock. It will require
            additional time to obtain. If for any reason it takes longer than 3 business days, we
            will send a follow-up email to keep you updated on the status of your order.
          </p>
          <p className={s.tipTitle}>For Expedited Orders:</p>
          <div className={s.tipContent}>
            Part availability may affect the ship date of the order. Before placing your order,
            please send us a{' '}
            <a href="/" className={s.partAvail}>
              parts availability
            </a>{' '}
            email to make sure the part is in stock or to get an exact shipping time. If you want
            your order shipped to an alternate address other than your billing address, please use{' '}
            <strong>PayPal</strong> to avoid delays.
          </div>
        </div>
      </React.Fragment>
    );
  }
  render() {
    return (
      <div className={s.wrap}>
        <h2 className={s.title}>Shopping Cart</h2>
        <div className={`${s.content} flex-row row-left col-top`}>
          {this.renderContentWithListLength()}
        </div>
      </div>
    );
  }
}
