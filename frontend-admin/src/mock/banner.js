/**
 * Banner 区域模拟数据
 *
 * 说明：本文件包含轮播图、快报、服务入口等模拟数据，仅用于前端开发和演示目的
 * 在生产环境中，这些数据应通过后端 API 接口获取
 */

// 导入 Banner 图片（使用 products 目录中的商品图片）
import iphone15Img from '@/assets/images/products/iphone15.webp'
import daisenv15Img from '@/assets/images/products/daisenv15.webp'
import xiaomidianshiImg from '@/assets/images/products/xiaomidianshi.webp'
import macbookImg from '@/assets/images/products/macbook.webp'

/**
 * 轮播图数据
 */
export const slides = [
  {
    id: 1,
    title: 'iPhone 15 Pro Max',
    subtitle: '钛金属设计，A17 Pro芯片',
    btnText: '立即抢购',
    bgColor: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    imgBg: 'rgba(255,255,255,0.1)',
    icon: 'Iphone',
    image: iphone15Img,
    link: '/product/iphone15'
  },
  {
    id: 2,
    title: '京东超级品牌日',
    subtitle: '大牌狂欢，低至5折',
    btnText: '查看详情',
    bgColor: 'linear-gradient(135deg, #e1251b 0%, #c81623 100%)',
    imgBg: 'rgba(255,255,255,0.2)',
    icon: 'Present',
    image: daisenv15Img,
    link: '/activity/brand-day'
  },
  {
    id: 3,
    title: '家电焕新季',
    subtitle: '以旧换新，补贴高达1000元',
    btnText: '立即参与',
    bgColor: 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
    imgBg: 'rgba(255,255,255,0.1)',
    icon: 'HomeFilled',
    image: xiaomidianshiImg,
    link: '/activity/home-appliance'
  },
  {
    id: 4,
    title: '电脑数码节',
    subtitle: '游戏本直降2000，限时特惠',
    btnText: '马上抢',
    bgColor: 'linear-gradient(135deg, #0984e3 0%, #74b9ff 100%)',
    imgBg: 'rgba(255,255,255,0.15)',
    icon: 'Monitor',
    image: macbookImg,
    link: '/activity/digital-festival'
  }
]

/**
 * 京东快报数据
 */
export const newsList = [
  { id: 1, tag: '热门', tagType: 'hot', title: 'iPhone 15系列火爆预售中', link: '/news/1' },
  { id: 2, tag: '特惠', tagType: 'sale', title: '家电以旧换新补贴来了', link: '/news/2' },
  { id: 3, tag: '新品', tagType: 'new', title: '华为Mate60 Pro正式发布', link: '/news/3' },
  { id: 4, tag: '活动', tagType: 'event', title: '京东超级品牌日开启', link: '/news/4' }
]

/**
 * 服务入口数据
 */
export const services = [
  { id: 1, name: '话费', icon: 'Iphone', link: '/service/phone-bill' },
  { id: 2, name: '机票', icon: 'Van', link: '/service/flight' },
  { id: 3, name: '充值', icon: 'CreditCard', link: '/service/recharge' },
  { id: 4, name: '白条', icon: 'Ticket', link: '/service/baitiao' }
]

/**
 * 搜索框热门搜索词
 */
export const hotSearchWords = [
  'iPhone 15',
  '华为Mate60',
  '笔记本',
  '空调',
  '冰箱',
  '洗衣机'
]

/**
 * 搜索历史（默认数据）
 */
export const defaultSearchHistory = [
  'iPhone 15',
  '笔记本电脑',
  '机械键盘'
]
