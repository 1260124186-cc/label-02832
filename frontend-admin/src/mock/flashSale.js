/**
 * 限时秒杀模拟数据
 *
 * 说明：本文件包含限时秒杀相关的模拟数据，仅用于前端开发和演示目的
 * 在生产环境中，这些数据应通过后端 API 接口获取
 */

// 导入商品图片
import airpodsImg from '@/assets/images/products/airpods.webp'
import dysonHairImg from '@/assets/images/products/daisenchuifengji.webp'
import sonyHeadphoneImg from '@/assets/images/products/suoni.webp'
import miBandImg from '@/assets/images/products/xiaomishouhuan.webp'
import skiiImg from '@/assets/images/products/skii.webp'

/**
 * 秒杀配置
 */
export const flashSaleConfig = {
  title: '限时秒杀',
  subtitle: '每日10点/14点/20点开抢',
  // 秒杀场次时间（小时）
  sessions: [10, 14, 20],
  // 每场持续时间（小时）
  duration: 4
}

/**
 * 秒杀商品列表
 */
export const flashSaleProducts = [
  {
    id: 1,
    name: 'Apple AirPods Pro 2',
    price: 1499,
    originalPrice: 1999,
    discount: 7.5,
    progress: 85,
    image: airpodsImg
  },
  {
    id: 2,
    name: '戴森吹风机 HD08',
    price: 2490,
    originalPrice: 3190,
    discount: 7.8,
    progress: 62,
    image: dysonHairImg
  },
  {
    id: 3,
    name: '索尼WH-1000XM5',
    price: 2199,
    originalPrice: 2999,
    discount: 7.3,
    progress: 91,
    image: sonyHeadphoneImg
  },
  {
    id: 4,
    name: '小米手环8 Pro',
    price: 299,
    originalPrice: 399,
    discount: 7.5,
    progress: 45,
    image: miBandImg
  },
  {
    id: 5,
    name: 'SK-II神仙水230ml',
    price: 1190,
    originalPrice: 1590,
    discount: 7.5,
    progress: 78,
    image: skiiImg
  }
]

/**
 * 获取当前秒杀场次的剩余时间（秒）
 */
export const getFlashSaleRemainingTime = () => {
  const now = new Date()
  const currentHour = now.getHours()
  const { sessions, duration } = flashSaleConfig

  // 找到当前或下一个秒杀场次
  let currentSession = null
  for (const session of sessions) {
    if (currentHour >= session && currentHour < session + duration) {
      currentSession = session
      break
    }
  }

  if (currentSession !== null) {
    // 当前正在秒杀中，计算结束时间
    const endTime = new Date(now)
    endTime.setHours(currentSession + duration, 0, 0, 0)
    return Math.max(0, Math.floor((endTime - now) / 1000))
  }

  // 默认返回 2.5 小时
  return 2.5 * 3600
}

/**
 * 格式化倒计时
 */
export const formatCountdown = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return {
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0')
  }
}
