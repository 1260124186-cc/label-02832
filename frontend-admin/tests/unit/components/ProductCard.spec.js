import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ProductCard from '@/components/common/ProductCard.vue'

// Mock Element Plus
vi.mock('@element-plus/icons-vue', () => ({
  ShoppingCart: { template: '<i class="el-icon-shopping-cart"></i>' },
  Ticket: { template: '<i class="el-icon-ticket"></i>' },
  Star: { template: '<i class="el-icon-star"></i>' },
  StarFilled: { template: '<i class="el-icon-star-filled"></i>' }
}))

// Mock Element Plus 消息
vi.mock('element-plus', () => ({
  ElMessage: vi.fn()
}))

// Mock toast
vi.mock('@/utils/toast', () => ({
  showDevelopingToast: vi.fn()
}))

describe('ProductCard Component', () => {
  const defaultProduct = {
    id: 1,
    name: '测试商品',
    price: 199.00,
    originalPrice: 299.00,
    image: '/test-image.jpg',
    tags: [
      { text: '新品', type: 'new' },
      { text: '秒杀', type: 'sale' }
    ],
    isJdLogistics: true,
    desc: '这是商品描述',
    comments: 12000,
    goodRate: 98,
    promotion: '满100减20'
  }

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const createWrapper = (props = {}) => {
    return mount(ProductCard, {
      props: {
        product: { ...defaultProduct, ...props }
      },
      global: {
        plugins: [createPinia()],
        stubs: {
          'el-icon': true
        },
        directives: {
          'lazy-img': () => {}
        }
      }
    })
  }

  it('should render product name', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('测试商品')
  })

  it('should render product price with integer and decimal parts', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.price-current').exists()).toBe(true)
    expect(wrapper.text()).toContain('199')
  })

  it('should render original price when provided', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.price-original').exists()).toBe(true)
    expect(wrapper.text()).toContain('299')
  })

  it('should not render original price when not provided', () => {
    const wrapper = createWrapper({ originalPrice: null })
    expect(wrapper.find('.price-original').exists()).toBe(false)
  })

  it('should render product tags when provided', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.product-tags').exists()).toBe(true)
    const tags = wrapper.findAll('.tag')
    expect(tags.length).toBe(2)
    expect(wrapper.text()).toContain('新品')
    expect(wrapper.text()).toContain('秒杀')
  })

  it('should not render tags when not provided', () => {
    const wrapper = createWrapper({ tags: [] })
    expect(wrapper.find('.product-tags').exists()).toBe(false)
  })

  it('should render JD logistics tag when isJdLogistics is true', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.jd-tag').exists()).toBe(true)
    expect(wrapper.text()).toContain('京东物流')
  })

  it('should render product description when provided', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.product-desc').exists()).toBe(true)
    expect(wrapper.text()).toContain('这是商品描述')
  })

  it('should render comments info when provided', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.product-comments').exists()).toBe(true)
    expect(wrapper.text()).toContain('1.2万+')
    expect(wrapper.text()).toContain('98%')
  })

  it('should render promotion info when provided', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.product-promotion').exists()).toBe(true)
    expect(wrapper.text()).toContain('满100减20')
  })

  it('should emit click event when card is clicked', async () => {
    const wrapper = createWrapper()
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')[0][0]).toEqual(expect.objectContaining({ id: 1 }))
  })
})
