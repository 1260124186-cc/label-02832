/**
 * Mock 数据统一导出入口
 * 
 * 说明：本目录包含项目中使用的所有模拟数据，仅用于前端开发和演示目的
 * 详细说明请参阅 README.md
 */

// 商品数据
export {
  productTabs,
  recommendProducts,
  newProducts,
  hotProducts,
  discountProducts,
  getProductsByTab
} from './products'

// 分类数据
export {
  quickCategories,
  mainCategories,
  sideCategories
} from './categories'

// Banner 区域数据
export {
  slides,
  newsList,
  services,
  hotSearchWords,
  defaultSearchHistory
} from './banner'

// 导航数据
export {
  navLinks,
  userLinks,
  myJdLinks,
  serviceLinks,
  siteNavigation,
  topBarLinks,
  footerLinks,
  mobileUserInfo,
  mobileQuickLinks,
  mobileFooterLinks
} from './navigation'

// 页脚数据
export {
  serviceGuarantees,
  helpColumns,
  contactInfo,
  friendLinks as footerFriendLinks,
  copyrightLinks,
  filingInfo,
  certifications,
  copyrightText
} from './footer'

// 品牌数据
export {
  brandTabs,
  allBrands,
  phoneBrands,
  applianceBrands,
  beautyBrands,
  fashionBrands,
  moreBrands,
  getBrandsByCategory
} from './brands'

// 秒杀数据
export {
  flashSaleConfig,
  flashSaleProducts,
  getFlashSaleRemainingTime,
  formatCountdown
} from './flashSale'
