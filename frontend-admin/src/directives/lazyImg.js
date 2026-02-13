/**
 * 图片懒加载指令
 * 使用 IntersectionObserver 实现图片懒加载
 * 
 * 用法：
 * <img v-lazy-img="imageUrl" />
 * <img v-lazy-img="{ src: imageUrl, placeholder: placeholderUrl }" />
 */

// 默认占位图（1x1 透明 gif）
const DEFAULT_PLACEHOLDER = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

// 加载中的占位图（灰色背景）
const LOADING_PLACEHOLDER = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y1ZjVmNSIvPjwvc3ZnPg=='

// 加载失败的占位图
const ERROR_PLACEHOLDER = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7lm77niYfliqDovb3lpLHotKU8L3RleHQ+PC9zdmc+'

// 存储观察器实例
let observer = null

// 图片加载缓存
const imageCache = new Set()

/**
 * 创建 IntersectionObserver 实例
 */
const createObserver = () => {
  if (observer) return observer
  
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target
          loadImage(el)
          observer.unobserve(el)
        }
      })
    },
    {
      rootMargin: '100px 0px', // 提前 100px 开始加载
      threshold: 0.01
    }
  )
  
  return observer
}

/**
 * 加载图片
 */
const loadImage = (el) => {
  const src = el.dataset.src
  const placeholder = el.dataset.placeholder || LOADING_PLACEHOLDER
  
  if (!src) return
  
  // 如果已经缓存，直接显示
  if (imageCache.has(src)) {
    el.src = src
    el.classList.add('lazy-loaded')
    el.classList.remove('lazy-loading')
    return
  }
  
  // 设置加载中状态
  el.classList.add('lazy-loading')
  
  // 创建新图片对象预加载
  const img = new Image()
  
  img.onload = () => {
    el.src = src
    el.classList.remove('lazy-loading')
    el.classList.add('lazy-loaded')
    imageCache.add(src)
  }
  
  img.onerror = () => {
    el.src = el.dataset.error || ERROR_PLACEHOLDER
    el.classList.remove('lazy-loading')
    el.classList.add('lazy-error')
    console.warn(`[LazyImg] 图片加载失败: ${src}`)
  }
  
  img.src = src
}

/**
 * 懒加载指令定义
 */
export const lazyImgDirective = {
  mounted(el, binding) {
    // 解析绑定值
    let src = ''
    let placeholder = LOADING_PLACEHOLDER
    let errorPlaceholder = ERROR_PLACEHOLDER
    
    if (typeof binding.value === 'string') {
      src = binding.value
    } else if (typeof binding.value === 'object' && binding.value) {
      src = binding.value.src || ''
      placeholder = binding.value.placeholder || LOADING_PLACEHOLDER
      errorPlaceholder = binding.value.error || ERROR_PLACEHOLDER
    }
    
    if (!src) {
      el.src = placeholder
      return
    }
    
    // 存储真实图片地址
    el.dataset.src = src
    el.dataset.placeholder = placeholder
    el.dataset.error = errorPlaceholder
    
    // 设置占位图
    el.src = placeholder
    el.classList.add('lazy-img')
    
    // 获取或创建观察器
    const obs = createObserver()
    
    // 开始观察
    obs.observe(el)
  },
  
  updated(el, binding) {
    // 如果图片地址发生变化，重新加载
    const newSrc = typeof binding.value === 'string' 
      ? binding.value 
      : (binding.value?.src || '')
    
    if (newSrc && newSrc !== el.dataset.src) {
      el.dataset.src = newSrc
      el.classList.remove('lazy-loaded', 'lazy-error')
      
      // 如果元素已经在视口中，直接加载
      const rect = el.getBoundingClientRect()
      const inViewport = rect.top < window.innerHeight + 100 && rect.bottom > -100
      
      if (inViewport) {
        loadImage(el)
      } else {
        el.src = el.dataset.placeholder || LOADING_PLACEHOLDER
        const obs = createObserver()
        obs.observe(el)
      }
    }
  },
  
  unmounted(el) {
    // 停止观察
    if (observer) {
      observer.unobserve(el)
    }
  }
}

/**
 * 注册指令的插件
 */
export const LazyImgPlugin = {
  install(app) {
    app.directive('lazy-img', lazyImgDirective)
  }
}

export default LazyImgPlugin
