/**
 * 商品模拟数据
 * 
 * 说明：本文件包含所有商品相关的模拟数据，仅用于前端开发和演示目的
 * 在生产环境中，这些数据应通过后端 API 接口获取
 */

// 导入商品图片
import iphone15Img from '@/assets/images/products/iphone15.webp'
import huaweiMate60Img from '@/assets/images/products/huaweimeta50.webp'
import xiaomi14Img from '@/assets/images/products/xiaomi14.jpeg'
import macbookImg from '@/assets/images/products/macbook.webp'
import dysonImg from '@/assets/images/products/daisenv15.webp'
import ps5Img from '@/assets/images/products/suoniplaystation.webp'
import haierFridgeImg from '@/assets/images/products/haierbcd.webp'
import mideaAcImg from '@/assets/images/products/mideakfr.webp'
import esteeLauderImg from '@/assets/images/products/yashilandai.webp'
import nikeAj1Img from '@/assets/images/products/nike-air-jordan.webp'
import nikeAirForceImg from '@/assets/images/products/nike-air-force.webp'
import moutaiImg from '@/assets/images/products/maotai.webp'
import switchImg from '@/assets/images/products/switch.webp'
import airpodsImg from '@/assets/images/products/airpods.webp'

/**
 * 商品分类标签
 */
export const productTabs = [
  { id: 'recommend', name: '精选推荐' },
  { id: 'new', name: '新品上市' },
  { id: 'hot', name: '热销榜单' },
  { id: 'discount', name: '特惠专区' }
]

/**
 * 精选推荐商品列表
 */
export const recommendProducts = [
  {
    id: 1,
    name: 'Apple iPhone 15 Pro Max 256GB 原色钛金属 支持移动联通电信5G 双卡双待手机',
    desc: 'A17 Pro芯片，钛金属设计',
    price: 9999,
    originalPrice: 10999,
    comments: 125000,
    goodRate: 98,
    isJdLogistics: true,
    tags: [{ text: '新品', type: 'new' }],
    promotion: '满5000减500',
    image: iphone15Img
  },
  {
    id: 2,
    name: '华为 HUAWEI Mate 60 Pro 雅丹黑 12GB+512GB 卫星通话 鸿蒙系统',
    desc: '麒麟芯片回归，卫星通话',
    price: 6999,
    originalPrice: 7999,
    comments: 89000,
    goodRate: 97,
    isJdLogistics: true,
    promotion: '以旧换新补贴',
    image: huaweiMate60Img
  },
  {
    id: 3,
    name: '小米14 Pro 徕卡光学镜头 骁龙8Gen3 12GB+256GB 白色 5G手机',
    desc: '徕卡影像，骁龙8Gen3',
    price: 4999,
    originalPrice: 5499,
    comments: 56000,
    goodRate: 96,
    isJdLogistics: true,
    tags: [{ text: 'PLUS', type: 'plus' }],
    image: xiaomi14Img
  },
  {
    id: 4,
    name: 'Apple MacBook Pro 14英寸 M3 Pro芯片 18GB+512GB 深空黑色 笔记本电脑',
    desc: 'M3 Pro芯片，专业创作',
    price: 16999,
    originalPrice: 18499,
    comments: 23000,
    goodRate: 99,
    isJdLogistics: true,
    tags: [{ text: '新品', type: 'new' }],
    promotion: '教育优惠立减',
    image: macbookImg
  },
  {
    id: 5,
    name: '戴森 Dyson V15 Detect 无绳吸尘器 激光探测 智能灰尘感应',
    desc: '激光探测灰尘，智能清洁',
    price: 5490,
    originalPrice: 6490,
    comments: 45000,
    goodRate: 95,
    isJdLogistics: true,
    tags: [{ text: '特惠', type: 'sale' }],
    image: dysonImg
  },
  {
    id: 6,
    name: '索尼 PlayStation 5 光驱版 国行游戏机 PS5 家用主机',
    desc: '次世代游戏体验',
    price: 3899,
    originalPrice: 4299,
    comments: 67000,
    goodRate: 98,
    isJdLogistics: true,
    image: ps5Img
  },
  {
    id: 7,
    name: '海尔 BCD-470WDPG 十字对开门冰箱 470升 一级能效 风冷无霜',
    desc: '大容量，一级能效',
    price: 4599,
    originalPrice: 5299,
    comments: 34000,
    goodRate: 96,
    isJdLogistics: true,
    promotion: '以旧换新补贴500',
    image: haierFridgeImg
  },
  {
    id: 8,
    name: '美的 KFR-35GW/N8MJA3 大1.5匹 新一级能效 变频冷暖空调',
    desc: '新一级能效，智能控制',
    price: 3299,
    originalPrice: 3999,
    comments: 89000,
    goodRate: 97,
    isJdLogistics: true,
    tags: [{ text: '特惠', type: 'sale' }],
    image: mideaAcImg
  },
  {
    id: 9,
    name: '雅诗兰黛 小棕瓶精华液 100ml 第七代 修护肌底精华',
    desc: '经典修护，焕活肌肤',
    price: 1080,
    originalPrice: 1350,
    comments: 120000,
    goodRate: 98,
    isJdLogistics: true,
    tags: [{ text: 'PLUS', type: 'plus' }],
    promotion: '买赠小样套装',
    image: esteeLauderImg
  },
  {
    id: 10,
    name: 'Nike Air Jordan 1 High OG 芝加哥 复刻 男子运动篮球鞋',
    desc: '经典复刻，潮流必备',
    price: 1299,
    originalPrice: 1599,
    comments: 45000,
    goodRate: 95,
    isJdLogistics: true,
    image: nikeAj1Img
  },
  {
    id: 11,
    name: '茅台 飞天53度 500ml 贵州茅台酒 酱香型白酒',
    desc: '正品保障，酱香经典',
    price: 2499,
    comments: 230000,
    goodRate: 99,
    isJdLogistics: true,
    image: moutaiImg
  },
  {
    id: 12,
    name: '任天堂 Switch OLED 白色 日版 掌上游戏机 NS续航增强版',
    desc: 'OLED屏幕，续航增强',
    price: 2199,
    originalPrice: 2599,
    comments: 78000,
    goodRate: 97,
    isJdLogistics: true,
    promotion: '赠游戏卡带',
    image: switchImg
  }
]

/**
 * 新品上市商品列表
 */
export const newProducts = [
  {
    id: 101,
    name: 'Apple iPhone 15 Pro Max 蓝色钛金属 256GB 全新上市',
    desc: '全新钛金属配色',
    price: 9999,
    originalPrice: 10999,
    comments: 8500,
    goodRate: 99,
    isJdLogistics: true,
    tags: [{ text: '新品', type: 'new' }],
    image: iphone15Img
  },
  {
    id: 102,
    name: '华为 Mate X5 折叠屏手机 典藏版 16GB+512GB',
    desc: '超轻薄折叠旗舰',
    price: 12999,
    comments: 3200,
    goodRate: 98,
    isJdLogistics: true,
    tags: [{ text: '新品', type: 'new' }],
    image: huaweiMate60Img
  },
  {
    id: 103,
    name: '小米14 Ultra 徕卡专业影像 16GB+512GB 黑色',
    desc: '徕卡一英寸大底',
    price: 6499,
    comments: 1800,
    goodRate: 97,
    isJdLogistics: true,
    tags: [{ text: '新品', type: 'new' }],
    image: xiaomi14Img
  },
  {
    id: 104,
    name: 'Apple MacBook Air 15英寸 M3芯片 8GB+256GB 午夜色',
    desc: 'M3芯片，轻薄便携',
    price: 10499,
    comments: 2100,
    goodRate: 98,
    isJdLogistics: true,
    tags: [{ text: '新品', type: 'new' }],
    image: macbookImg
  },
  {
    id: 105,
    name: '戴森 Airwrap 多功能美发造型器 新一代',
    desc: '一机多用，轻松造型',
    price: 4290,
    comments: 890,
    goodRate: 96,
    isJdLogistics: true,
    tags: [{ text: '新品', type: 'new' }],
    image: dysonImg
  },
  {
    id: 106,
    name: '索尼 PS5 Slim 轻薄版 光驱版 国行游戏机',
    desc: '更轻更薄，性能不变',
    price: 3799,
    comments: 1200,
    goodRate: 97,
    isJdLogistics: true,
    tags: [{ text: '新品', type: 'new' }],
    image: ps5Img
  }
]

/**
 * 热销榜单商品列表
 */
export const hotProducts = [
  {
    id: 201,
    name: '茅台 飞天53度 500ml 贵州茅台酒 酱香型白酒',
    desc: '京东自营，正品保障',
    price: 2499,
    comments: 350000,
    goodRate: 99,
    isJdLogistics: true,
    image: moutaiImg
  },
  {
    id: 202,
    name: 'Apple iPhone 15 128GB 蓝色 5G双卡双待手机',
    desc: '灵动岛设计，4800万像素',
    price: 5999,
    originalPrice: 6499,
    comments: 280000,
    goodRate: 98,
    isJdLogistics: true,
    image: iphone15Img
  },
  {
    id: 203,
    name: '华为 HUAWEI Mate 60 雅川青 12GB+256GB',
    desc: '超可靠玄武架构',
    price: 5999,
    comments: 195000,
    goodRate: 97,
    isJdLogistics: true,
    image: huaweiMate60Img
  },
  {
    id: 204,
    name: '美的 变频空调 1.5匹 新一级能效',
    desc: '冷暖两用，节能省电',
    price: 2999,
    originalPrice: 3599,
    comments: 180000,
    goodRate: 96,
    isJdLogistics: true,
    image: mideaAcImg
  },
  {
    id: 205,
    name: '海尔 冰箱 四门 475升 一级能效',
    desc: '大容量，全空间保鲜',
    price: 5299,
    originalPrice: 6299,
    comments: 165000,
    goodRate: 97,
    isJdLogistics: true,
    image: haierFridgeImg
  },
  {
    id: 206,
    name: 'Nike Air Force 1 空军一号 白色 经典板鞋',
    desc: '经典百搭，舒适耐穿',
    price: 799,
    comments: 145000,
    goodRate: 95,
    isJdLogistics: true,
    image: nikeAirForceImg
  }
]

/**
 * 特惠专区商品列表
 */
export const discountProducts = [
  {
    id: 301,
    name: '戴森 V12 无绳吸尘器 轻量版 家用手持',
    desc: '轻便省力，强劲吸力',
    price: 3990,
    originalPrice: 4990,
    comments: 42000,
    goodRate: 95,
    isJdLogistics: true,
    tags: [{ text: '特惠', type: 'sale' }],
    image: dysonImg
  },
  {
    id: 302,
    name: '雅诗兰黛 小棕瓶精华 50ml 修护精华',
    desc: '经典修护，7天见效',
    price: 680,
    originalPrice: 880,
    comments: 88000,
    goodRate: 98,
    isJdLogistics: true,
    tags: [{ text: '特惠', type: 'sale' }],
    image: esteeLauderImg
  },
  {
    id: 303,
    name: '任天堂 Switch 续航增强版 红蓝色',
    desc: '掌机主机随心切换',
    price: 1899,
    originalPrice: 2299,
    comments: 62000,
    goodRate: 97,
    isJdLogistics: true,
    tags: [{ text: '特惠', type: 'sale' }],
    image: switchImg
  },
  {
    id: 304,
    name: '索尼 PS5 手柄 DualSense 无线控制器',
    desc: '沉浸式触觉反馈',
    price: 469,
    originalPrice: 549,
    comments: 38000,
    goodRate: 96,
    isJdLogistics: true,
    tags: [{ text: '特惠', type: 'sale' }],
    image: ps5Img
  },
  {
    id: 305,
    name: '小米 Redmi Note 13 Pro 5G 8GB+256GB',
    desc: '2亿像素，超清主摄',
    price: 1599,
    originalPrice: 1999,
    comments: 95000,
    goodRate: 94,
    isJdLogistics: true,
    tags: [{ text: '特惠', type: 'sale' }],
    image: xiaomi14Img
  },
  {
    id: 306,
    name: 'Apple AirPods 3 无线蓝牙耳机 MagSafe充电盒',
    desc: '空间音频，个性化',
    price: 1199,
    originalPrice: 1399,
    comments: 72000,
    goodRate: 97,
    isJdLogistics: true,
    tags: [{ text: '特惠', type: 'sale' }],
    image: airpodsImg
  }
]

/**
 * 根据 tab 类型获取对应商品列表
 * @param {string} tabId - 标签ID
 * @returns {Array} 商品列表
 */
export const getProductsByTab = (tabId) => {
  const productMap = {
    recommend: recommendProducts,
    new: newProducts,
    hot: hotProducts,
    discount: discountProducts
  }
  return productMap[tabId] || recommendProducts
}
