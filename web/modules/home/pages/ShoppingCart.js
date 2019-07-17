import React from 'react';
import '../styles/base.scss';
import '../styles/shoppingCart.scss';
// import { getCartDetail } from '../api';
import bindMethod from '../../../highOrderComponents/bindMethod';

@bindMethod(() => {
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
})
export default class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    const data = props.prevState;
    console.log(data);
    this.state = {
      shoppingDetail: data.shoppingDetail
    };
  }
  render() {
    return (
      <div className="wrap">
        <h2 className="title">Shopping Cart</h2>
      </div>
    );
  }
}
