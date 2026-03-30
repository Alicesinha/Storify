import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Product } from '../../modules/products/services/productService'
import { createMMKV } from 'react-native-mmkv'

const storage = createMMKV({ id: 'product-cache' })

const mmkvStorage = {
  getItem: (key: string): string | null => storage.getString(key) ?? null,
  setItem: (key: string, value: string): void => storage.set(key, value),
  removeItem: (key: string): void => {
    storage.remove(key)
  },
}

const STALE_TIME = 3 * 60 * 1000

type ProductCacheStore = {
  products: Product[]
  productDetails: Record<number, Product>
  lastFetched: number | null
  setProducts: (products: Product[]) => void
  setProductDetail: (product: Product) => void
  getProductDetail: (id: number) => Product | undefined
  isStale: () => boolean
}

export const useProductCacheStore = create<ProductCacheStore>()(
  persist(
    (set, get) => ({
      products: [],
      productDetails: {},
      lastFetched: null,
      setProducts: (products: Product[]) => set({ products, lastFetched: Date.now() }),
      getProductDetail: (id: number) => get().productDetails[id],
            setProductDetail: (product: Product) =>
        set(state => ({
          productDetails: { ...state.productDetails, [product.id]: product },
        })),
      isStale: (): boolean => {
        const { lastFetched } = get()
        if (!lastFetched) return true
        return Date.now() - lastFetched > STALE_TIME
      },
    }),
    {
      name: 'product-cache',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
)
