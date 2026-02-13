import { describe, it, expect } from 'vitest'
import {
  brandTabs,
  allBrands,
  phoneBrands,
  applianceBrands,
  beautyBrands,
  fashionBrands,
  getBrandsByCategory
} from '@/mock/brands'
import {
  flashSaleConfig,
  flashSaleProducts,
  formatCountdown
} from '@/mock/flashSale'
import {
  serviceGuarantees,
  helpColumns,
  contactInfo,
  friendLinks,
  copyrightLinks,
  certifications
} from '@/mock/footer'
import {
  navLinks,
  userLinks,
  myJdLinks,
  serviceLinks,
  siteNavigation,
  topBarLinks,
  mobileQuickLinks,
  mobileFooterLinks
} from '@/mock/navigation'

describe('Brand Mock Data', () => {
  it('should have valid brand tabs', () => {
    expect(brandTabs).toBeInstanceOf(Array)
    expect(brandTabs.length).toBeGreaterThan(0)
    brandTabs.forEach(tab => {
      expect(tab).toHaveProperty('id')
      expect(tab).toHaveProperty('name')
    })
  })

  it('should have valid all brands data', () => {
    expect(allBrands).toBeInstanceOf(Array)
    expect(allBrands.length).toBeGreaterThan(0)
    allBrands.forEach(brand => {
      expect(brand).toHaveProperty('id')
      expect(brand).toHaveProperty('name')
      expect(brand).toHaveProperty('slogan')
      expect(brand).toHaveProperty('products')
      expect(brand.products).toBeInstanceOf(Array)
    })
  })

  it('should get brands by category correctly', () => {
    expect(getBrandsByCategory('phone')).toBe(phoneBrands)
    expect(getBrandsByCategory('appliance')).toBe(applianceBrands)
    expect(getBrandsByCategory('beauty')).toBe(beautyBrands)
    expect(getBrandsByCategory('fashion')).toBe(fashionBrands)
    expect(getBrandsByCategory('all')).toBe(allBrands)
    expect(getBrandsByCategory('unknown')).toBe(allBrands)
  })
})

describe('Flash Sale Mock Data', () => {
  it('should have valid flash sale config', () => {
    expect(flashSaleConfig).toHaveProperty('title')
    expect(flashSaleConfig).toHaveProperty('subtitle')
    expect(flashSaleConfig).toHaveProperty('sessions')
    expect(flashSaleConfig.sessions).toBeInstanceOf(Array)
  })

  it('should have valid flash sale products', () => {
    expect(flashSaleProducts).toBeInstanceOf(Array)
    expect(flashSaleProducts.length).toBeGreaterThan(0)
    flashSaleProducts.forEach(product => {
      expect(product).toHaveProperty('id')
      expect(product).toHaveProperty('name')
      expect(product).toHaveProperty('price')
      expect(product).toHaveProperty('originalPrice')
      expect(product.price).toBeLessThan(product.originalPrice)
    })
  })

  it('should format countdown correctly', () => {
    const result = formatCountdown(3661) // 1 hour, 1 minute, 1 second
    expect(result).toEqual({
      hours: '01',
      minutes: '01',
      seconds: '01'
    })

    const result2 = formatCountdown(0)
    expect(result2).toEqual({
      hours: '00',
      minutes: '00',
      seconds: '00'
    })
  })
})

describe('Footer Mock Data', () => {
  it('should have valid service guarantees', () => {
    expect(serviceGuarantees).toBeInstanceOf(Array)
    expect(serviceGuarantees.length).toBeGreaterThan(0)
    serviceGuarantees.forEach(service => {
      expect(service).toHaveProperty('id')
      expect(service).toHaveProperty('icon')
      expect(service).toHaveProperty('title')
      expect(service).toHaveProperty('desc')
    })
  })

  it('should have valid help columns', () => {
    expect(helpColumns).toBeInstanceOf(Array)
    helpColumns.forEach(column => {
      expect(column).toHaveProperty('title')
      expect(column).toHaveProperty('links')
      expect(column.links).toBeInstanceOf(Array)
    })
  })

  it('should have valid contact info', () => {
    expect(contactInfo).toHaveProperty('hotline')
    expect(contactInfo).toHaveProperty('serviceTime')
    expect(contactInfo.hotline).toMatch(/^\d{3}-\d{3}-\d{4}$/)
  })

  it('should have valid copyright links', () => {
    expect(copyrightLinks).toBeInstanceOf(Array)
    copyrightLinks.forEach(link => {
      expect(link).toHaveProperty('name')
      expect(link).toHaveProperty('url')
    })
  })

  it('should have valid certifications', () => {
    expect(certifications).toBeInstanceOf(Array)
    certifications.forEach(cert => {
      expect(cert).toHaveProperty('name')
      expect(cert).toHaveProperty('icon')
    })
  })
})

describe('Navigation Mock Data', () => {
  it('should have valid nav links', () => {
    expect(navLinks).toBeInstanceOf(Array)
    navLinks.forEach(link => {
      expect(link).toHaveProperty('id')
      expect(link).toHaveProperty('name')
      expect(link).toHaveProperty('url')
    })
  })

  it('should have valid user links', () => {
    expect(userLinks).toBeInstanceOf(Array)
    expect(userLinks.length).toBe(2) // 登录和注册
  })

  it('should have valid my jd links', () => {
    expect(myJdLinks).toBeInstanceOf(Array)
    expect(myJdLinks.length).toBeGreaterThan(0)
  })

  it('should have valid service links', () => {
    expect(serviceLinks).toBeInstanceOf(Array)
    expect(serviceLinks.length).toBeGreaterThan(0)
  })

  it('should have valid site navigation sections', () => {
    expect(siteNavigation).toBeInstanceOf(Array)
    siteNavigation.forEach(section => {
      expect(section).toHaveProperty('id')
      expect(section).toHaveProperty('title')
      expect(section).toHaveProperty('links')
      expect(section.links).toBeInstanceOf(Array)
    })
  })

  it('should have valid mobile quick links', () => {
    expect(mobileQuickLinks).toBeInstanceOf(Array)
    mobileQuickLinks.forEach(link => {
      expect(link).toHaveProperty('id')
      expect(link).toHaveProperty('name')
      expect(link).toHaveProperty('icon')
      expect(link).toHaveProperty('url')
    })
  })

  it('should have valid mobile footer links', () => {
    expect(mobileFooterLinks).toBeInstanceOf(Array)
    mobileFooterLinks.forEach(link => {
      expect(link).toHaveProperty('id')
      expect(link).toHaveProperty('name')
      expect(link).toHaveProperty('icon')
      expect(link).toHaveProperty('url')
    })
  })
})
