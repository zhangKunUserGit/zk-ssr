export const LoginStatus = {
  UnKnown: { value: -1, name: 'UnKnown' },
  NoLogin: { value: 0, name: 'NoLogin' },
  LoggingIn: { value: 1, name: 'LoggingIn' },
  LoggedIn: { value: 2, name: 'LoggedIn' },
  Expired: { value: 3, name: 'Expired' },
  Relogin: { value: 4, name: 'Relogin' },
  UnAuthority: { value: 5, name: 'UnAuthority' } // 无权限访问
};

export const CheckoutStepList = [
  { value: 1, name: 'Shipping' },
  { value: 2, name: 'Payment & Billing' },
  { value: 3, name: 'Review & Complete' }
];
