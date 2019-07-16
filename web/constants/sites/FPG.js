export default {
  BrandCompany: 'Ford Motor Company',
  ResellerRatingID: '41619',
  ResellerRatingLink: 'http://www.resellerratings.com/store/survey/fordpartsgiant',
  EmailTop: [
    {
      name: 'Ford',
      href: '/'
    },
    {
      name: 'Lincoln',
      href: '/lincoln-parts.html'
    },
    {
      name: 'Mercury',
      href: '/mercury-parts.html'
    },
    {
      name: 'Accessories',
      href: '/ford-accessories.html'
    }
  ],
  // 这里需要与PC做区分，为了模板中使用
  EmailTopMobile: [
    {
      name: 'Ford Parts',
      isDropdown: true,
      children: [
        {
          name: 'Ford',
          href: '/'
        },
        {
          name: 'Lincoln',
          href: '/lincoln-parts.html'
        },
        {
          name: 'Mercury',
          href: '/mercury-parts.html'
        }
      ]
    },
    {
      name: 'Accessories',
      href: '/ford-accessories.html'
    }
  ],
  ShippingCostDays: 'We ship most orders within 2 business days.',
  PaypalHeaderImage: 'http://www.fordpartsgiant.com/online/images/fpg/fpg_logo.png',
  PaypalBrandName: 'Fordpartsgiant.com',
  CompanyName: 'Genuine Parts Giant, Inc',
  DPFTitle: 'by GenuinePartsGiant',
  RMAPhone: '1-888-788-9341',
  ContactUsUrl: 'http://www.fordpartsgiant.com/service/contact.html?rdoEmail=S2',
  RMAUrl: 'http://www.fordpartsgiant.com/service/return-request.html',
  // 网站全称全小写形式
  WebsiteNameLower: 'fordpartsgiant',
  // 网站全称驼峰式写法
  WebsiteNameCamel: 'FordPartsGiant',
  // 网站全称首字母大写
  WebsiteNameCapital: 'Fordpartsgiant',
  // 网站全称全大写形式
  WebsiteNameSplit: 'Ford Parts Giant',
  // 网站名称的缩写
  WebsiteNameAbbr: 'FPG',
  // 车型名称
  Manufacturer: 'Ford',
  // Info邮箱
  InfoMail: 'info@fordpartsgiant.com',
  // OA Info邮箱
  OAInfoMail: 'orderverification@fordpartsgiant.com',
  // OS Info邮箱
  OSInfoMail: 'orderprocessing@fordpartsgiant.com',
  // ReturnsInfoMail邮箱
  ReturnsInfoMail: 'returns@fordpartsgiant.com',
  // Service邮箱
  ServiceMail: 'service@fordpartsgiant.com',
  // Contact Us页面的链接
  ContactUsLink: 'http://www.fordpartsgiant.com/service/contact-us.html',
  // FAQ首页的链接
  FaqLink: 'https://www.fordpartsgiant.com/service/ford-parts-faq.html',
  // Return Policy页面的链接
  ReturnPolicyLink: 'https://www.fordpartsgiant.com/service/ford-parts-rma.html',
  // Terms and Conditions页面的链接
  TermsConditionsLink: 'https://www.fordpartsgiant.com/service/terms-and-conditions.html',
  // Privacy Policy页面的链接
  PrivacyPolicyLink: 'https://www.fordpartsgiant.com/service/ford-parts-privacy-policy.html',
  WarrantyLink: 'https://www.fordpartsgiant.com/service/ford-parts-warranty.html',
  SalesPolicyLink: 'https://www.fordpartsgiant.com/service/ford-parts-sales-policy.html',
  InternationPolicyLink: [
    {
      name: 'International Policy',
      href: '/service/international-policy.html'
    }
  ],
  HazmatFaqLink:
    'https://www.fordpartsgiant.com/service/help-center-shipping-shipping-inquiries.html?FaqDetailID=70',
  // 联系电话
  Phone: '1-888-788-9341',
  LiveChatID: '2642',
  // 后台Search零件时的网站名称列表
  PartsSearchWebsite: 'Fordpartsgiant',
  // dealerPartNo的前缀
  DealerPartNoPrefix: 'MC',
  // RMA Return Policy中Ford特有文字
  ReturnPolicyAddtionalWords:
    ' In addition, Ford has a strict no-return policy on items priced at $20 and below and we will be unable to accept any returns for such items.',
  GPGRMAEmail: 'rma@fordpartsgiant.com',
  GPGRMAPhone: '18887889341',
  // facebook主页
  FacebookLink: 'https://www.facebook.com/fordpartsgiant',
  ImagePath: 'http://www.fordpartsgiant.com/online/images/fpg',
  CheckOrderStatus: [
    {
      name: 'Check your order status >>',
      href: '/online/Page_Customer/track_order.aspx?Email={$Email$}&OrderNumber={$OrderNumber$}'
    }
  ],
  BongoFormUrl: 'https://checkout.crossborder.fedex.com/pay/8f61e/index.php',
  BongoPartenKey: '068e510209f6d58ae01c84a0c3ad586e4ebe9e8a1d7aa0cc730fd690a7f43ebc',
  BongoAddress1: {
    FirstName: 'Fordpartsgiant.com',
    LastName: '',
    Address1: '5885 Sierra Ave.',
    Address2: 'MB# 336617',
    City: 'Fontana',
    State: 'CA',
    Zipcode: '92336',
    Company: 'Bongo',
    Phone: '(203)683-4894'
  },
  PriceRequired: 'Please be advised that there are no returns for parts under $20.00 per item.',
  VinRequired:
    'A valid VIN is required on all orders. Orders that placed without providing a VIN are not eligible for return.',
  ShipDays: '1-3 business days',
  DisplayOrderSpecial:
    ' Please be advise that due to manufacturer regulations certain parts under $20.00 may not be returned.',

  AboutUsUrl: '/service/ford-about_us.html',
  HelpUrl: '/service/ford-help_center.html',
  CustomReviewUrl: '/service/ford-customer_reviews.html',
  SalesUrl: '/service/ford-sales_policy.html',
  WarrantyUrl: '/service/ford-warranty.html',
  ReturnUrl: '/service/ford-return_policy.html',
  PrivacyUrl: '/service/ford-privacy_policy.html',
  internationalUrl: '/service/ford-international_policy.html',
  AccHomeUrl: '/ford-accessories.html',
  resourceLinkUrl: '/service/ford-resources_and_links.html',
  FacebookUrl: 'https://www.facebook.com/fordpartsgiant',
  ComodoUrl:
    'https://trustlogo.com/ttb_searcher/trustlogo?v_querytype=W&v_shortname=CL1&v_search=https://www.fordpartsgiant.com&x=6&y=5'
};
