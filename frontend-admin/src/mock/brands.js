/**
 * 品牌专区模拟数据
 *
 * 说明：本文件包含品牌相关的模拟数据，仅用于前端开发和演示目的
 * 在生产环境中，这些数据应通过后端 API 接口获取
 */

// 导入商品图片
import iphone15Img from '@/assets/images/products/iphone15.webp'
import macbookImg from '@/assets/images/products/macbook.webp'
import airpodsImg from '@/assets/images/products/airpods.webp'
import huaweiMate60Img from '@/assets/images/products/huaweimeta50.webp'
import matePadImg from '@/assets/images/products/huawei-matepad.webp'
import xiaomi14Img from '@/assets/images/products/xiaomi14.jpeg'
import xiaomiTvImg from '@/assets/images/products/xiaomidianshi.webp'
import miBandImg from '@/assets/images/products/xiaomishouhuan.webp'
import dysonV15Img from '@/assets/images/products/daisenv15.webp'
import dysonHairDryerImg from '@/assets/images/products/daisenchuifengji.webp'
import dysonAirPurifierImg from '@/assets/images/products/daisenkongqijinghua.webp'
import haierFridgeImg from '@/assets/images/products/haierbcd.webp'
import haierWasherImg from '@/assets/images/products/haierxiyiji.webp'
import mideaAcImg from '@/assets/images/products/mideakfr.webp'
import mideaRiceCookerImg from '@/assets/images/products/meididianfanbao.webp'
import mideaMicrowaveImg from '@/assets/images/products/meidiweibolu.webp'
import esteeLauderImg from '@/assets/images/products/yashilandai.webp'
import redPomegranateImg from '@/assets/images/products/hongshiliu.webp'
import dwFoundationImg from '@/assets/images/products/dw.webp'
import skiiImg from '@/assets/images/products/skii.webp'
import skiiBigRedImg from '@/assets/images/products/dahongpig.webp'
import skiiMaskImg from '@/assets/images/products/qiannanyou.webp'
import lancomeBlackImg from '@/assets/images/products/xiaoheiping.webp'
import lancomePinkWaterImg from '@/assets/images/products/fenshui.webp'
import lancomeCreamImg from '@/assets/images/products/jingchun.webp'
import shiseidoRedImg from '@/assets/images/products/hongyaozi.webp'
import shiseidoYueweiImg from '@/assets/images/products/yueweishuiru.webp'
import shiseidoPanliImg from '@/assets/images/products/panli.webp'
import nikeAj1Img from '@/assets/images/products/nike-air-jordan.webp'
import nikeAirForceImg from '@/assets/images/products/nike-air-force.webp'
import nikeAirMaxImg from '@/assets/images/products/nike-air-max.webp'
import adidasSuperstarImg from '@/assets/images/products/adidas-superstar.webp'
import adidasStanSmithImg from '@/assets/images/products/adidas-stan-smith.webp'
import adidasUltraboostImg from '@/assets/images/products/adidas-ultraboost.webp'
import uniqloTshirtImg from '@/assets/images/products/uniqlo-tshirt.jpeg'
import uniqloFleeceImg from '@/assets/images/products/yaolirong.webp'
import uniqloDownImg from '@/assets/images/products/qinyurong.webp'
import liningWadeImg from '@/assets/images/products/weide.webp'
import liningChinaImg from '@/assets/images/products/zgln.webp'
import liningYushuaiImg from '@/assets/images/products/nushuai.jpeg'
import samsungS24Img from '@/assets/images/products/samsung-galaxy-s24.webp'
import samsungFoldImg from '@/assets/images/products/samsung-galaxy-fold.webp'

/**
 * 品牌标签页
 */
export const brandTabs = [
  { id: 'all', name: '全部' },
  { id: 'phone', name: '手机数码' },
  { id: 'appliance', name: '家用电器' },
  { id: 'beauty', name: '美妆护肤' },
  { id: 'fashion', name: '服饰鞋包' }
]

/**
 * 全部品牌（首页展示）
 */
export const allBrands = [
  {
    id: 1,
    name: 'Apple',
    slogan: '创新科技，改变世界',
    tag: '官方旗舰',
    bgColor: 'linear-gradient(135deg, #1a1a1a, #333)',
    activity: '新品首发 限时优惠',
    category: 'phone',
    products: [
      { id: 1, name: 'iPhone 15 Pro', price: 7999, image: iphone15Img },
      { id: 2, name: 'MacBook Air', price: 8999, image: macbookImg },
      { id: 3, name: 'AirPods Pro', price: 1899, image: airpodsImg }
    ]
  },
  {
    id: 2,
    name: '华为',
    slogan: '构建万物互联的智能世界',
    tag: '自营',
    bgColor: 'linear-gradient(135deg, #c7000b, #e1251b)',
    activity: 'Mate60系列热销中',
    category: 'phone',
    products: [
      { id: 1, name: 'Mate 60 Pro', price: 6999, image: huaweiMate60Img },
      { id: 2, name: 'MatePad Pro', price: 4999, image: matePadImg },
      { id: 3, name: 'FreeBuds Pro', price: 1199, image: airpodsImg }
    ]
  },
  {
    id: 3,
    name: '小米',
    slogan: '让每个人都能享受科技的乐趣',
    tag: '品牌日',
    bgColor: 'linear-gradient(135deg, #ff6700, #ff8533)',
    activity: '全场满减 至高省500',
    category: 'phone',
    products: [
      { id: 1, name: '小米14 Pro', price: 4999, image: xiaomi14Img },
      { id: 2, name: '小米电视', price: 2999, image: xiaomiTvImg },
      { id: 3, name: '小米手环8', price: 249, image: miBandImg }
    ]
  },
  {
    id: 4,
    name: '戴森',
    slogan: '科技改变生活',
    tag: '官方授权',
    bgColor: 'linear-gradient(135deg, #6b5b95, #9b8bb8)',
    activity: '以旧换新 补贴升级',
    category: 'appliance',
    products: [
      { id: 1, name: 'V15吸尘器', price: 5490, image: dysonV15Img },
      { id: 2, name: 'HD08吹风机', price: 3190, image: dysonHairDryerImg },
      { id: 3, name: '空气净化器', price: 4990, image: dysonAirPurifierImg }
    ]
  }
]

/**
 * 手机数码品牌
 */
export const phoneBrands = [
  {
    id: 101,
    name: 'Apple',
    slogan: '创新科技，改变世界',
    tag: '官方旗舰',
    bgColor: 'linear-gradient(135deg, #1a1a1a, #333)',
    activity: 'iPhone 15系列热销中',
    products: [
      { id: 1, name: 'iPhone 15 Pro', price: 7999, image: iphone15Img },
      { id: 2, name: 'iPhone 15', price: 5999, image: iphone15Img },
      { id: 3, name: 'AirPods Pro 2', price: 1899, image: airpodsImg }
    ]
  },
  {
    id: 102,
    name: '华为',
    slogan: '构建万物互联的智能世界',
    tag: '自营热卖',
    bgColor: 'linear-gradient(135deg, #c7000b, #e1251b)',
    activity: 'Mate60系列 现货发售',
    products: [
      { id: 1, name: 'Mate 60 Pro', price: 6999, image: huaweiMate60Img },
      { id: 2, name: 'Mate 60', price: 5999, image: huaweiMate60Img },
      { id: 3, name: 'nova 12', price: 2999, image: huaweiMate60Img }
    ]
  },
  {
    id: 103,
    name: '小米',
    slogan: '科技让生活更美好',
    tag: '品牌日',
    bgColor: 'linear-gradient(135deg, #ff6700, #ff8533)',
    activity: '小米14系列 火热预约',
    products: [
      { id: 1, name: '小米14 Pro', price: 4999, image: xiaomi14Img },
      { id: 2, name: '小米14', price: 3999, image: xiaomi14Img },
      { id: 3, name: '小米手环8', price: 249, image: miBandImg }
    ]
  },
  {
    id: 104,
    name: '三星',
    slogan: 'Inspire the World',
    tag: '官方授权',
    bgColor: 'linear-gradient(135deg, #1428a0, #2d4cb3)',
    activity: 'Galaxy系列 折叠新体验',
    products: [
      { id: 1, name: 'Galaxy S24', price: 6499, image: samsungS24Img },
      { id: 2, name: 'Galaxy Fold', price: 13999, image: samsungFoldImg },
      { id: 3, name: 'Galaxy Buds', price: 999, image: airpodsImg }
    ]
  }
]

/**
 * 家电品牌
 */
export const applianceBrands = [
  {
    id: 201,
    name: '戴森',
    slogan: '科技改变生活',
    tag: '官方授权',
    bgColor: 'linear-gradient(135deg, #6b5b95, #9b8bb8)',
    activity: '以旧换新 补贴1000元',
    products: [
      { id: 1, name: 'V15吸尘器', price: 5490, image: dysonV15Img },
      { id: 2, name: 'HD08吹风机', price: 3190, image: dysonHairDryerImg },
      { id: 3, name: '净化扇', price: 4990, image: dysonAirPurifierImg }
    ]
  },
  {
    id: 202,
    name: '海尔',
    slogan: '真诚到永远',
    tag: '自营',
    bgColor: 'linear-gradient(135deg, #0066b3, #0088cc)',
    activity: '大家电 满5000减500',
    products: [
      { id: 1, name: '十字对开冰箱', price: 5299, image: haierFridgeImg },
      { id: 2, name: '滚筒洗衣机', price: 3999, image: haierWasherImg },
      { id: 3, name: '空调挂机', price: 2999, image: mideaAcImg }
    ]
  },
  {
    id: 203,
    name: '美的',
    slogan: '科技尽善，生活尽美',
    tag: '品牌日',
    bgColor: 'linear-gradient(135deg, #00a0e9, #33b5e5)',
    activity: '空调新品 一级能效',
    products: [
      { id: 1, name: '变频空调', price: 3299, image: mideaAcImg },
      { id: 2, name: '电饭煲', price: 599, image: mideaRiceCookerImg },
      { id: 3, name: '微波炉', price: 499, image: mideaMicrowaveImg }
    ]
  },
  {
    id: 204,
    name: '格力',
    slogan: '好空调，格力造',
    tag: '官方旗舰',
    bgColor: 'linear-gradient(135deg, #00843d, #00a550)',
    activity: '空调特惠 低至6折',
    products: [
      { id: 1, name: '云锦空调', price: 4599, image: mideaAcImg },
      { id: 2, name: '云恬空调', price: 3299, image: mideaAcImg },
      { id: 3, name: '空气净化器', price: 1999, image: dysonAirPurifierImg }
    ]
  }
]

/**
 * 美妆品牌
 */
export const beautyBrands = [
  {
    id: 301,
    name: '雅诗兰黛',
    slogan: '美丽恒久远',
    tag: '官方旗舰',
    bgColor: 'linear-gradient(135deg, #1a3a5c, #2d5a8a)',
    activity: '小棕瓶 买一送一',
    products: [
      { id: 1, name: '小棕瓶精华', price: 1080, image: esteeLauderImg },
      { id: 2, name: '红石榴水', price: 580, image: redPomegranateImg },
      { id: 3, name: 'DW粉底液', price: 420, image: dwFoundationImg }
    ]
  },
  {
    id: 302,
    name: 'SK-II',
    slogan: '晶莹剔透',
    tag: '官方授权',
    bgColor: 'linear-gradient(135deg, #8b0000, #a52a2a)',
    activity: '神仙水 第二件半价',
    products: [
      { id: 1, name: '神仙水230ml', price: 1590, image: skiiImg },
      { id: 2, name: '大红瓶面霜', price: 1190, image: skiiBigRedImg },
      { id: 3, name: '前男友面膜', price: 890, image: skiiMaskImg }
    ]
  },
  {
    id: 303,
    name: '兰蔻',
    slogan: '法式优雅',
    tag: '品牌日',
    bgColor: 'linear-gradient(135deg, #000, #333)',
    activity: '小黑瓶 赠正装',
    products: [
      { id: 1, name: '小黑瓶精华', price: 980, image: lancomeBlackImg },
      { id: 2, name: '粉水400ml', price: 520, image: lancomePinkWaterImg },
      { id: 3, name: '菁纯面霜', price: 1280, image: lancomeCreamImg }
    ]
  },
  {
    id: 304,
    name: '资生堂',
    slogan: '万美之源',
    tag: '自营',
    bgColor: 'linear-gradient(135deg, #c41e3a, #e1251b)',
    activity: '红腰子 限时特惠',
    products: [
      { id: 1, name: '红腰子精华', price: 890, image: shiseidoRedImg },
      { id: 2, name: '悦薇水乳', price: 680, image: shiseidoYueweiImg },
      { id: 3, name: '盼丽风姿', price: 560, image: shiseidoPanliImg }
    ]
  }
]

/**
 * 服饰鞋包品牌
 */
export const fashionBrands = [
  {
    id: 401,
    name: 'Nike',
    slogan: 'Just Do It',
    tag: '官方旗舰',
    bgColor: 'linear-gradient(135deg, #111, #333)',
    activity: 'AJ系列 新品上市',
    products: [
      { id: 1, name: 'Air Jordan 1', price: 1299, image: nikeAj1Img },
      { id: 2, name: 'Air Force 1', price: 799, image: nikeAirForceImg },
      { id: 3, name: 'Air Max 90', price: 999, image: nikeAirMaxImg }
    ]
  },
  {
    id: 402,
    name: 'Adidas',
    slogan: 'Impossible is Nothing',
    tag: '品牌日',
    bgColor: 'linear-gradient(135deg, #000, #1a1a1a)',
    activity: '三叶草 满减优惠',
    products: [
      { id: 1, name: 'Superstar', price: 899, image: adidasSuperstarImg },
      { id: 2, name: 'Stan Smith', price: 799, image: adidasStanSmithImg },
      { id: 3, name: 'Ultraboost', price: 1299, image: adidasUltraboostImg }
    ]
  },
  {
    id: 403,
    name: '优衣库',
    slogan: 'LifeWear',
    tag: '自营',
    bgColor: 'linear-gradient(135deg, #c41e3a, #e1251b)',
    activity: '基础款 特惠价',
    products: [
      { id: 1, name: 'U系T恤', price: 99, image: uniqloTshirtImg },
      { id: 2, name: '摇粒绒', price: 149, image: uniqloFleeceImg },
      { id: 3, name: '轻羽绒', price: 399, image: uniqloDownImg }
    ]
  },
  {
    id: 404,
    name: '李宁',
    slogan: '一切皆有可能',
    tag: '国潮',
    bgColor: 'linear-gradient(135deg, #e1251b, #ff3333)',
    activity: '中国李宁 限量发售',
    products: [
      { id: 1, name: '韦德之道', price: 1499, image: liningWadeImg },
      { id: 2, name: '中国李宁', price: 599, image: liningChinaImg },
      { id: 3, name: '驭帅15', price: 899, image: liningYushuaiImg }
    ]
  }
]

/**
 * 更多品牌入口
 */
export const moreBrands = [
  { id: 1, name: '索尼', bgColor: '#000' },
  { id: 2, name: '三星', bgColor: '#1428a0' },
  { id: 3, name: '联想', bgColor: '#e2231a' },
  { id: 4, name: '海尔', bgColor: '#0066b3' },
  { id: 5, name: '美的', bgColor: '#00a0e9' },
  { id: 6, name: '格力', bgColor: '#00843d' },
  { id: 7, name: '耐克', bgColor: '#111' },
  { id: 8, name: '阿迪达斯', bgColor: '#000' }
]

/**
 * 根据分类获取品牌列表
 */
export const getBrandsByCategory = (category) => {
  switch (category) {
    case 'phone':
      return phoneBrands
    case 'appliance':
      return applianceBrands
    case 'beauty':
      return beautyBrands
    case 'fashion':
      return fashionBrands
    default:
      return allBrands
  }
}
