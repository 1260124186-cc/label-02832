import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '@/stores/cart'

describe('Cart Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    // 清理 localStorage
    localStorage.clear()
  })

  it('should initialize with empty cart', () => {
    const cart = useCartStore()
    expect(cart.cartItems).toEqual([])
    expect(cart.cartCount).toBe(0)
    expect(cart.totalPrice).toBe(0)
  })

  it('should add item to cart', () => {
    const cart = useCartStore()
    const product = {
      id: 1,
      name: 'Test Product',
      price: 99.99,
      image: 'test.jpg'
    }

    cart.addToCart(product)

    expect(cart.cartItems).toHaveLength(1)
    expect(cart.cartItems[0].id).toBe(1)
    expect(cart.cartItems[0].qty).toBe(1)
    expect(cart.cartCount).toBe(1)
  })

  it('should increase quantity when adding same item', () => {
    const cart = useCartStore()
    const product = {
      id: 1,
      name: 'Test Product',
      price: 99.99,
      image: 'test.jpg'
    }

    cart.addToCart(product)
    cart.addToCart(product)

    expect(cart.cartItems).toHaveLength(1)
    expect(cart.cartItems[0].qty).toBe(2)
    expect(cart.cartCount).toBe(2)
  })

  it('should remove item from cart', () => {
    const cart = useCartStore()
    cart.addToCart({ id: 1, name: 'Test 1', price: 100, image: 'test1.jpg' })
    cart.addToCart({ id: 2, name: 'Test 2', price: 200, image: 'test2.jpg' })

    cart.removeFromCart(1)

    expect(cart.cartItems).toHaveLength(1)
    expect(cart.cartItems[0].id).toBe(2)
  })

  it('should calculate total correctly', () => {
    const cart = useCartStore()
    cart.addToCart({ id: 1, name: 'Test 1', price: 100, image: 'test1.jpg' })
    cart.addToCart({ id: 2, name: 'Test 2', price: 200, image: 'test2.jpg' })
    // 添加同一个商品以增加数量
    cart.addToCart({ id: 1, name: 'Test 1', price: 100, image: 'test1.jpg' })

    // 100 * 2 + 200 * 1 = 400
    expect(cart.totalPrice).toBe(400)
  })

  it('should clear cart', () => {
    const cart = useCartStore()
    cart.addToCart({ id: 1, name: 'Test', price: 100, image: 'test.jpg' })
    cart.addToCart({ id: 2, name: 'Test 2', price: 200, image: 'test2.jpg' })

    cart.clearCart()

    expect(cart.cartItems).toHaveLength(0)
    expect(cart.cartCount).toBe(0)
    expect(cart.totalPrice).toBe(0)
  })
})
