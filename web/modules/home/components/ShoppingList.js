import React from 'react';
import PropTypes from 'prop-types';
import s from '../styles/shoppingList.scss';
import Select from '../../../components/base/Select';
import QuantityOptions from '../constants/quantityOptions';
import InputNumber from '../../../components/base/InputNumber';
import { isMobile } from '../../../utils/devices';
import { isBlank } from '../../../utils/string';
import { getNumber } from '../../../utils/get';

export default class ShoppingList extends React.Component {
  disabledClick = false;
  isMobile = isMobile();
  // 类型检查
  static propTypes = {
    list: PropTypes.array.isRequired,
    onChange: PropTypes.func
  };
  // 默认值
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {
      list: this.getShoppingList()
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const nextList = this.props.list;
    if (prevProps.list !== nextList) {
      this.setState({
        list: this.getShoppingList()
      });
    }
  }
  getShoppingList = () => {
    const nextList = this.props.list || [];
    return nextList.map(item => {
      if (item.quantity > 9) {
        item.selectedInput = true;
      }
      // 此处深度复制，缓存props值
      return { ...item };
    });
  };
  onCallback = (item, isRemove) => {
    if (this.disabledClick) {
      return;
    }
    const { onChange } = this.props;
    if (onChange) {
      onChange({ ...item, quantity: isRemove ? 0 : item.quantity }, 'quantity');
    }
  };
  onQtyChange = (value, index) => {
    const { list } = this.state;
    const number = getNumber(value);
    list[index].quantity = number;
    if (number > 9) {
      list[index].selectedInput = true;
      list[index].isUpdate = true;
      this.setState({ list });
      return;
    }
    this.onCallback(list[index]);
  };
  onInputNumberChange = (value, index) => {
    const prevValue = this.props.list[index].quantity;
    const nextValue = getNumber(value);
    const list = this.state.list;
    list[index].quantity = nextValue;
    list[index].isUpdate = prevValue !== nextValue;
    this.setState({
      list
    });
  };
  onInputNumberBlur = (value, index) => {
    if (isBlank(value)) {
      this.disabledClick = true;
      const prevValue = this.props.list[index].quantity;
      const list = this.state.list;
      list[index].quantity = prevValue;
      list[index].isUpdate = false;
      this.setState(
        {
          list
        },
        () => {
          this.disabledClick = false;
        }
      );
    }
  };
  renderQty = (item, index) => {
    const { quantity, selectedInput, isUpdate } = item;
    if (!selectedInput) {
      return (
        <Select
          placement="centerBottom"
          className="form-group"
          dropClassName={s.dropdown}
          options={QuantityOptions}
          value={quantity}
          hiddenIcon={true}
          onChange={s => this.onQtyChange(s.value, index)}
        />
      );
    }
    return (
      <div className="form-group">
        <InputNumber
          min={1}
          isPositive={true}
          className="form-control text-center"
          value={quantity}
          onChange={v => this.onInputNumberChange(v, index)}
          onBlur={ev => this.onInputNumberBlur(ev.target.value, index)}
        />
        {isUpdate ? (
          <span className={s.update} onClick={() => this.onCallback(item)}>
            Update
          </span>
        ) : (
          ''
        )}
      </div>
    );
  };
  renderPcTable = () => {
    const { list } = this.state;
    return (
      <table className={s.table}>
        <thead>
          <tr>
            <th>Part No.</th>
            <th>Part Description</th>
            <th>Price</th>
            <th>Qty.</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => {
            const { partNumber, partSource, productName, replacePartNumber, price, total } = item;
            return (
              <tr key={index}>
                <td>
                  <a className={s.number} href={partSource}>
                    {partNumber}
                  </a>
                </td>
                <td>
                  <a className={s.desc} href={partSource}>
                    {productName}
                  </a>
                  {replacePartNumber ? (
                    <p className={s.replace}>Replaced by: {replacePartNumber}</p>
                  ) : (
                    ''
                  )}
                  <br />
                  <span className={s.remove} onClick={() => this.onCallback(item, true)}>
                    Remove
                  </span>
                </td>
                <td className={s.price}>${price}</td>
                <td className={s.qtyInput}>{this.renderQty(item, index)}</td>
                <td className={s.subtotal}>${total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  renderMobileTable = () => {
    const { list } = this.state;
    return (
      <table className={s.table}>
        <tbody>
          {list.map((item, index) => {
            const { partNumber, partSource, productName, replacePartNumber, price } = item;
            return (
              <tr key={index}>
                <td>
                  <div>
                    <a className={s.number} href={partSource}>
                      Part No.: {partNumber}
                    </a>
                  </div>
                  <a className={s.desc} href={partSource}>
                    {productName}
                  </a>
                  {replacePartNumber ? (
                    <p className={s.replace}>Replaced by: {replacePartNumber}</p>
                  ) : (
                    ''
                  )}
                  <br />
                  <span className={s.remove} onClick={() => this.onCallback(item, true)}>
                    Remove
                  </span>
                </td>
                <td>
                  <strong className={s.subtotal}>${price}</strong>
                  <div className={s.qtyInput}>{this.renderQty(item, index)}</div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  render() {
    return this.isMobile ? this.renderMobileTable() : this.renderPcTable();
  }
}
