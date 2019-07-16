import Ajax from '../../utils/fetch';

export const getCartDetail = () => Ajax.get('/api/cart/detail');
export const updateItemQty = data => Ajax.post('/api/cart/update-cart-qty', data);

// 根据zip Code 获取运费和税金
export const getShippingTax = params => Ajax.get('/api/shipping/get-shipping-tax', params);

// payPal 支付链接
export const paypalCheckout = () => Ajax.get('/api/payment/paypal-checkout');

// 获取购物车数量
export const cartTotal = () => Ajax.get('/api/cart/total');

// 查找用户当前是否有默认地址
export const creditCardCheckout = () => Ajax.get('/api/payment/credit-card-checkout');
