import { create } from 'zustand'
import { Product } from '@modules/products/services/productService'

export type CartItem = {
  product: Product
  quantity: number
}

type CartStore = {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  incrementItem: (productId: number) => void
  decrementItem: (productId: number) => void
  clear: () => void
  total: number
  totalItems: number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  total: 0,
  totalItems: 0,

  addItem: (product: Product) => {
    const { items } = get()
    const existing = items.find(i => i.product.id === product.id)

    const updatedItems = existing
      ? items.map(i =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        )
      : [...items, { product, quantity: 1 }]

    set({
      items: updatedItems,
      total: calculateTotal(updatedItems),
      totalItems: calculateTotalItems(updatedItems),
    })
  },

  removeItem: (productId: number) => {
    const updatedItems = get().items.filter(i => i.product.id !== productId)
    set({
      items: updatedItems,
      total: calculateTotal(updatedItems),
      totalItems: calculateTotalItems(updatedItems),
    })
  },

  incrementItem: (productId: number) => {
    const updatedItems = get().items.map(i =>
      i.product.id === productId ? { ...i, quantity: i.quantity + 1 } : i,
    )
    set({
      items: updatedItems,
      total: calculateTotal(updatedItems),
      totalItems: calculateTotalItems(updatedItems),
    })
  },

  decrementItem: (productId: number) => {
    const updatedItems = get().items
      .map(i =>
        i.product.id === productId ? { ...i, quantity: i.quantity - 1 } : i,
      )
      .filter(i => i.quantity > 0)

    set({
      items: updatedItems,
      total: calculateTotal(updatedItems),
      totalItems: calculateTotalItems(updatedItems),
    })
  },

  clear: () => set({ items: [], total: 0, totalItems: 0 }),
}))

const calculateTotal = (items: CartItem[]): number =>
  items.reduce((acc, i) => acc + i.product.price * i.quantity, 0)

const calculateTotalItems = (items: CartItem[]): number =>
  items.reduce((acc, i) => acc + i.quantity, 0)