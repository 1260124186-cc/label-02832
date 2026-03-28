/**
 * 导航模拟数据
 *
 * 说明：本文件包含导航链接相关的模拟数据，仅用于前端开发和演示目的
 * 在生产环境中，这些数据应通过后端 API 接口获取
 */

/**
 * 主导航链接（红色导航栏）
 */
export const navLinks = [
  { id: 1, name: '秒杀', url: '/seckill', isHot: true },
  { id: 2, name: '优惠券', url: '/coupon' },
  { id: 3, name: 'PLUS会员', url: '/plus', isVip: true },
  { id: 4, name: '闪购', url: '/flash-sale' },
  { id: 5, name: '拍卖', url: '/auction' },
  { id: 6, name: '京东超市', url: '/supermarket' },
  { id: 7, name: '京东生鲜', url: '/fresh' },
  { id: 8, name: '京东到家', url: '/daojia' },
  { id: 9, name: '京东国际', url: '/global' }
]

/**
 * 顶部栏用户相关链接
 */
export const userLinks = [
  { id: 1, name: '你好，请登录', url: '/login', isLogin: true },
  { id: 2, name: '免费注册', url: '/register', isHighlight: true }
]

/**
 * 顶部栏"我的京东"下拉菜单
 */
export const myJdLinks = [
  { id: 1, name: '待处理订单', url: '/order/pending' },
  { id: 2, name: '消息', url: '/message' },
  { id: 3, name: '返修退换货', url: '/service/return' },
  { id: 4, name: '我的回答', url: '/my/answer' },
  { id: 5, name: '降价商品', url: '/my/price-drop' },
  { id: 6, name: '我的关注', url: '/my/follow' }
]

/**
 * 顶部栏"客户服务"下拉菜单
 */
export const serviceLinks = [
  { id: 1, name: '帮助中心', url: '/help' },
  { id: 2, name: '售后服务', url: '/service/after-sale' },
  { id: 3, name: '在线客服', url: '/service/online' },
  { id: 4, name: '意见建议', url: '/feedback' },
  { id: 5, name: '电话客服', url: '/service/phone' }
]

/**
 * 顶部栏"网站导航"下拉菜单
 */
export const siteNavigation = [
  {
    id: 1,
    title: '特色主题',
    links: [
      { name: '京东试用', url: '/try' },
      { name: '京东金融', url: '/finance' },
      { name: '京东拍卖', url: '/auction' }
    ]
  },
  {
    id: 2,
    title: '企业服务',
    links: [
      { name: '企业采购', url: '/enterprise' },
      { name: '企业金融', url: '/enterprise/finance' }
    ]
  }
]

/**
 * 顶部栏其他链接
 */
export const topBarLinks = [
  { id: 1, name: '我的订单', url: '/order' },
  { id: 2, name: '京东会员', url: '/vip' },
  { id: 3, name: '企业采购', url: '/enterprise' },
  { id: 4, name: '手机京东', url: '/mobile' }
]

/**
 * 底部链接（如果需要）
 */
export const footerLinks = {
  purchase: [
    { name: '购物指南', url: '/help/guide' },
    { name: '购物流程', url: '/help/flow' },
    { name: '会员介绍', url: '/help/member' },
    { name: '生活旅行', url: '/help/travel' },
    { name: '常见问题', url: '/help/faq' }
  ],
  payment: [
    { name: '支付方式', url: '/help/payment' },
    { name: '货到付款', url: '/help/cod' },
    { name: '在线支付', url: '/help/online-pay' },
    { name: '分期付款', url: '/help/installment' }
  ],
  delivery: [
    { name: '配送方式', url: '/help/delivery' },
    { name: '上门自提', url: '/help/pickup' },
    { name: '海外配送', url: '/help/overseas' }
  ],
  service: [
    { name: '售后服务', url: '/help/after-sale' },
    { name: '退货退款', url: '/help/refund' },
    { name: '取消订单', url: '/help/cancel' },
    { name: '价格保护', url: '/help/price-protection' }
  ]
}

/**
 * 移动端菜单 - 用户欢迎信息
 */
export const mobileUserInfo = {
  welcomeText: 'Hi，欢迎来到京东！',
  loginText: '登录',
  registerText: '注册'
}

/**
 * 移动端菜单 - 快捷入口
 */
export const mobileQuickLinks = [
  { id: 1, name: '我的订单', icon: 'Document', url: '/order' },
  { id: 2, name: '购物车', icon: 'ShoppingCart', url: '/cart' },
  { id: 3, name: '我的收藏', icon: 'Goods', url: '/favorite' },
  { id: 4, name: '优惠券', icon: 'Ticket', url: '/coupon' }
]

/**
 * 移动端菜单 - 底部链接
 */
export const mobileFooterLinks = [
  { id: 1, name: '首页', icon: 'Location', url: '/' },
  { id: 2, name: '客户服务', icon: 'Service', url: '/service' },
  { id: 3, name: '设置', icon: 'Setting', url: '/setting' }
]
